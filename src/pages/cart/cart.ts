import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
