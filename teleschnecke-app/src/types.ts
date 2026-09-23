export type AvatarStyle = "klassisch" | "pirat" | "steampunk" | "futuristisch" | "fantasy";
export type SnailAvatar = { id:string; name:string; phone?:string; photoUri?:string; style:AvatarStyle; shellColor:string; bodyColor:string; eyeColor:string; accessory:string; createdAt:number; };
export const STYLE_LABELS:Record<AvatarStyle,string>={klassisch:"Klassisch",pirat:"Pirat",steampunk:"Steampunk",futuristisch:"Futuristisch",fantasy:"Fantasy"};
