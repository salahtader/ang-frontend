import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { productUrl } from '../config/api';

import { map,tap, catchError, shareReplay, refCount, publishReplay, first, distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class ProductService {
list$:Observable<any> 
  constructor(private http: HttpClient) { 
    this.list$=this.getProducts$()
  }
  getProducts(){
    return this.list$
   }

  getProducts$(){
    return this.http.get<any[]>(productUrl).pipe(
       map((data: any) => {
        // console.log( data.count);
        // console.log(data.request.type);
        // console.log(data.request.url);
        
        
        return data.products
        
      },  shareReplay(1)
      )
    );
  }

  getProductByID(productId): Observable<any> {
    
    return this.http.get<any>(productUrl+'/'+productId)
    }

  deleteroductByID(productId): Observable<any> {
    return this.http.delete<any>(productUrl+'/'+productId)
  }
  /*getOneProductByID(productId): Observable<any> {
    return this.http.get<Product[]>(productUrl).pipe(

      map((result : Product[]) => {
        let product :Product ;
        for (let item of result) {
          //console.log(item.id);
          
          if (item.id == productId) {
            //console.log(item.name);          
            product = item 
            break;
          }
        }
        //console.log(product);
        return product
      })

    )
  }*/

  //return this.http.post<any>(url,id)
}



