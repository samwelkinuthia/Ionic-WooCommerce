import { Component} from "@angular/core";
import { NavController } from "ionic-angular";
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
      url: 'YOUR_STORE_URL',
      consumerKey: 'CONSUMER_KEY',
      consumerSecret: 'YOUR_CONSUMER_SECRET'
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
