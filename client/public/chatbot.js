// chatbot.js

//
// --- INITIALIZE CONFIGURATION (Single Source of Truth) ---

// Define the default configuration for the chatbot first.
const config = {
    model: 'deepseek/deepseek-chat-v3-0324:free',
    botAvatarImg: 'bot.png',
    userAvatarImg: 'user.png',
    botName: 'Bot',
    typingText: 'Typing...',
    inputPlaceholder: 'Type a message...',
    enablePulsingEffect: true,
    streamingIndicatorIcon: '⏹',
    initialMessageId: 'initial-bot-message',
    personaDataId: 'persona-data'
};

// Find the user-provided config in the HTML and merge/overwrite the defaults.
const userConfigElement = document.getElementById('chatbot-config');
if (userConfigElement) {
    try {
        const userConfig = JSON.parse(userConfigElement.textContent);
        // Object.assign overwrites properties in 'config' with properties from 'userConfig'
        Object.assign(config, userConfig);
    } catch (e) {
        console.error("Could not parse #chatbot-config JSON.", e);
    }
}

//
// --- DOM Element and API Constants ---

const chatView = document.getElementById('chat-view');
const chatTextbox = document.getElementById('chat-textbox');
const sendButton = document.getElementById('send-button');
const audioPlayer = document.getElementById('tts-audio-player');

const API_BASE_URL = 'https://chatproxy.i.rickey.io';
const PREPARE_STREAM_ENDPOINT = `${API_BASE_URL}/api/prepare-stream`;
const CHAT_STREAM_ENDPOINT = `${API_BASE_URL}/api/chat-stream`;
const TTS_ENDPOINT = `${API_BASE_URL}/api/tts`;

//
// --- State Variables ---

let conversationLog = [];
let typingIndicatorElement = null;
let currentBotMessageContentElement = null;
let eventSource = null;
let currentFullBotResponse = '';
let tokenBuffer = '';
let updateTimeoutId = null;
let isAudioUnlocked = false;
const UPDATE_INTERVAL = 20;

//
// --- Core Functions ---

function autoResizeTextarea(element) {
	element.style.height = 'auto';
	element.style.height = `${element.scrollHeight}px`;
}

function cleanTextForTTS(text) {
    if (!text) return '';
    let cleanedText = text;
    cleanedText = cleanedText.replace(/\s*(---|--|—|–)\s*/g, '. ');
    const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
    cleanedText = cleanedText.replace(emojiRegex, '');
    cleanedText = cleanedText.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
    cleanedText = cleanedText.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1');
    cleanedText = cleanedText.replace(/^[#]{1,6}\s/gm, '');
    cleanedText = cleanedText.replace(/^[\s]*([*+-]|\d+\.)\s/gm, '');
    cleanedText = cleanedText.replace(/(\*\*|__|\*|_|~~|`)/g, '');
    cleanedText = cleanedText.replace(/[ \t]+/g, ' ');
    cleanedText = cleanedText.replace(/(\r\n|\n|\r){2,}/g, '\n\n');
	console.log(cleanedText.trim() + '\n');
    return cleanedText.trim();
}

function playTextAsAudio(text, indicatorContainer) {
    const speaker = indicatorContainer.querySelector('.speaker');
    if (window.speechSynthesis.speaking && speaker.textContent === '⏹️') {
        window.speechSynthesis.cancel();
        return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    document.querySelectorAll('.tts-indicator-container .speaker').forEach(spk => spk.textContent = '🔊');
    utterance.onstart = () => { speaker.textContent = '⏹️'; };
    utterance.onend = () => { speaker.textContent = '🔊'; };
    utterance.onerror = (e) => {
        console.error("Web Speech synthesis error:", e);
        speaker.textContent = '⚠️';
    };
    window.speechSynthesis.speak(utterance);
}

async function requestAndPlayAudio(text, indicatorContainer, autoplay = false) {
    const speaker = indicatorContainer.querySelector('.speaker');
    const hourglass = indicatorContainer.querySelector('.hourglass');

    if (indicatorContainer.dataset.audioSrc) {
        audioPlayer.src = indicatorContainer.dataset.audioSrc;
        if (autoplay) {
            audioPlayer.play();
        }
        return;
    }

    if (hourglass) hourglass.style.display = 'inline';
    indicatorContainer.classList.add('loading');
    indicatorContainer.style.cursor = 'wait';
    indicatorContainer.onclick = null;

    try {
        const response = await fetch(TTS_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text }),
        });
        if (!response.ok) {
            throw new Error(`TTS server responded with status ${response.status}`);
        }
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        indicatorContainer.dataset.audioSrc = audioUrl;
        if (hourglass) hourglass.style.display = 'none';
        indicatorContainer.classList.remove('loading');
        indicatorContainer.style.cursor = 'pointer';

        indicatorContainer.onclick = () => {
            audioPlayer.src = audioUrl;
            audioPlayer.play();
        };

        if (autoplay) {
            audioPlayer.src = audioUrl;
            audioPlayer.play();
        }
    } catch (error) {
        console.error('Custom TTS failed, falling back to Web Speech API.', error);
        if (hourglass) hourglass.style.display = 'none';
        indicatorContainer.classList.remove('loading');
        indicatorContainer.style.cursor = 'pointer';
        if (speaker) speaker.textContent = '▶️';
        indicatorContainer.onclick = () => playTextAsAudio(text, indicatorContainer);
        if (autoplay) {
            playTextAsAudio(text, indicatorContainer);
        }
    }
}

/**
 * Safely escapes HTML special characters in a string.
 * @param {string} str The string to escape.
 * @returns {string} The escaped string.
 */
function escapeHTML(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
}

/**
 * Adds a new message bubble to the chat view, now with multi-line user messages.
 * @param {string} message The content of the message.
 * @param {'user'|'bot'} sender Who sent the message.
 * @param {boolean} makeCurrentBotMessage Flags this as the active streaming message element.
 */
function addMessageToView(message, sender, makeCurrentBotMessage = false) {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('chat-message-wrapper');
    const avatar = document.createElement('img');
    avatar.classList.add('chat-avatar');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    
    if (sender === 'user') {
        messageWrapper.classList.add('user-message-wrapper');
        // Add 'markdown-body' class for consistent styling
        messageElement.classList.add('user-message', 'markdown-body'); 
        avatar.src = config.userAvatarImg;
        avatar.alt = 'User';
		
		// 1. First, escape the user's text to prevent HTML injection.
        const sanitizedMessage = escapeHTML(message);

        // 2. Then, replace single newlines with double newlines. This tells the
        //    Markdown parser to create a paragraph break, effectively a new line.
        const messageWithHardBreaks = sanitizedMessage.replace(/\n/g, '\n\n');
        messageElement.innerHTML = marked.parse(messageWithHardBreaks); 

        messageWrapper.appendChild(messageElement);
        messageWrapper.appendChild(avatar);
    } else { 
        messageWrapper.classList.add('bot-message-wrapper');
        // Add 'markdown-body' class for consistent styling
        messageElement.classList.add('bot-message', 'markdown-body');
        avatar.src = config.botAvatarImg;
        avatar.alt = config.botName;
        messageElement.innerHTML = marked.parse(message);

        if (makeCurrentBotMessage) {
            currentBotMessageContentElement = messageElement;
            if (config.enablePulsingEffect) {
                currentBotMessageContentElement.classList.add('streaming-text');
            }
        }
        messageWrapper.appendChild(avatar);
        messageWrapper.appendChild(messageElement);
    }
    chatView.appendChild(messageWrapper);
    setTimeout(() => { chatView.scrollTop = chatView.scrollHeight; }, 50); 
}

function createTtsIndicator() {
    const container = document.createElement('div');
    container.className = 'tts-indicator-container';
    const speaker = document.createElement('span');
    speaker.className = 'speaker';
    speaker.textContent = '🔊';
    const hourglass = document.createElement('span');
    hourglass.className = 'hourglass';
    hourglass.textContent = '⏳';
    hourglass.style.display = 'none';
    container.appendChild(speaker);
    container.appendChild(hourglass);
    return container;
}

function flushTokenBuffer() {
    if (currentBotMessageContentElement) {
        const isScrolledToBottom = chatView.scrollHeight - chatView.clientHeight <= chatView.scrollTop + 10;
        const indicator = currentBotMessageContentElement.querySelector('.streaming-indicator');
        currentBotMessageContentElement.innerHTML = marked.parse(currentFullBotResponse);
        if (indicator) {
            currentBotMessageContentElement.appendChild(indicator);
        }
        if (isScrolledToBottom) {
            chatView.scrollTop = chatView.scrollHeight;
        }
    }
}

function appendToBotMessage(textChunk) {
    currentFullBotResponse += textChunk;
    tokenBuffer += textChunk;
    if (!updateTimeoutId) {
        updateTimeoutId = setTimeout(() => {
            flushTokenBuffer();
            tokenBuffer = '';
            updateTimeoutId = null;
        }, UPDATE_INTERVAL);
    }
}

function showTypingIndicator() {
    if (typingIndicatorElement) return;
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('chat-message-wrapper', 'bot-message-wrapper');
    const avatar = document.createElement('img');
    avatar.classList.add('chat-avatar');
    avatar.src = config.botAvatarImg;
    avatar.alt = config.botName;
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', 'bot-message');
    messageElement.style.paddingBottom = '10px';
    messageElement.style.fontStyle = 'italic';
    messageElement.textContent = config.typingText;

    messageWrapper.appendChild(avatar);
    messageWrapper.appendChild(messageElement);
    typingIndicatorElement = messageWrapper;
    chatView.appendChild(typingIndicatorElement);
    chatView.scrollTop = chatView.scrollHeight;
}

function hideTypingIndicator() {
    if (typingIndicatorElement) {
        typingIndicatorElement.remove();
        typingIndicatorElement = null;
    }
}

function initializeChat() {
    const initialBotMessageElement = document.getElementById(config.initialMessageId);
    if (initialBotMessageElement) {
        const clone = initialBotMessageElement.cloneNode(true);
        const indicatorInClone = clone.querySelector('.tts-indicator-container');
        if (indicatorInClone) indicatorInClone.remove();
        
        const initialText = clone.textContent.trim();

        if (initialText) {
            conversationLog.push({ role: 'assistant', content: initialText });
            const indicator = createTtsIndicator();
            initialBotMessageElement.appendChild(indicator);
            requestAndPlayAudio(cleanTextForTTS(initialText), indicator, false);
        }
    }
}

function clearEventSource() {
    if (eventSource) { eventSource.close(); eventSource = null; }
    if (updateTimeoutId) { clearTimeout(updateTimeoutId); updateTimeoutId = null; }
    currentFullBotResponse = '';
    tokenBuffer = '';
}

async function sendMessage() {
    const messageText = chatTextbox.value.trim();
    if (messageText === '') return;
	
    // On the very first user interaction, we need to "unlock" the audio context.
    // We do this by playing a tiny, silent audio clip in response to the user's click.
    if (!isAudioUnlocked) {
        console.log("Attempting to unlock audio context for iOS...");
        // A tiny, silent WAV file encoded as a Data URL.
        const silentAudio = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
        audioPlayer.src = silentAudio;
        
        // We must call .play() within the user gesture event handler.
        // We use a .then() to set our flag only after a successful play attempt.
        // The .catch() is important to prevent console errors if it's blocked.
        audioPlayer.play().then(() => {
            isAudioUnlocked = true;
            console.log("Audio context unlocked.");
        }).catch(e => {
            // This might still fail on some strict browsers, but the attempt is what matters.
            console.warn("Audio unlock attempt failed, but continuing. Subsequent plays may require a click.", e);
            // We can set it to true anyway, as the user has performed a gesture.
            isAudioUnlocked = true; 
        });
    }
	
    clearEventSource();
    currentBotMessageContentElement = null;

    addMessageToView(messageText, 'user');
    chatTextbox.value = '';
    conversationLog.push({ role: 'user', content: messageText });
    
    addMessageToView('', 'bot', true);
    const streamingIndicator = document.createElement('div');
    streamingIndicator.className = 'streaming-indicator';
    streamingIndicator.textContent = config.streamingIndicatorIcon;
    currentBotMessageContentElement.appendChild(streamingIndicator);
    if (config.enablePulsingEffect) {
        currentBotMessageContentElement.classList.add('streaming-text');
    }
    
    try {
        const personaDataElement = document.getElementById(config.personaDataId);
        const persona = personaDataElement ? JSON.parse(personaDataElement.textContent) : null;

        const postPayload = { messages: conversationLog };
        if (persona) {
            postPayload.persona = persona;
        }
        
        if (config.model && config.model.endsWith(':free')) {
            postPayload.model = config.model;
        }

        const prepareResponse = await fetch(PREPARE_STREAM_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postPayload),
        });

        if (!prepareResponse.ok) { throw new Error(`Failed to prepare stream: ${prepareResponse.statusText}`); }
        const sessionData = await prepareResponse.json();
        if (!sessionData.sessionId) { throw new Error('Invalid session response from server.'); }

        const sseUrl = `${CHAT_STREAM_ENDPOINT}?sessionId=${sessionData.sessionId}`;
        eventSource = new EventSource(sseUrl);

        eventSource.onmessage = function(event) {
            const data = JSON.parse(event.data);

            if (currentBotMessageContentElement && !currentBotMessageContentElement.parentNode) {
                // Element was removed, maybe through error handling, stop processing
                clearEventSource();
                return;
            }
            
            if (data.token) {
                appendToBotMessage(data.token);
            }

            if (data.end) {
                if (updateTimeoutId) { clearTimeout(updateTimeoutId); updateTimeoutId = null; }
                flushTokenBuffer();

                if (currentBotMessageContentElement) {
                    currentBotMessageContentElement.classList.remove('streaming-text');
                    currentBotMessageContentElement.querySelector('.streaming-indicator')?.remove();
                    const indicator = createTtsIndicator();
                    currentBotMessageContentElement.appendChild(indicator);
                    const cleanFinalText = cleanTextForTTS(currentFullBotResponse.trim());
                    requestAndPlayAudio(cleanFinalText, indicator, true);
                }
                
                if (currentFullBotResponse.trim() !== "") {
                    conversationLog.push({ role: 'assistant', content: currentFullBotResponse.trim() });
                }
                clearEventSource(); 
                currentBotMessageContentElement = null; 
            }

            if (data.error) {
                if(currentBotMessageContentElement) {
                    currentBotMessageContentElement.classList.remove('streaming-text');
                    currentBotMessageContentElement.querySelector('.streaming-indicator')?.remove();
                    currentBotMessageContentElement.innerHTML = marked.parse(`[System Error: ${data.error}]`);
                }
                clearEventSource(); 
            }
        };

        eventSource.onerror = function(error) {
            if(currentBotMessageContentElement) {
                currentBotMessageContentElement.classList.remove('streaming-text');
                currentBotMessageContentElement.querySelector('.streaming-indicator')?.remove();
                const errorMessage = "[Error: Connection to AI lost. Please try again.]";
                currentBotMessageContentElement.innerHTML = marked.parse(currentFullBotResponse + `\n${errorMessage}`);
            }
            clearEventSource();
        };

    } catch (error) {
        if(currentBotMessageContentElement) {
            currentBotMessageContentElement.classList.remove('streaming-text');
            currentBotMessageContentElement.querySelector('.streaming-indicator')?.remove();
        }
        console.error("Error in sendMessage:", error);
        addMessageToView(`[System Error: ${error.message}]`, 'bot');
    }
}

//
// Initial Setup

// Set placeholder text with platform-specific hint
const isDesktop = !('ontouchstart' in window || navigator.maxTouchPoints > 0);
let placeholderText = config.inputPlaceholder;
if (isDesktop) {
	placeholderText += '\n(Shift+Enter for a new line)';
}
chatTextbox.placeholder = placeholderText;

// Attach event listeners
sendButton.addEventListener('click', sendMessage);
chatTextbox.addEventListener('keydown', function(event) {
	// Send on Enter
	if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

// Run the chat initialization logic
initializeChat();
