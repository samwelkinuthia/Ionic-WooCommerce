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
        data.push({
          'product': product,
          'amount': parseFloat(product.price),
          'quantity': 1
        });
      } else {
        let added = 0;
        for (let i = 0; i < data.length; i++) {
          if (product.id == data[i].product.id) {
            console.log("Product already added");
            let quantity = data[i].quantity;
            data[i].quantity = quantity + 1;
            added = 1;
          }
        }

        if (added = 0) {

        }
      }
    }, (err) => {
      console.log(err);
    })
  }
}
