import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { WishlistService } from '../../../services/wishlist.service';
import { Router } from '@angular/router';
import { Product } from '../../../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
  subscriptions: Subscription[] = [];
  productList: Product[]=[]
  chocolatList: Product[]=[]
  nougatList: Product[]=[]
  wishlist: number[]=[]
  constructor( private productService : ProductService , private wishlistService:WishlistService,private router:Router) {}
 ngOnInit(){
  this.loadProducts()
  this.loadWishlist()

 }
 loadProducts(){
   if(this.productList.length===0)    
 { 
    console.log(this.productList.length);
    const sub= this.productService.getProducts().subscribe(
      x => {
       // console.log(x);
          this.productList= x;
          this.productList.forEach(x => {
            if(x.id===1){
              this.chocolatList.push(x)
            }
            else{this.nougatList.push(x)}
          })
        
      })
    this.subscriptions.push(sub);
}
   
    
     
}

loadWishlist(){
  const sub = this.wishlistService.getWishlist().subscribe(productIds => {
   // console.log(productIds)
    this.wishlist = productIds
  })
  this.subscriptions.push(sub);
}

ngOnDestroy() {
  this.subscriptions.forEach(sub => {
    sub.unsubscribe();
  })
}

}
