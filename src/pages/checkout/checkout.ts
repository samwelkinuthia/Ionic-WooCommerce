import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { WoocommerceProvider } from "../../providers/woocommerce/woocommerce";
import { HomePage } from "../home/home";
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private WP: WoocommerceProvider, public alertCtrl: AlertController, private payPal: PayPal) {

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

  placeOrder() {

    let orderItems: any[] = [];
    let data: any = {};

    let paymentData: any = {};

    // TO ASSOCIATE A PAYMENT METHOD WITH THE ORDER

    this.paymentMethods.forEach((element, index) => {

      if (this.paymentMethod == element.method_id) {

        paymentData = element;

        // console.log(paymentData);

      }

    });

    data = {

      payment_details: {
        method_id: paymentData.method_id,
        method_title: paymentData.method_title,
        paid: true
      },

      billing_address: this.newOrder.billing_address,
      shipping_address: this.newOrder.shipping_address,
      customer_id: this.userInfo.id || '',
      line_items: orderItems

    };

    if (paymentData.method_id == 'paypal') {

      //NEXT UP

    } else {

      this.storage.get('cart').then((cart) => {

        cart.forEach((element, index) => {


          orderItems.push({

            product_id: element.product.id,
            quantity: element.quantity

          });

        });

        data.line_items = orderItems;

        let completeOrder: any = {};

        completeOrder.order = data;

        this.WooCommerce.postAsync("orders", completeOrder).then((data) => {

          console.log(JSON.parse(data.body).order);

          let res = JSON.parse(data.body).order;

          this.alertCtrl.create({
            title: "Order created successfully",
            message: "your order number is: " + res.order_number,
            buttons: [{
              text: "OK",
              handler: () => {
                this.navCtrl.setRoot(HomePage);
              }
            }]
          }).present();

        });


      });

    }



  }

}
