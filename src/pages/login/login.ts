import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClientModule) {
  }


}
