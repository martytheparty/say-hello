import { 
    Service,
    signal,
    WritableSignal
} from '@angular/core';

@Service()
export class ShDataService {
    words: WritableSignal<string[]> = signal<string[]>(["hello", "hi", "hey", "greetings"]);
}
