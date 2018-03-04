import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage} from "../home/home";
import * as WC from "woocommerce-api";
import { ProductsByCategoryPage } from "../products-by-category/products-by-category";
import { SignupPage } from "../signup/signup";
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  homePage: any;
  WooCommerce: any;
  categories:any[];
  @ViewChild('content') childCtrl: NavController;

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

      for (let i = 0; i < temp.length; i++){

        if(temp[i].parent == 0){
          // USING A SINGLE ICON FOR ALL CATEGORIES...COZ OF TIME AND STUFF REASONS :D
          temp[i].icon = "arrow-dropright-circle";
          // REPEAT MANY TIMES FOR ALL  CATEGORIES
          // if (temp[i].slug == "clothing"){
          //   temp[i].icon = "shirt";
          // }

          this.categories.push(temp[i])
        }

      }

      console.log(this.categories);

    }, (err) => {
      console.log(err);
    })

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

  }


}
