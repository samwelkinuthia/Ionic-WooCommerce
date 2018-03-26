import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {ProductDetailsPage} from "../product-details/product-details";
import { WoocommerceProvider } from "../../providers/woocommerce/woocommerce";

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})

export class ProductsByCategoryPage {
  WooCommerce: any;
  category:any;
  products: any[];
  page: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private WP: WoocommerceProvider) {

    this.page = 1;

    this.category = this.navParams.get("category");

    this.WooCommerce = WP.init();

    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then((data) => {

      console.log(data);

      this.products = JSON.parse(data.body).products;

    }, (err) => {
      console.log(err);
    });
  }

  loadMoreProducts(event){

    this.page++;

    console.log("loading page.. " + this.page);

    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then((data) => {

      let temp = JSON.parse((data.body).products);

      this.products = this.products.concat(JSON.parse(data.body).products);

      console.log(this.products);

      event.complete();

      if (temp.length < 10)

        event.enable(false);

      this.toastCtrl.create({
        message: "No more products in " + this.category + " category.",
        duration: 2000
      }).present();

    }, (err) => {

      console.log(err);

    })
  }


  showProduct(product){
    this.navCtrl.push(ProductDetailsPage, {"product": product});
  }
}
