import {
  input,
  Component,
  InputSignal,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-results-status',
  imports: [
    MatIconModule
  ],
  templateUrl: './results-status.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './results-status.scss',
})
export class ResultsStatus {
   status: InputSignal<string>  = input('');
}
