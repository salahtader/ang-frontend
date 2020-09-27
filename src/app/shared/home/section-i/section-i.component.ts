import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { WishlistService } from '../../../services/wishlist.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-section-i',
  templateUrl: './section-i.component.html',
  styleUrls: ['./section-i.component.css']
})
export class SectionIComponent implements OnInit {
  subscriptions: Subscription[] = [];
  productList: Product[]=[]
  wishlist: number[]=[]
  constructor( private productService : ProductService , private wishlistService:WishlistService,private router:Router) {}

  ngOnInit() {
    this.loadProducts()
   this.loadWishlist()

  }
  loadProducts(){
   const sub= this.productService.getProducts().subscribe(
      result =>{  
          result.forEach(
            (p: Product) => {
              if (p.price >= 70 ) {
                this.productList.push(p)
              }
          });
        })
       this.subscriptions.push(sub);
  }


  loadWishlist(){
    const sub=this.wishlistService.getWishlist().subscribe(productIds => {
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
