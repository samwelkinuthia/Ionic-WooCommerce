import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {WoocommerceProvider} from "../../providers/woocommerce/woocommerce";
import {ProductDetailsPage} from "../product-details/product-details";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchQuery: string = "";
  WooCommerce: any;
  products: any[] = [];
  // page: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private WP: WoocommerceProvider, public toastCtrl: ToastController) {

    this.WooCommerce = WP.init();

    console.log(this.navParams.get('searchQuery'));

    this.searchQuery = this.navParams.get('searchQuery');

    this.WooCommerce.getAsync('products?filter[q]='+ this.searchQuery).then((data) => {

      this.products = JSON.parse(data.body).products;

      console.log(this.products)

    })

  }

  showProduct(product){
    this.navCtrl.push(ProductDetailsPage, {"product": product});
  }

  // loadMoreProducts(event) {
  //
  //   this.WooCommerce.getAsync('products?filter[q]='+ this.searchQuery + '&page=' + this.page).then((data) => {
  //
  //     this.products = this.products.concat(JSON.parse(data.body).products);
  //
  //     if (JSON.parse(data.body).products.length < 10 ) {
  //
  //       event.enable(false);
  //
  //       this.toastCtrl.create({
  //         message: 'Ooooops, No more products',
  //         duration: 3000
  //       }).present();
  //
  //     }
  //
  //     event.complete();
  //     this.page ++;
  //
  //   })
  //
  // }



}
