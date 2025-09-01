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
    // IMPORTANT: Replace with your own email addresses
    const fromEmail = "noreply@test-nrw7gymd0vng2k8e.mlsender.net"; // Using MailerSend test domain
    const toEmail = "zachary@anotherworld.earth";   // Where you want to receive the submissions

    if (!MAILERSEND_API_KEY) {
      console.error("MAILERSEND_API_KEY is not set. Email will not be sent.");
    } else {
      const emailHtml = `
        <h1>New Questionnaire Submission</h1>
        <p>A new submission has been received with the following answers:</p>
        <ul>
          ${Object.entries(responses).map(([q, a]) => `<li><strong>Question ${parseInt(q) + 1}:</strong> ${a}</li>`).join('')}
        </ul>
        <hr>
        <h2>Qualification Result:</h2>
        <p>The submission was classified as: <strong>${qualification}</strong></p>
      `;
      const emailText = `
        New Questionnaire Submission
        A new submission has been received with the following answers:
        ${Object.entries(responses).map(([q, a]) => `Question ${parseInt(q) + 1}: ${a}`).join('\
')}
        ---
        Qualification Result:
        The submission was classified as: ${qualification}
      `;

      const res = await fetch('https://api.mailersend.com/v1/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Bearer ${MAILERSEND_API_KEY}`
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
        // Note: We don't throw here, so the client still gets a success response
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