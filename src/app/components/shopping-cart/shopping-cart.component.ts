import { Component, OnInit, ViewChildren ,QueryList, AfterViewInit, OnChanges, Directive, ViewChild, ElementRef} from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cart-item';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit ,AfterViewInit{
 // @ViewChildren('ref') ref: QueryList<any>;
  @ViewChildren('ref') ref:ElementRef;

  subscriptions: Subscription[] = [];
  cartItems: CartItem[] = [];
  //=[];
  cartTotal= 0;
   constructor(private msg:MessengerService,private cartService: CartService,private router :Router,private auth:AuthService) { }
 
   ngOnInit() {
     this.handleSubscription()
     this.loadCartItems()
     
   }

   handleSubscription(){
      const sub = this.msg.getMsg().subscribe((product : Product)=>{
      this.loadCartItems(); 
     }) 
     this.subscriptions.push(sub);
  }
   
   loadCartItems(){
   

     const sub= this.cartService.getCartItem().subscribe(
       (items:CartItem[]) =>{
         this.cartItems = items.sort()
       this.calcCartTotal()
      },
      err =>  {
        if( err instanceof HttpErrorResponse){
          if(err.status== 401){
            console.log('to login');
            this.auth.logOutUser()
           this.router.navigate(['/login'])
          }else if(err.status== 500){
              console.log('problm serv');
          // this.router.navigate(['/login'])
          }
        }
      }
     
     )
     this.subscriptions.push(sub);
     }
    
  
   
   calcCartTotal(){
  
     this.cartTotal = 0
    this.cartItems.forEach(
       (x:CartItem)=>{
        this.cartTotal += x.productId.price * x.qty
      }
     );
    
   }
   onDeleteRow(item: CartItem) {

    // console.log(this.cartItems.indexOf(item));
     
    this.cartItems.splice(this.cartItems.indexOf(item),1);
    this.loadCartItems();
  //  this.cartTotal -= this.cartItems.indexOf(item).qty
}
   ngAfterViewInit():void {
     
   // this.handleSubscription()
   }

    
   ngOnDestroy() {

    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }
}
