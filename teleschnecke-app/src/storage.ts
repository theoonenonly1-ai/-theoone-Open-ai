import AsyncStorage from "@react-native-async-storage/async-storage";
import {SnailAvatar} from "./types";
const KEY="teleschnecke.avatars.v1";
export async function loadAvatars():Promise<SnailAvatar[]>{try{const raw=await AsyncStorage.getItem(KEY);return raw?JSON.parse(raw):[];}catch{return [];}}
export async function saveAvatars(items:SnailAvatar[]){await AsyncStorage.setItem(KEY,JSON.stringify(items));}
