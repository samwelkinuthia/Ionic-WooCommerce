import { Injectable } from '@angular/core';

declare var process: any;

@Injectable()
export class AppConfig {
  public woocommerce_key: string;
  public woocommerce_secret: string;
  constructor() {
    this.woocommerce_key = this._readString('WOOCOMMERCE_KEY');
    this.woocommerce_secret = this._readString('WOOCOMMERCE_SECRET');
    console.debug('AppConfig', this);
  }
  private _readString(key: string, defaultValue?: string): string {
    const v = process.env[key];
    return v === undefined ? defaultValue : String(v);
  }
}
