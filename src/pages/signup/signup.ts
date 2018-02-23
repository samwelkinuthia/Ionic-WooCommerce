import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from "woocommerce-api";



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newUser: any = {};
  similar: boolean;
  WooCommerce: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

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
  }

  // check email: if valid ? if already exists

  checkEmail() {
    // console.log("works");
    let validEmail = false;

    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (reg.test(this.newUser.email)) {
      // console.log("VALID")

      this.WooCommerce.getAsync('customers/email/' + this.newUser.email).then((data) => {
        console.log(JSON.parse(data.body));
      });

    }
  }

}
