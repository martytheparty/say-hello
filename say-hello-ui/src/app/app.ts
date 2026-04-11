import { Component, inject } from '@angular/core';

import { ShRoutingService } from './services/sh-routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
// Known false positive in coverage reporting (at time of writing).
  protected readonly title = 'Say Hello';
  shRoutingService: ShRoutingService = inject(ShRoutingService);

}
