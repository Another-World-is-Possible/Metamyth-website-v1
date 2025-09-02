// openrouter.js - with server-side model validation

const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
const crypto = require('crypto');
const fetch = require('node-fetch');
const app = express();

// --- Configuration ---
const port = process.env.OPENROUTER_PORT || 3011;
const openrouterApiKey = process.env.OPENROUTER_API_KEY;
const openrouterUrl = process.env.OPENROUTER_URL || 'https://openrouter.ai/api/v1';

// URL for your separate TTS server
const KOKORO_TTS_URL = process.env.KOKORO_TTS_URL || 'http://192.168.68.51:8880/v1';
const KOKORO_VOICE = process.env.KOKORO_VOICE || 'am_v0gurney+bm_lewis';
const KOKORO_MODEL = 'kokoro';

// Optional but recommended for OpenRouter ranking
const siteUrl = process.env.SITE_URL || 'https://i.rickey.io';
const siteName = process.env.SITE_NAME || 'Merlin Magician Chat';

// --- OpenAI Client Initialization for OpenRouter ---
if (!openrouterApiKey) {
  console.warn('Warning: OPENROUTER_API_KEY is not set in your environment. AI calls will fail.');
}
const openai = new OpenAI({
  apiKey: openrouterApiKey,
  baseURL: openrouterUrl,
  defaultHeaders: {
    'HTTP-Referer': siteUrl,
    'X-Title': siteName,
  },
});

// --- Model and Session Configuration ---
// This is the server's fallback model. You should ensure it's a free model.
const defaultModelName = "deepseek/deepseek-chat-v3-0324:free";
const keepAliveValue = "6000";
const temporaryChatSessions = new Map();
const SESSION_TTL_MS = 20 * 1000; // 20 seconds

// --- Middleware Setup ---
const allowedOrigins = ['https://i.rickey.io', 'http://localhost', 'http://127.0.0.1', 'https://metamyth.quest'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Origin denied for CORS:', origin);
      callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
const bodyParserLimit = '50mb';
app.use(express.json({ limit: bodyParserLimit }));
app.get('/healthcheck', (req, res) => { res.status(200).send('OK from Node.js backend!'); });


// --- Reusable Core SSE Streaming Function ---
async function streamOpenAiChat(res, messagesForOpenAI, endpointName = "chat", requestedModel = null) {
  let modelToUse = defaultModelName; // Start with the hardcoded default.

  // SERVER-SIDE VALIDATION: Check if the client requested a valid free model.
  if (requestedModel && typeof requestedModel === 'string' && requestedModel.endsWith(':free')) {
    // If it's valid, override the default.
    modelToUse = requestedModel;
    console.log(`Client requested a valid free model: "${requestedModel}". Using it.`);
  } else if (requestedModel) {
    // If a model was requested but it wasn't a free one, log a warning and use the default.
    console.warn(`Client requested a non-free model: "${requestedModel}". Ignoring and falling back to default: "${defaultModelName}".`);
  }

  console.log(`SSE stream initiated for ${endpointName}. Model: ${modelToUse}. Using ${messagesForOpenAI.length} total messages in payload.`);
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const stream = await openai.chat.completions.create({
      model: modelToUse,
      messages: messagesForOpenAI,
      keep_alive: keepAliveValue,
      stream: true,
	  reasoning: {
        effort: "medium",
		exclude: true,
	  },
	  stop: '</thinking>',
    });
    for await (const chunk of stream) {
      if (chunk.choices[0]?.delta?.content) {
        res.write(`data: ${JSON.stringify({ token: chunk.choices[0].delta.content })}\n\n`);
      }
    }
    res.write(`data: ${JSON.stringify({ end: true })}\n\n`);
  } catch (error) {
    console.error(`Error during streaming for ${endpointName} (Model: ${modelToUse}):`, error.message);
    res.write(`data: ${JSON.stringify({ error: 'Failed to get response from AI', details: error.message })}\n\n`);
  } finally {
    console.log(`SSE stream ended for ${endpointName} (Model: ${modelToUse})`);
    res.end();
  }
}


// This is updated to call your Kokoro server's OpenAI-compatible endpoint.
app.post('/api/tts', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required for TTS.' });
    }
    console.log(`TTS request received, proxying to Kokoro at: ${KOKORO_TTS_URL}`);

    try {
        const ttsResponse = await fetch(`${KOKORO_TTS_URL}/audio/speech`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add an API key header if your Kokoro server ever requires one
                // 'Authorization': `Bearer ${KOKORO_API_KEY}`
            },
            body: JSON.stringify({
                model: KOKORO_MODEL,
                voice: KOKORO_VOICE,
                input: text
            }),
        });

        if (!ttsResponse.ok) {
            const errorText = await ttsResponse.text();
            console.error(`Error from upstream Kokoro TTS server (${ttsResponse.status}):`, errorText);
            return res.status(ttsResponse.status).send(`Failed to generate audio from TTS service: ${errorText}`);
        }

        console.log("Successfully received audio stream from Kokoro. Piping to client.");
        res.setHeader('Content-Type', 'audio/mpeg');
        ttsResponse.body.pipe(res);

    } catch (error) {
        console.error('Network or other error while proxying request to Kokoro TTS server:', error);
        res.status(500).json({ error: 'Internal server error while generating audio.' });
    }
});

// --- Two-Step Endpoints ---
app.post('/api/generate-metamyth-summary', async (req, res) => {
  const { email, phone, originStory, legacyVision, responses } = req.body;

  // Basic validation: ensure essential fields are present
  if (!email || !originStory || !legacyVision || !responses || Object.keys(responses).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Missing essential questionnaire data. Please ensure all required fields are completed.",
      details: "Email, Origin Story, Legacy Vision, and at least one question response are required."
    });
  }

  // Construct a prompt for the AI based on the collected data
  let promptMessages = [
    { role: "system", content: "You are a wise and insightful AI assistant specializing in narrative and personal transformation. Your task is to review a user's Metamyth questionnaire submission. Based on their answers, provide a concise summary of their core narrative, identify key themes, and offer encouraging insights. If any critical sections (Origin Story, Legacy Vision, or specific key questions) seem underdeveloped or missing, gently suggest they revisit those areas for deeper reflection. Your response should be encouraging and actionable, guiding them towards further self-authorship." },
    { role: "user", content: `Here is a Metamyth questionnaire submission:

` +
      `Contact Email: ${email}
` +
      `Phone (Optional): ${phone || "Not provided"}

` +
      `Origin Story:
${originStory}

` +
      `Legacy Vision:
${legacyVision}

` +
      `Questionnaire Responses:
` +
      Object.entries(responses).map(([id, answer]) => `Question ${id}: ${Array.isArray(answer) ? answer.join(', ') : answer}`).join('\n') +
      `

Thank you for sharing your Metamyth journey. Please provide a concise summary of your core narrative, identify key themes, and offer encouraging insights. If any critical sections seem underdeveloped, gently suggest you revisit those areas.`
    }
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: defaultModelName, // Use the default free model or a specific one if desired
      messages: promptMessages,
      max_tokens: 500, // Limit response size
    });

    const aiResponseContent = completion.choices[0].message.content;

    // You can add more sophisticated validation here if needed,
    // e.g., checking for specific keywords in the AI response to determine "validity"
    // For now, we'll assume AI always provides a valid summary if it responds.

    res.json({
      success: true,
      message: "Metamyth summary generated successfully!",
      summary: aiResponseContent,
      rawResponse: completion.choices[0].message // For debugging
    });

  } catch (error) {
    console.error("Error generating Metamyth summary:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate Metamyth summary due to an AI service error.",
      details: error.message
    });
  }
});

// --- Two-Step Endpoints ---


// 1. Single POST endpoint: Accepts history, optional model, and optional persona
app.post('/api/prepare-stream', (req, res) => {
  const { messages, model, persona } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Valid message history (non-empty array) is required.' });
  }

  const sessionId = crypto.randomUUID();
  temporaryChatSessions.set(sessionId, { history: messages, model: model, persona: persona });
  setTimeout(() => { if (temporaryChatSessions.has(sessionId)) { temporaryChatSessions.delete(sessionId); } }, SESSION_TTL_MS);

  res.json({ sessionId });
});

// 2. Single "Smart" GET endpoint: Handles both simple and persona-driven chats
app.get('/api/chat-stream', async (req, res) => {
  const { sessionId } = req.query;
  if (!sessionId) { return res.status(400).json({ error: 'Session ID is required.' }); }

  const sessionData = temporaryChatSessions.get(sessionId);
  if (!sessionData) { return res.status(404).json({ error: 'Session not found or expired. Please try sending your message again.' }); }

  temporaryChatSessions.delete(sessionId);
  const { history: clientMessages, model: requestedModelForSession, persona } = sessionData;

  let messagesForOpenAI = [];

  // A system prompt is ONLY added if it was provided by the client in the persona object.
  if (persona) {
    console.log("Building chat context with client-provided persona object.");
	if (persona.system) {
      messagesForOpenAI.push({ role: "system", content: persona.system });
	}
	
    if (Array.isArray(persona.examples)) {
      persona.examples.forEach(example => {
        if (example.user) messagesForOpenAI.push({ role: "user", content: example.user });
        if (example.assistant) messagesForOpenAI.push({ role: "assistant", content: example.assistant });
      });
    }
  } else {
    console.log("No persona provided. Building context from history only.");
  }

  // Add the actual live conversation history.
  messagesForOpenAI.push(...clientMessages);

  await streamOpenAiChat(res, messagesForOpenAI, "/api/chat-stream", requestedModelForSession);
});

// This old endpoint can be removed if no longer needed, but is kept for now.
// It will not have a system prompt unless the client provides one in the messages array.
app.get('/api/chat', async (req, res) => {
    const clientMessagesString = req.query.messages;
    const requestedModel = req.query.model;
    if (!clientMessagesString) { return res.status(400).json({ error: 'Messages parameter is required.' });}
    let parsedClientMessages;
    try {
        parsedClientMessages = JSON.parse(clientMessagesString);
        if (!Array.isArray(parsedClientMessages) || parsedClientMessages.length === 0) {
            return res.status(400).json({ error: 'Messages parameter must be a non-empty JSON array string.' });
        }
    } catch (e) { return res.status(400).json({ error: 'Invalid messages format.' }); }

    const messagesForOpenAI = parsedClientMessages;
    await streamOpenAiChat(res, messagesForOpenAI, "/api/chat", requestedModel);
});


// --- Start Server ---
app.listen(port, '0.0.0.0', () => {
  console.log(`Chatbot backend server listening at http://localhost:${port} (and on 0.0.0.0)`);
  console.log(`Configured for OpenRouter with site URL: ${siteUrl}`);
  console.log(`Proxying TTS requests to: ${KOKORO_TTS_URL}`);
  console.log(`Default free model: ${defaultModelName}`);
  console.log(`Ready to receive requests at /api/prepare-stream and /api/chat-stream.`);
});