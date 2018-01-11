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
  categories:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage;
    this.categories = [];

    this.WooCommerce = WC ({
      url: 'URL',
      consumerKey: 'KEY',
      consumerSecret: 'SECRET'
    });

    this.WooCommerce.getAsync("products/categories").then((data) => {
      // console.log(JSON.parse(data.body).product_categories);
      let temp:any[] = JSON.parse(data.body).product_categories;

      for (let i = 0; i < temp.length(); i++){
        if(temp[i].parent == 0){

        }
      }

    }, (err) => {
      console.log(err);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
