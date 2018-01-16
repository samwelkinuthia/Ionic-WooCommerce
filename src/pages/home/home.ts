import { Component, ViewChild} from "@angular/core";
import { NavController, Slides, ToastController } from "ionic-angular";
import * as WC from 'woocommerce-api';
import { ProductDetailsPage } from "../product-details/product-details";

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

  constructor(public navCtrl: NavController, public toastCtrl: ToastController){
    this.page = 2;

    this.WooCommerce = WC ({
      url: 'URL',
      consumerKey: 'KEY',
      consumerSecret: 'SEC'
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
        // console.log(this.productSlides.getActiveIndex());
      this.productSlides.slideNext();
    }, 3000);
  }


  loadMoreProducts(event){
    console.log(event);
    if(event == null)
    {
      this.page = 2;
      this.moreProducts = [];
    }
    else
      this.page++;

    this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
      // console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);
      // console.log(this.moreProducts.length);

      if(event != null)
      {
        event.complete();
      }

      if(JSON.parse(data.body).products.length < 10){
        event.enable(false);

        this.toastCtrl.create({
          message: 'Whoopsie, No more products',
          duration: 3000
        }).present();

      }
    }, (err) => {
      console.log(err)
    });
  }

  showProduct(product){
    this.navCtrl.push(ProductDetailsPage)
  }
}
