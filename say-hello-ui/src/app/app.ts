import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { ShRoutingService } from './services/sh-routing.service';
import { ShVoiceService } from './services/sh-voice.service';
import { ExecutionPanel } from './components/execution-panel/execution-panel';
import { ResultsPanel } from './components/results-panel/results-panel';
import { ApiLocale, WordOptions } from './interfaces/voice-recognition.interfaces';
import { VoiceStateEnum } from './enums/voice-recognition.enums';
import { ShDataService } from './services/sh-data.service';
import { LoaderComponent } from './components/loader/loader/loader';
import { LocalNavComponent } from './components/local-nav-component/local-nav-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ 
    ExecutionPanel,
    ResultsPanel,
    LoaderComponent,
    LocalNavComponent
  ]
})
export class App {
  shRoutingService: ShRoutingService = inject(ShRoutingService);
  shVoiceService: ShVoiceService = inject(ShVoiceService);
  shDataService: ShDataService = inject(ShDataService);

  wordOptions: WordOptions[] = [];
  locales: ApiLocale[] = [];

  constructor() {
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
