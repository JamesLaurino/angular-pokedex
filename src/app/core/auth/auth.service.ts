import {Injectable, signal} from '@angular/core';
import {delay, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly #isLoggIn = signal(false);
  readonly isLoggIn = this.#isLoggIn.asReadonly();

  login(name:string,password:string):Observable<boolean>{
    const isLoggIn = name === 'Pikachu' && password === 'Pikachu#';
    this.#isLoggIn.set(isLoggIn);
    return of(isLoggIn).pipe(delay(1000))
  }
}
