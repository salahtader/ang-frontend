import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Output ,EventEmitter} from '@angular/core';
import { CartService } from '../../../../services/cart.service';
import { ProductService } from '../../../../services/product.service';
import { CartItem } from '../../../../models/cart-item';
import { Product } from '../../../../models/product';
import { MessengerService } from '../../../../services/messenger.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import {  } from 'protractor';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  subscriptions: Subscription[] = [];
  @Input() cartItem: CartItem;
  @Output() deleteRow: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('id') id: ElementRef;
  

  inputIsDisabled = true;
  constructor(private renderer: Renderer2, private cartService: CartService, private toastr: ToastrService, private productService: ProductService, private msg: MessengerService, private location: Location) {
console.log(this.cartItem);

  }

  ngOnInit() {
    //this.getProduct(this.cartItem.productId._id);

  }
  removeOrder(cartItem) {
    console.log(cartItem);
   this.renderer.addClass(this.id.nativeElement, 'fade-out-bck');
    const id = cartItem._id
    const qty = cartItem.qty
    const sub = this.cartService.removeOrder(this.cartItem, id,qty).subscribe({
      
      complete: () => {
        this.toastr.error("suprimer avec success ", "-", { progressBar: true, timeOut: 700 })
        //
       // this.id.nativeElement.hidde = true;
        
       // this.renderer.addClass(this.id.nativeElement, 'hide');
        
        // this.renderer.destroyNode(this.id.nativeElement);
        // this.renderer.parentNode.addClass()
        setTimeout(() => {
         // window.location.reload();
         this.deleteRow.emit(this.cartItem);
        }, 1000);
      }
    })
    this.subscriptions.push(sub);
  }

  triggerPromo() {
    this.inputIsDisabled = !this.inputIsDisabled
    console.log(this.inputIsDisabled);

    return this.inputIsDisabled
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }
}
