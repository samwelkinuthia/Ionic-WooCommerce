import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import * as WC from "woocommerce-api";

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  newOrder: any;
  paymentMethods: any[];
  paymentMethod: any;
  similar: boolean;
  WooCommerce: any;
  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.newOrder = {};
    this.newOrder.billing_address = {};
    this.newOrder.shippingAddress = {};
    this.similar = false;

    this.paymentMethods = [
      {method_id: 'bacs', method_title: 'Direct Bank Transfer'},
      {method_id: 'cheque', method_title: 'Cheque'},
      {method_id: 'cod', method_title: 'Cash On Delivery'},
      {method_id: 'paypal', method_title: 'Paypal'}
    ];

    this.WooCommerce = WC ({
      url: 'URL',
      consumerKey: 'KEY',
      consumerSecret: 'SECRET'
    });

    this.storage.ready().then(() => {

      this.storage.get('userLogin').then((userLogin) => {

        this.userInfo = userLogin.user;

        console.log(this.userInfo);

        let email = this.userInfo.email;

        this.WooCommerce.getAsync('customers/email' + email).then((data) => {

          this.newOrder = data.customer;

        })

      });
    });

  }

  setSimilar() {

    this.similar = !this.similar;

    if (this.similar) {

      this.newOrder.billing_address = this.newOrder.shippingAddress

    }
  }

}
