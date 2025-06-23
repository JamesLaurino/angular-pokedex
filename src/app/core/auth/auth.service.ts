import {inject, Injectable, signal} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly #http = inject(HttpClient);

  login(user:User):Observable<string> {
    return this.#http.post<string>('http://localhost:8080/demo',user);
  }
}
