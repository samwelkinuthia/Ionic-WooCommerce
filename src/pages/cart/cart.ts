import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartItems: any[] = [];
  total: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.storage.ready().then(() => {
      this.storage.get('cart').then((data) => {
        this.cartItems = data;
        console.log(this.cartItems);

        // for (let i = 0; i < this.cartItems.length; i++) {
        //   console.log(this.cartItems[i]);
        // }
      });
    });
  }
}
