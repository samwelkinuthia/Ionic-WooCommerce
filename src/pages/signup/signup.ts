import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newUser: any = {};
  similar: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.newUser.billing_address = {};
    this.newUser.shippingAddress = {};
    this.similar = false;
  }

  // SET VISIBILITY FOR SHIPPING DETAILS OR NOT
  setSimilar() {
    this.similar = !this.similar;
  }

  // Collect filled data and sign up user
   signUp() {
    console.log("Im working");
  }

}
