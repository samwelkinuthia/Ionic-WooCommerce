import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import { WoocommerceProvider } from "../../providers/woocommerce/woocommerce";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private WP: WoocommerceProvider) {

    this.newOrder = {};
    this.newOrder.billing_address = {};
    this.newOrder.shipping_address = {};
    this.similar = false;

    this.paymentMethods = [
      {method_id: 'bacs', method_title: 'Direct Bank Transfer'},
      {method_id: 'cheque', method_title: 'Cheque'},
      {method_id: 'cod', method_title: 'Cash On Delivery'},
      {method_id: 'paypal', method_title: 'Paypal'}
    ];

    this.WooCommerce = WP.init();

    this.storage.get('userLogin').then((userLogin) => {

      this.userInfo = userLogin.user;

      let email = userLogin.user.email;

      this.WooCommerce.getAsync('customers/email/' + email).then((data) => {

        // console.log(JSON.parse(data.body).customer);

        this.newOrder = JSON.parse(data.body).customer;

      });

    });

  }

  setSimilar() {

    this.similar = !this.similar;

    if (this.similar) {

      this.newOrder.billing_address = this.newOrder.shipping_address

    }
  }

}
