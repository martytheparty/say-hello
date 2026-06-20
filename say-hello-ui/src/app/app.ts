import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { ShRoutingService } from './services/sh-routing.service';
import { ShVoiceService } from './services/sh-voice.service';
import { ExecutionPanel } from './components/execution-panel/execution-panel';
import { ResultsPanel } from './components/results-panel/results-panel';

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

  startMicrophone(): void {
    this.shVoiceService.startRecord();
  }

}
