import { 
  Component,
  inject,
} from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ApiLocale } from '../../interfaces/voice-recognition.interfaces';
import { ShDataService } from '../../services/sh-data.service';
import { ShRoutingService } from '../../services/sh-routing.service';

@Component({
  selector: 'app-local-nav-component',
  imports: [
    MatSelectModule
  ],
  templateUrl: './local-nav-component.html',
  styleUrl: './local-nav-component.scss',
})
export class LocalNavComponent {
  shDataService: ShDataService = inject(ShDataService);
  shRoutingService: ShRoutingService = inject(ShRoutingService);

  changeLocale(msLocale: MatSelectChange<ApiLocale>): void {
    const apiLocale: ApiLocale = msLocale.value;
    this.shRoutingService.setRouteForLocaleChange(apiLocale);
  }
}


