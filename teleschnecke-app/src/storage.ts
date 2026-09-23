import AsyncStorage from "@react-native-async-storage/async-storage";
import {AvatarAccessory,AvatarExpression,AvatarEyes,SnailAvatar} from "./types";
const KEY="teleschnecke.avatars.v1";
const defaults={expression:"freundlich" as AvatarExpression,eyes:"klassisch" as AvatarEyes,accessory:"keins" as AvatarAccessory};
export async function loadAvatars():Promise<SnailAvatar[]>{
  try{
    const raw=await AsyncStorage.getItem(KEY);
    if(!raw)return [];
    const parsed=JSON.parse(raw);
    if(!Array.isArray(parsed))return [];
    return parsed.map((x:any)=>({...x,...defaults,expression:x?.expression||defaults.expression,eyes:x?.eyes||defaults.eyes,accessory:x?.accessory||defaults.accessory}));
  }catch{return [];}
}
export async function saveAvatars(items:SnailAvatar[]){await AsyncStorage.setItem(KEY,JSON.stringify(items));}
