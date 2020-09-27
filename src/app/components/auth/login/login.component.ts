import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent   {
  
  

  subscriptions: Subscription[] = [];
  loginUserData = {
    email: "",
    password:""
  }
  constructor(private authService:AuthService,private router:Router) { }


  loginUser(){
    const sub = this.authService.loginUser(this.loginUserData)
    .subscribe(
      res =>{
        console.log(res)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/home'])
      },
      err => console.log(err)
    )
    this.subscriptions.push(sub);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(
      sub => {
      sub.unsubscribe();
    })
  }
}
