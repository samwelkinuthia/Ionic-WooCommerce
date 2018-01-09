import { Component, ViewChild} from "@angular/core";
import { NavController, Slides } from "ionic-angular";
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  WooCommerce:any;
  products: any[];

  constructor(public navCtrl: NavController){
    this.WooCommerce = WC ({
      url: 'STORE_URL',
      consumerKey: 'KEY',
      consumerSecret: 'SECRET'
    });

    this.WooCommerce.getAsync('products').then( (data) => {
     // console.log(JSON.parse(data.body));
     this.products = JSON.parse(data.body).products;
     console.log(this.products);
    }, (err) => {
      console.log(err)
    });
  }
}
