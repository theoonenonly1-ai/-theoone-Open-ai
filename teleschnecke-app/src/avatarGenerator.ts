import {SnailAvatar} from "./types";

/**
 * V1 uses the local composer in App.tsx and never uploads photos.
 * This provider boundary keeps the commercial app ready for a future
 * optional generative transformer without coupling the UI to a vendor.
 */
export type AvatarGenerationInput = {
  photoUri:string;
  base:SnailAvatar;
  prompt?:string;
};

export type AvatarGenerationResult = {
  imageUri:string;
  provider:"local"|"cloud";
};

export interface AvatarGenerator {
  generate(input:AvatarGenerationInput):Promise<AvatarGenerationResult>;
}

/**
 * Safe V1 fallback: the current app composes the uploaded photo locally.
 * A future provider can implement real face-to-original-snail transformation
 * behind this interface while preserving the same UI and storage model.
 */
export const localAvatarGenerator:AvatarGenerator={
  async generate(input){
    return {imageUri:input.photoUri,provider:"local"};
  }
};
