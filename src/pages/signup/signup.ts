import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newUser: any = {};
  towns: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.newUser.billing_address = {};
    this.newUser.shippingAddress = {};
    this.towns = ['Nairobi', 'Mombasa', 'Kisumu'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
