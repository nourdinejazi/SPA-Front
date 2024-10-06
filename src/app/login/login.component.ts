import { Component } from '@angular/core';
import { User } from '../modele/user.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  constructor(private authService : AuthService,
    private router: Router) { }
  user = new User();
  erreur=0;

  onLoggedin(){
    console.log(this.user);
     let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser)
    this.router.navigate(['/']);
    else
    this.erreur = 1;    }
    
}
