import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public storage: Storage, public toastCtrl: ToastController) {

    this.username = '';
    this.password = '';

  }

  login() {

    this.http.get('http://www.creative-junk.com/storedemo/api/auth/generate_auth_cookie/?insecure=cool&username=' + this.username + '&password=' + this.password).subscribe((response) => {

      if (response['error']) {

        let res = response['error'];

        this.toastCtrl.create({
          message: res,
          showCloseButton: true
        }).present();
      }

    })
  }


}
