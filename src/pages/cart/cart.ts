import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public viewController: ViewController) {

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

        this.emptyMessage = true;

      }

      });

    });

  }

  removeFromCart(item, i) {

    console.log("works");

    let price = item.product.price;
    let quantity = item.quantity;

    this.cartItems.splice(i, 1);

    this.storage.set("cart", this.cartItems).then(() => {

      this.total = this.total - (parseInt(price) * quantity);

    });

    if (this.cartItems.length == 0)

      this.emptyMessage = true;

  }

  closeCart() {
    this.viewController.dismiss();
  }

  checkOut() {

    this.storage.get('userLogin').then(  (user) => {

      if (user != null) {
        this.navCtrl.push(CheckOutPage);
      }
    })
  }


}
