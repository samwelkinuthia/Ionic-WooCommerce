import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { CheckoutPage } from "../checkout/checkout";
import { LoginPage } from "../login/login";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public viewController: ViewController, public toastCtrl: ToastController) {

    this.total = 0.0;

    console.log(this.cartItems.length);

    this.storage.ready().then(() => {

      this.storage.get('cart').then((data) => {

        this.cartItems = data;

        if (this.cartItems != null && this.cartItems.length > 0) {

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

      // if (user != null) {
      //
      //   if (this.cartItems == null) {
      //
      //     this.toastCtrl.create({
      //       message: 'Can\'t checkout an empty cart now can you?',
      //       showCloseButton: true
      //     }).present();
      //
      //   } else {
      //
      //     this.navCtrl.push(CheckoutPage);
      //
      //   }
      //
      // }

      if (user != null) {

        this.navCtrl.push(CheckoutPage);

      } else {

        this.navCtrl.push(LoginPage, {next: CheckoutPage});

      }
    });
  }


}
