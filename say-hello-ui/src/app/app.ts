import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { ShRoutingService } from './services/sh-routing.service';
import { ShVoiceService } from './services/sh-voice.service';
import { ExecutionPanel } from './components/execution-panel/execution-panel';
import { ResultsPanel } from './components/results-panel/results-panel';
import { WordOptions } from './interfaces/voice-recognition.interfaces';
import { VoiceStateEnum } from './enums/voice-recognition.enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ 
    ExecutionPanel,
    ResultsPanel
  ]
})
export class App {
  shRoutingService: ShRoutingService = inject(ShRoutingService);
  shVoiceService: ShVoiceService = inject(ShVoiceService);

  wordOptions: WordOptions[] = [];

  constructor() {
    this.addWord(
      this.wordOptions.length,
      VoiceStateEnum.Off,
      "hello",
      "A generally formal greeting the is very common to use throughout the US"
    );

    this.addWord(
      this.wordOptions.length,
      VoiceStateEnum.Off,
      "hi",
      "A generally informal greeting the is very common to use throughout the US"
    )

    this.addWord(
      this.wordOptions.length,
      VoiceStateEnum.Off,
      "hey",
      "A generally informal greeting the is very common to use throughout the US particulary when you want to get someone's attention."
    )

  }

  addWord(
    wordOptionId: number,
    matchStatus: VoiceStateEnum,
    word: string,
    description: string
  ): void {
    
    this.wordOptions.push({
      wordOptionId,
      matchStatus,
      word,
      description
    });
  
  }

  startMicrophone(): void {
    this.shVoiceService.startRecord();
  }

}
