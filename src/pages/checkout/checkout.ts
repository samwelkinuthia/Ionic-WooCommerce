import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  newOrder: any;
  paymentMethods: any;
  paymentMethos: any;
  similar: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.newOrder = {};
    this.newOrder.billing_address = {};
    this.newOrder.shippingAddress = {};
    this.similar = false;

    this.paymentMethos = [
      {method_id: 'bacs', method_title: 'Direct Bank Transfer'},
      {method_id: 'cheque', method_title: 'Cheque'},
      {method_id: 'cod', method_title: 'Cash On Delivery'},
      {method_id: 'paypal', method_title: 'Paypal'}
    ];

  }

  setSimilar() {

    this.similar = !this.similar;

    if (this.similar) {

      this.newOrder.billing_address = this.newOrder.shippingAddress

    }
  }

}
