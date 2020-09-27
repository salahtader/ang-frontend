import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../../services/messenger.service';
import { AuthService } from '../../../services/auth.service';
import {Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  subscriptions: Subscription[] = []; 
  registerUserData = {
    email: "",
    password:""
  }
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }
  registerUser(){
    const sub = this.authService.registerUser(this.registerUserData)
    .subscribe(
      res =>{
        console.log(res)
       // localStorage.setItem('token', res.token)
        this.router.navigate(['/login'])
      },

      
      err => console.log(err)
    )
    this.subscriptions.push(sub);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }
}
