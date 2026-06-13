import { Component, inject } from '@angular/core';
import { ShVoiceService } from '../../services/sh-voice.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-execution-panel',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './execution-panel.html',
  styleUrl: './execution-panel.scss',
})
export class ExecutionPanel {
  shVoiceService: ShVoiceService = inject(ShVoiceService);

  startMicrophone(): void {
    this.shVoiceService.startRecord();
  }

}
