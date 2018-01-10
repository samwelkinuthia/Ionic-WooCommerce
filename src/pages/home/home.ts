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
  page: number;
  moreProducts: any[];

  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController){
    this.page = 2;
    this.WooCommerce = WC ({
      url: 'URL',
      consumerKey: 'KEY',
      consumerSecret: 'SECRET'
    });

    this.loadMoreProducts(null);

    this.WooCommerce.getAsync('products').then( (data) => {
     console.log(JSON.parse(data.body));
     this.products = JSON.parse(data.body).products;
     // console.log(this.products);
    }, (err) => {
      console.log(err)
    });
  }

  ionViewDidLoad(){
    setInterval(() =>{
      if (this.productSlides.getActiveIndex() == this.productSlides.length() - 1)
        this.productSlides.slideTo(0);
        // console.log(this.productSlides.getActiveIndex() - 1);
      this.productSlides.slideNext();
    }, 3000);
  }

  loadMoreProducts($event){
    if (event == null)
      this.page = 2;
      this.moreProducts = [];
    else
      this.page ++;


    this.WooCommerce.getAsync('products?page=' + this.page).then( (data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = JSON.parse(data.body).products;
      // console.log(this.products);
    }, (err) => {
      console.log(err)
    });
  }
}
