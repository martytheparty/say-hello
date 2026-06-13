import {
  inject,
  Component
} from '@angular/core';
import { ShVoiceService } from '../../services/sh-voice.service';
import { MatIconModule } from '@angular/material/icon';
import { ResultsStatus } from './results-status/results-status';

@Component({
  selector: 'app-results-panel',
  imports: [
    MatIconModule,
    ResultsStatus
  ],
  templateUrl: './results-panel.html',
  styleUrl: './results-panel.scss',
})
export class ResultsPanel {
  shVoiceService: ShVoiceService = inject(ShVoiceService);
  helloText = 'hello';

  updateMatch(event: KeyboardEvent) {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.helloText = input.value;
  }

  getStatus(word: string): string {
    let status = "";
    
    if(this.shVoiceService.normalizedVoiceRecognitionResultSignal() === ""){
      status = "ready";
    } else if (this.shVoiceService.normalizedVoiceRecognitionResultSignal() === word) {
      status = "success";
    }

    return status;
  }
}
