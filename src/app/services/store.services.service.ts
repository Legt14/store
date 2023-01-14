import { Injectable } from '@angular/core';
import { Products } from '../models';
import {BehaviorSubject} from 'rxjs'


@Injectable({
  providedIn: 'root',
})
export class StoreServiceService {
  private shoppingCart: Products[] = [];
  private cart = new BehaviorSubject<Products[]>([]);

  cart$ = this.cart.asObservable();

  constructor() {

  }
  addToShoppingCart(product: Products){
    this.shoppingCart.push(product);
    this.cart.next(this.shoppingCart);
  }

  getShoppingCart(){
    return this.shoppingCart
  }

  getTotal(){
    return this.shoppingCart.reduce((sum, item)=> sum + item.price, 0);
  }

}

