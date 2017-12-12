import * as libphonenumber from 'google-libphonenumber';
import {isString} from 'lodash';
import numeral from 'numeral';
import PhoneNumber = libphonenumber.PhoneNumber;

export class NumberUtils {
  // Phone number
  static formatPhone(phoneNumber: string, countryCode: string = 'US'): string {
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

    try {
      const parsedNumber: PhoneNumber = phoneUtil.parse(phoneNumber, countryCode);
      return phoneUtil.format(parsedNumber, libphonenumber.PhoneNumberFormat.E164);
    } catch(e) {
      return '';
    }
  }

  static getCurrencyFormat(amount: number, currency: string = 'USD', format: string = '0,0.00'): string {
    let prefix: string;
    currency = currency.toUpperCase();

    switch(currency) {
      case 'GBP':
        prefix = '£';
        break;
      default:
        prefix = '$';
    }

    return `${prefix}${numeral(amount).format(format)}`;
  }

  static getMeters(miles: number, decimals: number = 1): number {
    return +((miles * 1609.344).toFixed(decimals));
  }

  static getMiles(meters: number, decimals: number = 1): number {
    return +((meters * 0.000621371192).toFixed(decimals));
  }

  static pad(num: number, size: number): string {
    let s = num + '';

    while(s.length < size) {
      s = '0' + s;
    }

    return s;
  }

  static parseNum(num, max?: number): number {
    if(isString(num)) {
      if(max) {
        num = num.replace(/\D/g, '').substr(0, max);
      } else {
        num = num.replace(/\D/g, '');
      }
    } else if(max) {
      num = +(num.toString().substr(0, max));
    }

    num = parseFloat(num);

    return isNaN(num) ? null : num;
  }

  static roundToHalf(value): number {
    const converted: number = parseFloat(value);
    const decimal = Math.ceil((converted - parseInt(converted.toString(), 10)) * 10);

    if(decimal > 5) {
      return Math.ceil(converted);
    } else {
      return parseInt(converted.toString(), 10) + 0.5;
    }
  }
}
