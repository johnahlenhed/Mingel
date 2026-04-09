// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts"
import { Resend } from 'npm:resend'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}


Deno.serve(async (req) => {
  if(req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { email, loginCode } = await req.json()

  const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

  const { error } = await resend.emails.send({
    from: 'Mingel <hello@mingel.johnahlenhed.se>',
    to: email,
    subject: 'Your login code for the event:',
    html: `
      <p>Here is your login code for the event: <strong>${loginCode}</strong></p>
    `

  })

  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500, headers: corsHeaders })
  }

  return new Response(JSON.stringify({ success: true }), { status: 200, headers: corsHeaders })

})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-email' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
