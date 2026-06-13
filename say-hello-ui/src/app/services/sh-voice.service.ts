import {
  computed,
  effect,
  Injectable,
  inject,
  signal,
  WritableSignal
} from '@angular/core';

import { 
  ShRoutingService
} 
from './sh-routing.service';

import { VoiceStateEnum } from '../enums/voice-recognition.enums';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;


@Injectable({
  providedIn: 'root',
})
export class ShVoiceService {
  private recognition: any;
  recognitionOn = false;
  voiceRecognitionStateSignal: WritableSignal<VoiceStateEnum> = signal<VoiceStateEnum>(VoiceStateEnum.Off); // microphone is off by default

  
  // The first result
  voiceRecognitionResultSignal: WritableSignal<string> = signal<string>('');

  normalizedVoiceRecognitionResultSignal = computed(() => {
    return this.voiceRecognitionResultSignal()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, '') // some language will fail because of this... like Tibetan, Thai...
      .trim();
  });

  // All of the results
  voiceRecognitionTranscriptsSignal: WritableSignal<string[]> = signal<string[]>([]);

  shRoutingService: ShRoutingService = inject(ShRoutingService);
  region: string = "";
  language: string = "";

  locale: WritableSignal<string> = signal<string>("");


  constructor() {
    effect(
      () => {
        this.region = this.shRoutingService.region();
        this.language = this.shRoutingService.language();
        this.locale.set(this.language + '-' + this.region);
      }
    )

    this.setupRecognition();
  }

  setupRecognition(): void {
    if ('SpeechRecongition' in window) { // I have never seen this exist
      this.recognition =  new SpeechRecognition();
    } else if ('webkitSpeechRecognition' in window) {
      this.recognition =  new webkitSpeechRecognition(); // this is how I have always seen it
    }

    this.recognition.lang = this.locale();
    this.recognition.continuous = false;

    this.recognition.onaudiostart = (result: any) => {
      console.log("onaudiostart");
      this.voiceRecognitionStateSignal.set(VoiceStateEnum.On);
      this.recognitionOn = true;
    }

    this.recognition.onaudioend = (result: any) => {
            console.log("onaudioend");
      this.voiceRecognitionStateSignal.set(VoiceStateEnum.Off);
      this.recognitionOn = false;
    }

    this.recognition.onerror = (event: any) => {
      console.log("on error");
      this.voiceRecognitionStateSignal.set(VoiceStateEnum.Off);
      console.log("ON Error Event: ",event.error);
    } 

    this.recognition.onresult = (event: any) => {
            // event.results contains the recognized phrases
            // const transcript = 
            // Array.from(event.results) as any[];
      console.log("Result", event);
      const resultsArray = Array.from(event.results);
      let lastResult = "";

      if (resultsArray?.length  > 0) {
        const srResult: any[] = resultsArray[resultsArray.length - 1] as any[];
        lastResult = srResult[0].transcript;
      }

      const transcripts = Array.from(event.results)
          .map((result: any) => result[0].transcript);

        this.voiceRecognitionResultSignal.set(lastResult);
        this.voiceRecognitionTranscriptsSignal.set(transcripts);
      };

      console.log(this.recognition);    
    }

    startRecord() {
      this.setupRecognition();
      console.log("Start Requested");
      if(this.recognition) {
          this.voiceRecognitionStateSignal.set(VoiceStateEnum.Waiting);
          this.recognition.start();
      } else {
        alert("Recognition API does not appear to be supported.");
      }
    }

}
