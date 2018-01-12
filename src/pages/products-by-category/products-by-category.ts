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
    this.category = this.navParams.get("category");
    this.WooCommerce = WC ({
      url: 'URL',
      consumerKey: 'KEY',
      consumerSecret: 'SECRET'
    });

    this.WooCommerce.getAsync("products?filter[category]=").then((data) => {

    }, (err) => {
      console.log(err);
    });
  }

  //
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ProductsByCategoryPage');
  // }

}