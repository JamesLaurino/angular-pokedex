import { Component, inject, signal } from '@angular/core'
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import {User} from '../model/user.model';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly name = signal('');
  readonly password = signal('');
  readonly message = signal(`Vous êtes déconnecté.`);

  onSubmit(event: Event) {
    event.preventDefault();
    this.message.set('Tentative de connexion en cours ...');

    let user:User  = {
      id:1,
      userName: this.name(),
      password: this.password()
    }

    this.authService
      .login(user).subscribe((token:string) =>
      {
        console.log(token);
        if (token === null) {
          this.name.set('');
          this.password.set('');
          this.message.set('Les identifiants saisis sont invalides.');
          return;
        } else {
          localStorage.setItem('token', token);
          this.router.navigate(['/pokemons']);
        }
      });
  }
}
