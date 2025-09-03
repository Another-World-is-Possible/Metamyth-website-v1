import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Environment variables should be set in your Supabase project settings
const PORTAL_PASSWORD = Deno.env.get("PORTAL_PASSWORD");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const { password } = await req.json();

    // Validate password
    if (
      typeof password !== "string" ||
      password.trim().toLowerCase() !== (PORTAL_PASSWORD ?? "").toLowerCase()
    ) {
      // Return a generic "invalid" response to avoid leaking information
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // --- Password is valid, now fetch the HTML from Storage ---

    // Ensure Supabase client credentials are set
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch the file from a private bucket
    const { data: fileBlob, error: downloadError } = await supabase.storage
      .from("protected-pages") // the bucket name
      .download("metamyth.html"); // the file name

    if (downloadError) {
      console.error("Storage Error:", downloadError);
      return new Response(JSON.stringify({ error: "Could not retrieve file from storage." }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Read the blob content into a string
    const htmlContent = await fileBlob.text();

    // Serve the content as a JSON payload
    return new Response(JSON.stringify({ htmlContent }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (err) {
    console.error("Handler Error:", err);
    return new Response(
      JSON.stringify({ error: "Invalid request", details: err.message }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});