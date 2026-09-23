import OpenAI from "openai";

const STYLE = new Set(["klassisch", "pirat", "steampunk", "futuristisch", "fantasy"]);
const EXPRESSION = new Set(["freundlich", "frech", "ernst", "ueberrascht"]);
const EYES = new Set(["klassisch", "gross", "schmal", "cyber"]);
const ACCESSORY = new Set(["keins", "brille", "monokel", "schal", "hut"]);

function json(res: any, status: number, body: unknown) {
  res.status(status).json(body);
}

function clean(value: unknown, fallback: string, allowed: Set<string>) {
  const v = typeof value === "string" ? value : "";
  return allowed.has(v) ? v : fallback;
}

function safeText(value: unknown, max = 300) {
  return typeof value === "string" ? value.slice(0, max).replace(/[<>]/g, "") : "";
}

function dataUrlToBlob(dataUrl: string) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/s);
  if (!match) throw new Error("Ungültiges Bildformat.");
  const mime = match[1];
  const bytes = Buffer.from(match[2], "base64");
  if (bytes.length > 4_000_000) throw new Error("Bild ist zu groß. Bitte ein kleineres Foto wählen.");
  return new File([bytes], "photo.jpg", { type: mime || "image/jpeg" });
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return json(res, 405, { error: "Nur POST ist erlaubt." });

  const configuredToken = process.env.TELESCHNECKE_API_TOKEN;
  if (configuredToken && req.headers["x-teleschnecke-token"] !== configuredToken) {
    return json(res, 401, { error: "Nicht autorisiert." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return json(res, 503, { error: "OpenAI API ist auf dem Server noch nicht konfiguriert." });
  }

  try {
    const body = req.body || {};
    if (typeof body.imageDataUrl !== "string") {
      return json(res, 400, { error: "Es wurde kein Foto übermittelt." });
    }

    const style = clean(body.style, "klassisch", STYLE);
    const expression = clean(body.expression, "freundlich", EXPRESSION);
    const eyes = clean(body.eyes, "klassisch", EYES);
    const accessory = clean(body.accessory, "keins", ACCESSORY);
    const shellColor = safeText(body.shellColor, 20) || "#3569B8";
    const bodyColor = safeText(body.bodyColor, 20) || "#E7B889";
    const customPrompt = safeText(body.customPrompt, 500);

    const prompt = [
      "Transform the supplied person's face/photo reference into a completely original whimsical snail communication avatar.",
      "The result must be a new original character, not a replica or recognizable copy of any existing copyrighted character, franchise, logo, costume or trademark.",
      "Preserve the person's recognizable facial characteristics only as a creative reference while integrating them naturally into a stylized snail head/body.",
      "Show a friendly, polished standalone character suitable for a mobile contact avatar, centered, clean background, high quality.",
      "Snail shell color:", shellColor + ".",
      "Body color:", bodyColor + ".",
      "Style:", style + ".",
      "Expression:", expression + ".",
      "Eye design:", eyes + ".",
      "Accessory:", accessory + ".",
      customPrompt ? "Additional user direction: " + customPrompt : ""
    ].filter(Boolean).join(" ");

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await client.images.edit({
      model: "gpt-image-2",
      image: dataUrlToBlob(body.imageDataUrl),
      prompt,
      size: "1024x1024",
      quality: "medium"
    });

    const image = result.data?.[0]?.b64_json;
    if (!image) throw new Error("Die Bild-KI hat kein Bild zurückgegeben.");

    return json(res, 200, {
      imageDataUrl: "data:image/png;base64," + image,
      provider: "openai",
      model: "gpt-image-2"
    });
  } catch (error: any) {
    console.error(error);
    return json(res, 500, {
      error: error?.message || "Avatar konnte nicht erzeugt werden."
    });
  }
}
