import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import * as WC from "woocommerce-api";



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newUser: any = {};
  similar: boolean;
  WooCommerce: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {

    this.newUser.billing_address = {};
    this.newUser.shippingAddress = {};
    this.similar = false;

    this.WooCommerce = WC ({
      url: 'URL',
      consumerKey: 'KEY',
      consumerSecret: 'SECRET'
    });

  }

  // SET VISIBILITY FOR SHIPPING DETAILS OR NOT
  setSimilar() {
    this.similar = !this.similar;
  }

  // Collect filled data and sign up user
  signUp() {
    console.log("Im working");

    let customerData = {
      customer : {}
    };

    customerData.customer = {
      "first_name": this.newUser.first_name,
      "last_name": this.newUser.last_name,
      "phone_number": this.newUser.phone_number,
      "email": this.newUser.email,
      "passowrd": this.newUser.password,
      "password_confirm": this.newUser.password_confirm,
      "billing_address" : {
        "address": this.newUser.billing_address.address,
        "town": this.newUser.billing_address.town,
        "estate": this.newUser.billing_address.estate
      },
      "shippingAddress": {
        "address": this.newUser.shippingAddress.address,
        "town": this.newUser.shippingAddress.town
      }
    }
  }

  // check email: if valid ? if already exists

  checkEmail() {
    // console.log("works");
    let validEmail = false;

    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (reg.test(this.newUser.email)) {
      // console.log("VALID")

      this.WooCommerce.getAsync('customers/email/' + this.newUser.email).then((data) => {
        // console.log(JSON.parse(data.body));
        let res = JSON.parse(data.body);

        if (res.errors) {

          validEmail = true;

          this.toastCtrl.create({
            message: 'New User Detected. Proceed :)',
            duration: 3000
          }).present();

        } else {

          validEmail = false;

          this.toastCtrl.create({
            message: 'Email already Registered',
            showCloseButton: true
          }).present();

        }

        console.log(validEmail);

      });

    } else {

      validEmail = false;

      console.log(validEmail);

      this.toastCtrl.create({
        message: 'Invalid email',
        showCloseButton: true
      }).present();

    }
  }

}
