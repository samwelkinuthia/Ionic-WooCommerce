import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})

export class ProductDetailsPage {
  product: any;
  reviews: any[] = [];
  WooCommerce: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.product = this.navParams.get("product");
    console.log(this.product);

    this.WooCommerce = WC ({
      url: 'URL',
      consumerKey: 'KEY',
      consumerSecret: 'SECRET'
    });

    this.WooCommerce.getAsync('products/' + this.product.id + '/reviews').then((data) => {
      // console.log(JSON.parse(data.body))
      this.reviews = JSON.parse(data.body).product_reviews;
      console.log(this.reviews);
    }, (err) => {
      console.log(err)
    });
  }

  addToCart(product) {
    this.storage.get('cart').then((data) => {
      if (data == null || data.length == 0 ) {
        data = [];
      }
    }, (err) => {
      console.log(err);
    })
  }
}
