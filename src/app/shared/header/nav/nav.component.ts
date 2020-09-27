import { Component, OnInit, VERSION, Input } from '@angular/core';
import { MessengerService } from '../../../services/messenger.service';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product';
import { CartItem } from '../../../models/cart-item';
import { WishlistService } from '../../../services/wishlist.service';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  subscriptions: Subscription[] = [];
  cartItems$: Observable<any>;
  cartItems: CartItem[] = [];
 cartTotal= 0;
 subscription;
  collapsed = true;
  title = 'Angular' + VERSION.major;
  @Input() imgPath:string = "/assets/nav/";
  logo:string = "logo.png";
  

  constructor(private msg:MessengerService,private cartService: CartService,public authService:AuthService) {
    this.loadOrders()
   }

  ngOnInit() {
  
    this.handleSubscription()
    this.loadCartItems()
    this.cartTotal=  this.cartItems.length;
    //console.log( this.cartItems.length);
  }

  handleSubscription(){
    
    
      this.subscription = this.msg.getCount().subscribe(
        res => {
          this.cartTotal = res.value;
        },
        err =>  {
              if( err instanceof HttpErrorResponse){
                if(err.status== 401){
                  console.log('to login');
                  
                //this.router.navigate(['/login'])
                }
              }
        });
 
      const sub =  this.msg.getMsg().subscribe(
      (product : Product) =>{

      this.loadCartItems(); 
      }) 
      this.subscriptions.push(sub);
      this.subscriptions.push(this.subscription);
  
    }
    async loadOrders() {
    console.log("salutttttttt");
    
    await this.cartService.getOtders();
    this.cartItems$ = this.cartService.datas$;
    console.log(this.cartItems$);
    
    this.cartItems$.pipe(
      map((data: any) => {
        console.log(data);
        
        this.cartItems = data.orders
        this.cartTotal= data.cout
       
      }

    )).subscribe() 
    console.log(this.cartTotal) 
  }
    loadCartItems(){
      
      const sub=this.cartService.getCartItem().subscribe(
        (items:CartItem[]) =>{
        //  this.cartItems = items
       
      }) 
    this.subscriptions.push(sub);

    
    
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  } 
}
