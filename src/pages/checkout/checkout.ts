import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController, Toast} from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { WoocommerceProvider } from "../../providers/woocommerce/woocommerce";
import { HomePage } from "../home/home";
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { MenuPage } from "../menu/menu";

@IonicPage({})
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private WP: WoocommerceProvider, public alertCtrl: AlertController, public payPal: PayPal, public toastCtrl: ToastController) {

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

    if (paymentData.method_id != null) {

      if (paymentData.method_id == 'paypal') {

        //NEXT UP

        this.payPal.init({

          PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
          PayPalEnvironmentSandbox: 'YOUR_SANDBOX_CLIENT_ID'

        }).then(() => {

          // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
          this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
            // Only needed if you get an "Internal Service Error" after PayPal login!
            //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal

          })).then(() => {

            this.storage.get('cart').then((cart)=> {

              let total = 0.0;

              cart.forEach((element, index) => {

                orderItems.push({product_id: element.product.id, quantity: element.quantity});
                total = total + (element.product_id.price * element.quantity);

              });

              let payment = new PayPalPayment(total.toString(), 'KSH', 'Description', 'sale');

              this.payPal.renderSinglePaymentUI(payment).then((response) => {

                alert(JSON.stringify(response));

                data.line_items = orderItems;
                let orderData: any = {};
                orderData.order = data;

                this.WooCommerce.postAsync('orders', orderData, (err, data, res) => {

                  alert("Order paid successfully");


                  let result = JSON.parse(data.body).order;

                  this.alertCtrl.create({
                    title: "Order created successfully",
                    message: "your order number is: " + result.order_number,
                    buttons: [{
                      text: "OK",
                      handler: () => {
                        this.navCtrl.setRoot(HomePage);
                      }
                    }]
                  }).present();

                });

              });

            }, () => {
              // Error or render dialog closed without being successful
            });
          }, () => {
            // Error in configuration
          });
        }, () => {
          // Error in initialization, maybe PayPal isn't supported or something else
        });


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

            this.storage.remove('cart').then(() => {

              console.log("cart cleared")

              this.alertCtrl.create({
                title: "Your Order has been placed successfully",
                message: "your order number is: " + res.order_number + ". Check your email for more details. Thank you!",
                buttons: [{
                  text: "OK",
                  handler: () => {

                    // this.navCtrl.popToRoot();

                    this.navCtrl.setRoot(MenuPage);

                    // if (this.navParams.get('prev')) {
                    //
                    //   this.navCtrl.push(this.navParams.get('prev'));
                    //
                    // } else {
                    //
                    //   this.navCtrl.pop();
                    //
                    // }
                  }
                }]
              }).present();

            });


          });


        });

      }


    } else {

      this.toastCtrl.create({
        message: 'No Payment method selected',
        showCloseButton: true
      }).present();

    }



  }

}
