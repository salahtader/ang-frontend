import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../models/product';
import { WishlistService } from '../../../../services/wishlist.service';
import { MessengerService } from '../../../../services/messenger.service';
import { CartService } from '../../../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../../models/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  subscriptions: Subscription[] = [];
  @Input() productItem: Product
  @Input() addedToWishlist: boolean = false
  productUrl = 'http://localhost:3000/products'

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private msg: MessengerService, private cartService: CartService, private wishlistService: WishlistService, private http: HttpClient) { }



  ngOnInit() {
    // console.log(this.productItem);
    this.wishlistService.getWishlist()
    // if(!this.productItem){ this.productItem = new Product(111111111,"No Product To Show","No Product To Show",new Category(0,''),0)}
  }
  handelAddToWishlist() {
    const sub = this.wishlistService.addToWishlist(this.productItem.id).subscribe(
      () => {
        this.addedToWishlist = true
      })
    this.subscriptions.push(sub);
  }
  handelRemoveToWishlist() {
    const sub = this.wishlistService.removeFromWishlist(this.productItem.id).subscribe(
      () => {
        this.addedToWishlist = false
      })
    this.subscriptions.push(sub);
  }
  handelAddToCart() {
    const sub = this.cartService.addProductToCart(this.productItem).subscribe({
      complete: () => this.toastr.success("Ajouter ", "+100 grammes", { progressBar: true, timeOut: 500 }),
      error: error => this.toastr.error("-", error, { progressBar: true }),
    })
    this.subscriptions.push(sub);
  }
  public getColor(i): any {
    // console.log(i.name);console.log(i.category.id);

    let a = {};
    if (i.id === 2) {
      a = { 'background-color': '#b6b63c' };
    } else {
      a = { 'background-color': 'brown' };
    }
    return a;
  }
  public getBorderColor(i): any {
    //console.log(i.name);console.log(i.category.id);
    let a = {};
    if (i.category.id === 2) {

      a = { 'border-left-color': '#b6b63c' };
    } else {
      a = { 'border-left-color': 'brown' };
    }
    return a;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

}
