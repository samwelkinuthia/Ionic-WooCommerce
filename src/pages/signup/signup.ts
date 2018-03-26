import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import * as WC from "woocommerce-api";
import {LoginPage} from "../login/login";



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newUser: any = {};
  similar: boolean;
  WooCommerce: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController) {

    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};
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

  // Collect filled data and sign up user

  signUp() {
    // console.log("Im working");

    //for storing customer data
    let customerData = {
      customer : {}
    };

    //fetch customer details
    customerData.customer = {
      "first_name": this.newUser.first_name,
      "last_name": this.newUser.last_name,
      "phone_number": this.newUser.phone_number,
      "email": this.newUser.email,
      "password": this.newUser.password,
      "password_confirm": this.newUser.password_confirm,
      "billing_address" : {
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "company": "",
        "address_1": this.newUser.billing_address.address_1,
        "city": this.newUser.billing_address.city,
        "postcode": this.newUser.billing_address.postcode,
        "country": 'kenya',
        "email": this.newUser.email,
        "phone": this.newUser.billing_address.phone
      },
      "shipping_address": {
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "company": "",
        "address_1": this.newUser.shipping_address.address_1,
        "city": this.newUser.shipping_address.city,
        "postcode": this.newUser.shipping_address.postcode,
        "country": 'kenya'
      }
    };

    // set billing address equal to shipping address
    if (this.similar) {
      this.newUser.billing_address = this.newUser.shipping_address;
    }

    //post to woocommerce
    this.WooCommerce.postAsync('customers', customerData).then((data) => {

      let response = JSON.parse(data.body);

      console.log(response);

      if (response.customer) {

       this.alertCtrl.create({
          title: 'successfully registered',
          subTitle: 'proceed to login',
          buttons: [{
            text: 'Login',
            handler: () => {
              this.navCtrl.push(LoginPage)
             }
          }]
       }).present();

      }

    });

  }

}
