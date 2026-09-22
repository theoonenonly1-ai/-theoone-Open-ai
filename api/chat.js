const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const MODEL = process.env.OPENAI_MODEL || "gpt-5.6-luna";
export default async function handler(req, res) {
  if (req.method !== "POST") { res.setHeader("Allow","POST"); return res.status(405).json({error:"Method not allowed"}); }
  try {
    const body = req.body || {};
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message) return res.status(400).json({error:"message is required"});
    if (!process.env.OPENAI_API_KEY) return res.status(503).json({error:"OPENAI_API_KEY is not configured"});
    const profile = body.profile || {};
    const memory = Array.isArray(body.memory) ? body.memory.slice(0,20) : [];
    const instructions = [
      "Du bist TheOone AI, ein persönlicher digitaler Companion.",
      "Antworte auf Deutsch, sofern der Nutzer nicht eine andere Sprache verwendet.",
      "Sei freundlich, direkt, kreativ und praktisch. Keine erfundenen Erinnerungen.",
      profile.name ? "Dein Name ist " + profile.name + "." : "",
      profile.role ? "Deine Rolle ist: " + profile.role + "." : "",
      profile.personality ? "Persönlichkeit: " + profile.personality + "." : "",
      memory.length ? "Vom Nutzer freigegebene Memory-Einträge:\n- " + memory.join("\n- ") : "",
      "Behandle Memory als Kontext, nicht als unumstößliche Wahrheit. Frage nach, wenn etwas unklar ist."
    ].filter(Boolean).join("\n\n");
    const upstream = await fetch(OPENAI_API_URL, { method:"POST", headers:{"Authorization":"Bearer " + process.env.OPENAI_API_KEY,"Content-Type":"application/json"}, body:JSON.stringify({model:MODEL,instructions,input:message,max_output_tokens:700}) });
    const data = await upstream.json();
    if (!upstream.ok) return res.status(upstream.status).json({error:data?.error?.message || "OpenAI request failed"});
    const reply = typeof data.output_text === "string" ? data.output_text.trim() : data.output?.flatMap(item=>item.content||[]).filter(part=>part.type==="output_text").map(part=>part.text).join("").trim();
    if (!reply) return res.status(502).json({error:"No text response received"});
    return res.status(200).json({reply,model:MODEL});
  } catch (error) { return res.status(500).json({error:"Server error"}); }
}