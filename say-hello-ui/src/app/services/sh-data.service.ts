import {
    effect,
    inject,
    Service,
    Signal,
    signal,
    WritableSignal
} from '@angular/core';

import { ShRoutingService } from './sh-routing.service';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { ApiLocale, ApiWord } from '../interfaces/voice-recognition.interfaces';

@Service()
export class ShDataService {
    private readonly _loading: WritableSignal<boolean> = signal<boolean>(false);
    readonly loading: Signal<boolean> = this._loading.asReadonly();

    private readonly _words: WritableSignal<ApiWord[]> = signal<ApiWord[]>([]);
    readonly words: Signal<ApiWord[]> = this._words.asReadonly();

    // true is the json for the locale is found
    private readonly _configured: WritableSignal<boolean> = signal<boolean>(false);
    readonly configured: Signal<boolean> = this._configured.asReadonly();

    private readonly _locales: WritableSignal<ApiLocale[]> = signal<ApiLocale[]>([]);
    readonly locales: Signal<ApiLocale[]> = this._locales.asReadonly();

    private readonly httpClient: HttpClient = inject(HttpClient);

    language: string = "";
    region: string = "";

    shRoutingService: ShRoutingService = inject(ShRoutingService);

    constructor() {
        effect( () => {
            this.language = this.shRoutingService.language();
            this.region = this.shRoutingService.region();

            this.getWordsForRegionLanguage(this.region, this.language);
        } );

        this.getLocales().pipe(take(1)).subscribe(
            (locales: ApiLocale[]) => {
                this._locales.set(locales);
            }
        );
    }

    getWordsForRegionLanguage(region: string, language: string): void {      
        console.log("language", language);
        console.log("region", region);
        if (region && language) {
            this._loading.set(true);
            
            this.getWords(region, language).subscribe(
                {
                    next: (result: ApiWord[]) => {
                        this._words.set(result);
                        this._loading.set(false);
                        this._configured.set(true);
                    },
                    error: (error) => {
                        if (error.status === 404) {
                            console.log('Words not found');
                            this._configured.set(false);
                        } else {
                            console.error('HTTP error:', error);
                        }

                        this._loading.set(false);
                    }
                }
            );
        }
    }

    getWords(region: string, language: string): Observable<ApiWord[]> {
        return this.httpClient.get<ApiWord[]>(
            `https://ilikeemail.com/wordsapi/words.php?region=${region}&language=${language}`
        );
    }

    private getLocales(): Observable<ApiLocale[]> {
        return this.httpClient.get<ApiLocale[]>(
            `https://ilikeemail.com/wordsapi/locales.php`
        );
    }

}
