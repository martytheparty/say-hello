import { 
  inject,
  Service,
  signal,
  WritableSignal,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ApiLocale } from '../interfaces/voice-recognition.interfaces';

@Service()
export class ShRoutingService {
  private router = inject(Router);
  language: WritableSignal<string> = signal<string>("");
  region: WritableSignal<string> = signal<string>("");

  constructor() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.processLocaleParams(event.urlAfterRedirects)
    })
  }

  processLocaleParams(params: string): boolean {
    // params is like this "/en/us"
    const locale = params.replace("/","").replace("/",'-');
    const language = locale.split('-')[0];
    this.language.set(language);
    // language is like this en
    const region = locale.split('-')[1];
    this.region.set(region);


    return true;
  }

  setRouteForLocaleChange(apiLocale: ApiLocale): void {
    this.router.navigateByUrl("/"+apiLocale.language+"/"+apiLocale.region);
  }
}
