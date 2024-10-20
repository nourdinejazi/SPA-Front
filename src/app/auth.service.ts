import { Injectable } from '@angular/core';
import { User } from './modele/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL: string = 'http://localhost:8081/users';
  token!: string;
  private helper = new JwtHelperService();

  // users: User[] = [
  //   { username: 'admin', password: '123', roles: ['ADMIN'] },
  //   { username: 'nour', password: '123', roles: ['USER', 'ADMIN'] },
  // ];
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  constructor(private router: Router, private http: HttpClient) {}
  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  login(user: User) {
    return this.http.post<User>(this.apiURL + '/login', user, {
      observe: 'response',
    });
  }
  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  decodeJWT() {
    if (this.token == undefined) return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }
  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }
  getToken(): string {
    return this.token;
  }

  // SignIn(user: User): Boolean {
  //   let validUser: Boolean = false;
  //   this.users.forEach((curUser) => {
  //     if (
  //       user.username == curUser.username &&
  //       user.password == curUser.password
  //     ) {
  //       validUser = true;
  //       this.loggedUser = curUser.username;
  //       this.isloggedIn = true;
  //       this.roles = curUser.roles;
  //       localStorage.setItem('loggedUser', this.loggedUser);
  //       localStorage.setItem('isloggedIn', String(this.isloggedIn));
  //     }
  //   });
  //   return validUser;
  // }
  isAdmin(): Boolean {
    if (!this.roles) return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }
  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }
  // setLoggedUserFromLocalStorage(login: string) {
  //   this.loggedUser = login;
  //   this.isloggedIn = true;
  //   this.getUserRoles(login);
  // }
  // getUserRoles(username: string) {
  //   this.users.forEach((curUser) => {
  //     if (curUser.username == username) {
  //       this.roles = curUser.roles;
  //     }
  //   });
  // }
}
