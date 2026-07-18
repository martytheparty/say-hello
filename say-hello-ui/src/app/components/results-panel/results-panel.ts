import {
  inject,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { ShVoiceService } from '../../services/sh-voice.service';
import { MatIconModule } from '@angular/material/icon';
import { ResultsStatus } from './results-status/results-status';
import { ShDataService } from '../../services/sh-data.service';

@Component({
  selector: 'app-results-panel',
  imports: [
    MatIconModule,
    ResultsStatus
  ],
  templateUrl: './results-panel.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './results-panel.scss',
})
export class ResultsPanel {
  shVoiceService: ShVoiceService = inject(ShVoiceService);
  shDataService: ShDataService = inject(ShDataService);
  helloText = '';


  updateMatch(event: KeyboardEvent) {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.helloText = input.value;
  }

  getStatus(word: string): string {
    let status = "";
    
    if(this.shVoiceService.normalizedVoiceRecognitionResultSignal() === ""){
      status = "ready";
    } else if (this.shVoiceService.normalizedVoiceRecognitionResultSignal() === word.toLowerCase()) {
      status = "success";
    }

    return status;
  }
}


interface MatchOption {
  status: "success" | "ready" | "fail";
  value: string;
  result: string;
}