import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  // selected cart items
  cartItems: any[] = [];

  // total cost of the items
  total: any;

  emptyMessage: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.total = 0.0;

    this.storage.ready().then(() => {

      this.storage.get('cart').then((data) => {

        this.cartItems = data;

        if (this.cartItems.length > 0) {

          this.cartItems.forEach((item, index) => {

            console.log(item.product);

            console.log(item.quantity * parseInt(item.product.price));

            this.total = this.total + (item.quantity * parseInt(item.product.price));

          });

          console.log(this.total);


      } else {

        let emptyMessage = true;

      }

      });

    });

  }
}
