import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) {
//     this.isDev = false;  // Change to false before deployment
      }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    //change ip to localhost for testing, or deployment
      .map(res => res.json());
  }
   sendMessage(message) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/chatsend', message, {headers: headers})

      .map(res => res.json());
  }

 DeleteUser(user) {
     let delUser = {
      name: user
     };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/delete', delUser, {headers: headers})

      .map(res => res.json());
  }
  ChangeUserPass(user) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('localhost/users/passchange', user, {headers: headers})

      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})

      .map(res => res.json());
  }

  getUsers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/dashboard', {headers: headers})

  .map(res => res.json());
  }
  getDocs() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/getdocs', {headers: headers})

  .map(res => res.json());
  }

  getData() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/dashboard2', {headers: headers})

  .map(res => res.json());
  }
   getDevice(user) {
    let user2 = {
      name: user
     };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/dashboard3',user2, {headers: headers})

  .map(res => res.json());
  }
  getMessage(user) {
    let user2 = {
      name: user
     };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/chatget',user2, {headers: headers})

  .map(res => res.json());
  }
  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})

  .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  DoctorLoggedIn(){
    if (this.loggedIn() && this.user == null){
     this.getProfile().subscribe( res => {
      this.user = res.user;
     });
    }
    if (this.user == null ){
     return false;
    } else {
     return ((tokenNotExpired('id_token')) && (this.user.role == 'Doctor') );
    }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

 HexiProfileGet(){
    if (this.loggedIn() && this.user == null){
    this.getProfile().subscribe( res => {
      this.user = res.user;
     });
    }
    if (this.user == null ){
     return false;
    } else {
     return (this.user );
    }
  }

HexiDeviceGet(name){
    this.getDevice(name).subscribe( res => {
      localStorage.setItem('devicefordoc', res.user[0].device);

      return res;
     });
  }

}

