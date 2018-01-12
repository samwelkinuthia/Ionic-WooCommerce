import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from "woocommerce-api";
@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  //
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ProductsByCategoryPage');
  // }

}
