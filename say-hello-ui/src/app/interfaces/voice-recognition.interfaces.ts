import { VoiceStateEnum } from "../enums/voice-recognition.enums";

export interface WordOptions {
    wordOptionId: number;
    matchStatus: VoiceStateEnum;
    word: string;
    description: string;
}
