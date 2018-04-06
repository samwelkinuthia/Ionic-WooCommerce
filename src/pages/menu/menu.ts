import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage} from "../home/home";
import { ProductsByCategoryPage } from "../products-by-category/products-by-category";
import { SignupPage } from "../signup/signup";
import { LoginPage } from "../login/login";
import { Storage } from "@ionic/storage";
import { CartPage } from "../cart/cart";
import { WoocommerceProvider } from "../../providers/woocommerce/woocommerce";

@IonicPage({})

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  homePage: any;
  WooCommerce: any;
  categories:any[];
  loggedIn: boolean;
  user: any;

  @ViewChild('content') childCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController, private WP: WoocommerceProvider) {

    this.homePage = HomePage;

    this.categories = [];

    this.user = {};

    this.WooCommerce = WP.init();

    this.WooCommerce.getAsync("products/categories").then((data) => {

      // console.log(JSON.parse(data.body).product_categories);
      let temp:any[] = JSON.parse(data.body).product_categories;

      for (let i = 0; i < temp.length; i++){

        console.log(temp[i].slug);

        console.log(temp[i]);

        if (temp[i].count > 0) {


          if(temp[i].parent == 0){

            // ICON CATEGORIES

            if (temp[i].slug == "accessories"){
              temp[i].icon = "bowtie";
            }

            if (temp[i].slug == "clothing"){
              temp[i].icon = "shirt";
            }

            if (temp[i].slug == "tshirts"){
              temp[i].icon = "shirt";
            }

            if (temp[i].slug == "music"){
              temp[i].icon = "music-note";
            }

            if (temp[i].slug == "hoodies"){
              temp[i].icon = "shirt-outline";
            }

            if (temp[i].slug == "albums"){
              temp[i].icon = "music-note";
            }

            if (temp[i].slug == "posters"){
              temp[i].icon = "images";
            }

            if (temp[i].slug == "singles"){
              temp[i].icon = "mic-c";
            }

            this.categories.push(temp[i])
          }

        }


      }

      console.log(this.categories);

    });

  }

  ionViewDidEnter() {

    this.storage.ready().then(() => {

      this.storage.get('userLogin').then((userLogin) => {

        if (userLogin != null) {

          // console.log("HOORAY");
          this.user = userLogin.user;

          // console.log(this.user);

          this.loggedIn = true;
          console.log(this.loggedIn);

        }

      });

    });

  }



  openCategory(category) {

    this.childCtrl.setRoot(ProductsByCategoryPage, {"category": category});

  }

  //for navigations

  openPage(pageName: string) {

    if (pageName == "signup") {

      this.navCtrl.push(SignupPage);

    }

    if (pageName == "login") {

      this.navCtrl.push(LoginPage)

    }

    if (pageName == "logout") {

      this.storage.remove('userLogin').then(() => {

        this.user = {};

        this.loggedIn = false;
        console.log(this.loggedIn);

      });

    }

    if (pageName == "cart") {

      let modal = this.modalCtrl.create(CartPage);

      modal.present();

    }

  }


}
