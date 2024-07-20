/**
 * Este servicio se utiliza para manipular la información del carrito
 * El objetivo es dar una persistencia al carrito en la sesión
 */

import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //private cartItems: any[] = [];
  private cartItems: any[] = [
    {
        "period": "2023/1",
        "expiration": "1519211809934",
        "nominal": 950,
        "recharge": 50,
        "discount": 50,
        "penalty": 50,
        "total": 1000
    },
    {
        "period": "2023/1",
        "expiration": "1519211809934",
        "nominal": 950,
        "recharge": 50,
        "discount": 50,
        "penalty": 50,
        "total": 1000
    },
    {
        "period": "2023/1",
        "expiration": "1519211809934",
        "nominal": 950,
        "recharge": 50,
        "discount": 50,
        "penalty": 50,
        "total": 1000
    }
];
  constructor() { }


  getCart(): Observable<any> {
    return of(this.cartItems);
  }

  addToCart(item: { [key: string]: any }) {
    this.cartItems.push(item);
  }

  addMultipleToCart(items: { [key: string]: any }[]) {
    items.forEach(item => {
      // Verificar si el id ya existe en el carrito
      const existingItemIndex = this.cartItems.findIndex(cartItem => cartItem.id === item['id']);

      // Si el id no existe, agregar el elemento al carrito
      if (existingItemIndex === -1) {
        this.cartItems.push(item);
      }
    });
  }

  removeFromCart(index: number) {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
    }
  }

  clearCart() {
    this.cartItems = [];
  }
}


// Versión en Observable

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private cartItemsSubject: BehaviorSubject<{ [key: string]: any }[]> = new BehaviorSubject([]);
//   cartItems$: Observable<{ [key: string]: any }[]> = this.cartItemsSubject.asObservable();

//   constructor() { }

//   getCart() {
//     return this.cartItemsSubject.value;
//   }

//   addToCart(item: { [key: string]: any }) {
//     const currentCartItems = this.cartItemsSubject.value;
//     currentCartItems.push(item);
//     this.cartItemsSubject.next(currentCartItems);
//   }

//   removeFromCart(index: number) {
//     const currentCartItems = this.cartItemsSubject.value;
//     if (index >= 0 && index < currentCartItems.length) {
//       currentCartItems.splice(index, 1);
//       this.cartItemsSubject.next(currentCartItems);
//     }
//   }

//   clearCart() {
//     this.cartItemsSubject.next([]);
//   }
// }
