import {
  inject,
  Component
} from '@angular/core';
import { ShVoiceService } from '../../services/sh-voice.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-results-panel',
  imports: [
    MatIconModule
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
}
