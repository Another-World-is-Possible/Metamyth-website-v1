import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

// This is a Deno server that will run as a Supabase Edge Function.
serve(async (req) => {
  // 1. Set up CORS headers. This is important for browser-based calls.
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  // Respond to OPTIONS requests for CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 2. Get the data from the request body
    const submissionData = await req.json()
    const { responses } = submissionData;

    if (!responses) {
      throw new Error("No responses found in submission.");
    }

    // 3. Perform the qualification logic (moved from the frontend)
    // Question 4: Investment Scale - $1K+ qualifies for strategy calls
    const investmentResponse = responses[4] || "";
    const hasHighInvestment = investmentResponse.includes("$1K") || 
                             investmentResponse.includes("$5K") || 
                             investmentResponse.includes("$15K");
    
    // Question 1: Authorship Level - higher authority levels qualify for strategy calls
    const authorshipResponse = responses[1] || "";
    const hasHighAuthorship = authorshipResponse.includes("I actively author reality—leading an organization") ||
                              authorshipResponse.includes("I'm consciously building my story—creating an organization") ||
                              authorshipResponse.includes("I have significant influence—helping write the story");
    
    const qualifiesForAdvanced = hasHighInvestment || hasHighAuthorship;
    const qualification = qualifiesForAdvanced ? "advanced" : "community";

    // 4. Send the email with the submission data using MailerSend
    const MAILERSEND_API_KEY = Deno.env.get("MAILERSEND_API_KEY");
    const fromEmail = "noreply@test-nrw7gymd0vng2k8e.mlsender.net"; // Using MailerSend test domain
    const toEmail = "nate.sd@gmail.com";   // Where you want to receive the submissions

    if (!MAILERSEND_API_KEY) {
      console.error("MAILERSEND_API_KEY is not set. Email will not be sent.");
    } else {
      const TOTAL_QUESTIONS = 8;

      const formatAnswer = (answer, isHtml) => {
        const separator = isHtml ? '<br>' : '\n';
        const value = answer || "N/A";
        if (typeof value === 'string') {
          return value.split(',').join(separator);
        }
        if (Array.isArray(value)) {
          return value.join(separator);
        }
        return value;
      };

      const questionsHtml = Array.from({ length: TOTAL_QUESTIONS }, (_, i) => {
        return `<li style="margin-bottom: 15px;">
                  <strong>Question ${i + 1}:</strong>
                  <div style="padding-left: 10px; margin-top: 5px;">${formatAnswer(responses[i], true)}</div>
                </li>`;
      }).join('');

      const questionsText = Array.from({ length: TOTAL_QUESTIONS }, (_, i) => {
        return `Question ${i + 1}:\n${formatAnswer(responses[i], false)}`;
      }).join('\n\n');

      const emailHtml = `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h1>New Questionnaire Submission</h1>
          <p>A new submission has been received with the following answers:</p>
          <ul style="list-style-type: none; padding-left: 0;">
            ${questionsHtml}
          </ul>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <h2>Qualification Result:</h2>
          <p>The submission was classified as: <strong>${qualification}</strong></p>
        </div>
      `;
      
      const emailText = `
        New Questionnaire Submission\n\n
        A new submission has been received with the following answers:\n\n${questionsText}\n\n
        --------------------

        Qualification Result:

        The submission was classified as: ${qualification}
      `;

      const res = await fetch('https://api.mailersend.com/v1/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 
`Bearer ${MAILERSEND_API_KEY}`
        },
        body: JSON.stringify({
          from: { email: fromEmail },
          to: [ { email: toEmail } ],
          subject: `New Metamyth Questionnaire Submission (${qualification})`,
          html: emailHtml,
          text: emailText,
        })
      });

      if (!res.ok) {
        const errorBody = await res.text();
        console.error(`Failed to send email via MailerSend: ${res.status} ${res.statusText}`, errorBody);
      }
    }

    // 5. Return the result to the client
    const responsePayload = {
      qualified: qualification,
      message: "Your submission has been received!",
    };

    return new Response(JSON.stringify(responsePayload), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    return new Response(String(err?.message ?? err), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
})