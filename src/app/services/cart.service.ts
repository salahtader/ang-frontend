import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Observable } from 'rxjs/Observable';
import { map, catchError, retry, tap, share, shareReplay } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';


import { HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';

import { cartUrl, addTocart } from '../config/api';
import { productUrl } from '../config/api';
import { Product } from '../models/product';
import { MessengerService } from './messenger.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CartService {
  // store data from backend inside service
  private _datas$: BehaviorSubject<any> = new BehaviorSubject(null);
  public datas$: Observable<any> = this._datas$.asObservable();

  currentCount: number;
  subscription;
  constructor(private http: HttpClient, private msg: MessengerService) { }

  getCount() {
    this.subscription = this.msg.getCount().subscribe(
      res => {
        this.currentCount = res.value;

      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  async getOtders() {
    const response = await this.http.get(cartUrl).toPromise();
    this._datas$.next(response);
  }


  getCartItem(): Observable<CartItem[]> {

    return this.http.get<CartItem[]>(cartUrl).pipe(
      map((data: any) => {
        // console.log( data.count);
        // console.log(data.request.type);
        // console.log(data.request.url);NON exploité
        return data.orders

      }
      ), shareReplay(1, 0)
    );
  }


  addProductToCart(product: Product): Observable<any> {
    //this.msg.sendMsg(product)
    this.getCount();
    this.msg.setCount(this.currentCount, 1);
    return this.http.post(cartUrl, { product })  // return like this {id :1 , product:{}}
      .pipe( //envoyé une seule fois
        share()
      )
  }

  removeOrder(product, cartId: number,qty:number): Observable<any> {
    this.msg.setCount(this.currentCount, -qty);

    return this.http.delete(cartUrl + '/' + cartId)

  }
  removeOrderALL(): Observable<any> {
    const userId = "5f49d46e79cbc83c38c5935a"
    this.resetCount();
   

    return this.http.delete(cartUrl + '/all/' + userId)

  }
  resetCount() {
    this.msg.resetCount();
  }

}
