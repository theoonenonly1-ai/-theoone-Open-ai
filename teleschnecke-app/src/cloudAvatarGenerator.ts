import {AvatarGenerationInput, AvatarGenerationResult, AvatarGenerator} from "./avatarGenerator";

function getApiUrl() {
  const value = process.env.EXPO_PUBLIC_TELESCHNECKE_API_URL;
  return value ? value.replace(/\/$/, "") + "/api/generate-avatar" : "";
}

export const cloudAvatarGenerator: AvatarGenerator = {
  async generate(input: AvatarGenerationInput): Promise<AvatarGenerationResult> {
    const endpoint = getApiUrl();
    if (!endpoint) throw new Error("Die KI-Serveradresse ist noch nicht in der App konfiguriert.");

    const response = await fetch(input.photoUri);
    const blob = await response.blob();

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Foto konnte nicht gelesen werden."));
      reader.onerror = () => reject(new Error("Foto konnte nicht gelesen werden."));
      reader.readAsDataURL(blob);
    });

    const result = await fetch(endpoint, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        imageDataUrl: dataUrl,
        style: input.base.style,
        expression: input.base.expression,
        eyes: input.base.eyes,
        accessory: input.base.accessory,
        shellColor: input.base.shellColor,
        bodyColor: input.base.bodyColor,
        customPrompt: input.prompt || ""
      })
    });

    const payload = await result.json().catch(() => ({}));
    if (!result.ok) throw new Error(payload.error || "KI-Avatar konnte nicht erzeugt werden.");

    return {imageUri: payload.imageDataUrl, provider: "cloud"};
  }
};
