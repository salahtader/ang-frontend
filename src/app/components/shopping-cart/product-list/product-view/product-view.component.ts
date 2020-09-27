import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessengerService } from '../../../../services/messenger.service';
import { CartService } from '../../../../services/cart.service';
import { Product } from '../../../../models/product';
import { WishlistService } from '../../../../services/wishlist.service';
import { ProductService } from '../../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {
  subscriptions: Subscription[] = [];
  @Input() addedToWishlist : boolean =false
  @Input() productItem: Product
  ViewButton:boolean=false
  constructor(private toastr: ToastrService,private route:ActivatedRoute,private router:Router ,private productservice:ProductService,private msg:MessengerService ,private cartService:CartService) {  
        this.getProduct(this.route.snapshot.paramMap.get('id'))        
        this.ViewButton=false
  }
 
  handelAddToCart(){
    const sub = this.cartService.addProductToCart(this.productItem).subscribe({ 
     complete: () => this.toastr.success("Ajouter ","+100 grammes",{ progressBar: true , timeOut: 500} ),
      error: error => this.toastr.error("-",error,{ progressBar: true }),
    } )
    this.subscriptions.push(sub);
  }
  getProduct(id) {
     const sub = this.productservice.getProductByID(id).subscribe( 
      data => { 
        console.log(data);
        this.productItem=data
      })
    //x this.subscriptions.push(sub);
  } 

  deleteProduct(id) {
      const sub =this.productservice.deleteroductByID(id).subscribe( 
        {complete: () => { this.router.navigate(['/home'])
        this.toastr.error("-","suprimmer",{ progressBar: true , timeOut: 500} )
        }
      })
      this.subscriptions.push(sub);
    } 
  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }
}
