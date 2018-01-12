import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from "woocommerce-api";
@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {
  WooCommerce: any;
  category:any;
  products: any[];
  page: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.page = 1;
    this.WooCommerce = WC ({
      url: 'URL',
      consumerKey: 'KEY',
      consumerSecret: 'SECRET'
    });
  }

  //
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ProductsByCategoryPage');
  // }

}
