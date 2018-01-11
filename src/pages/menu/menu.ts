import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage} from "../home/home";
import * as WC from "woocommerce-api";


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  homePage: any;
  WooCommerce: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage;

    this.WooCommerce = WC ({
      url: 'URL',
      consumerKey: 'KEY',
      consumerSecret: 'SECRET'
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
