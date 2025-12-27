import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
// Known false positive in coverage reporting (at time of writing).
  protected readonly title = 'Say Hello';

}
