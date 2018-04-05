import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductsByCategoryPage } from "../pages/products-by-category/products-by-category";
import { ProductDetailsPage } from "../pages/product-details/product-details";
import { IonicStorageModule } from "@ionic/storage";
import { CartPage } from "../pages/cart/cart";
import { SignupPage } from "../pages/signup/signup";
import { LoginPage } from "../pages/login/login";
import { CheckoutPage } from "../pages/checkout/checkout";
import { HttpClientModule } from "@angular/common/http";
import { WoocommerceProvider } from '../providers/woocommerce/woocommerce';
import { SearchPage} from "../pages/search/search";
import { PayPal } from "@ionic-native/paypal";
import { OneSignal } from "@ionic-native/onesignal";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductsByCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage,
    LoginPage,
    CheckoutPage,
    SearchPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductsByCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage,
    LoginPage,
    CheckoutPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WoocommerceProvider,
    PayPal,
    OneSignal
  ]
})
export class AppModule {}
