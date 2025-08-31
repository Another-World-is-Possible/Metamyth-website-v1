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

    // 4. (Next Step) You can now save the submission to your Supabase database here.
    // You would first need to create a table e.g., 'questionnaire_submissions' in Supabase.

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