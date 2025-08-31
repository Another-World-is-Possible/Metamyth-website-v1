import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const PORTAL_PASSWORD = Deno.env.get("PORTAL_PASSWORD"); // Set this in your Supabase project env vars

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  // Respond to OPTIONS requests for CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const { password } = await req.json();
    if (
      typeof password === "string" &&
      password.trim().toLowerCase() === (PORTAL_PASSWORD ?? "").toLowerCase()
    ) {
      return new Response(JSON.stringify({ valid: true }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    return new Response(JSON.stringify({ valid: false }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Invalid request", details: String(err) }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});