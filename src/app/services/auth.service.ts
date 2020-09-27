import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { loginUrl, registerUrl } from '../config/api';
import { Router } from '@angular/router';
import { MessengerService } from './messenger.service';
import { CartService } from './cart.service';
import { share } from 'rxjs/operators';
@Injectable()
export class AuthService {


  constructor(private http: HttpClient, private router: Router, private crt: CartService) { }

  registerUser(user): Observable<any> {

    return this.http.post<any>(registerUrl, user).pipe( //envoyé une seule fois
      share()
    )
  }

  public loginUser(user): Observable<any> {
    console.log(user)
    return this.http.post<any>(loginUrl, user).pipe( //envoyé une seule fois
      share()
    )
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }
  logOutUser() {
console.log(localStorage.getItem('token'));
    this.crt.removeOrderALL().subscribe(
      () => {
        
        
        localStorage.removeItem('token');
        this.crt.resetCount();
        this.router.navigate(['/home'])
      }
    );
   // location.reload

  }
  getToken() {
    return localStorage.getItem('token')
  }

}
