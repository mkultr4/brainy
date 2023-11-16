import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  columnize(input: Array<any>, cols: number) {
    const arr = [];
    for (let i = 0; i < input.length; i++) {
      const colIdx = i % cols;
      arr[colIdx] = arr[colIdx] || [];
      arr[colIdx].push(input[i]);
    }
    return arr;
  }

  getTimeArray(step) {


    const times = [];
    let i, j;
    for (i = 0; i < 24; i++) {
      for (j = 0; j <= step;) {

        const hour = i + ':' + (j === 0 ? '00' : j);
        times.push(moment(hour, 'HH:mm').format('HH:mm'));
        j += step;
      }
    }

    return times;

  }
  validateUrl(url) {
    return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(url);
  }
  matchYoutubeUrl(url) {
    const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const matches = url.match(p);
    if (matches) {
      return matches[1];
    }
    return false;
  }
  cleanupTemplateString(template: string): string {
    return template
      .replace(/\s?ng\-reflect\-.+=".*"/g, '') // Remove `ng-reflect-` things
      .replace(/\s?_nghost\-.+=".*"/g, '')     // Remove `_nghost-` things
      .replace(/\s?_ngcontent\-.+=".*"/g, ''); // Remove `_ngcontent-` things
  }

  getScrollParent(element: HTMLElement, includeHidden?: boolean) {
    let style = getComputedStyle(element);
    const excludeStaticParent = style.position === 'absolute';
    const overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

    if (style.position === 'fixed') {
      return document.body;
    }
    for (let parent = element; (parent = parent.parentElement);) {
      style = getComputedStyle(parent);
      if (excludeStaticParent && style.position === 'static') {
        continue;
      }
      if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
        return parent;
      }
    }

    return document.body;
  }

  scrollTo(parent: HTMLElement, elem: HTMLElement, gutterTop?: number, animate?: number) {
    if (!gutterTop) {
      gutterTop = 0;
    }
    if (!animate) {
      animate = 0;
    }
    const scrollToTop = $(parent).scrollTop() - $(parent).offset().top + $(elem).offset().top - gutterTop;
    // $(parent).scrollTop($(parent).scrollTop() - $(parent).offset().top + $(elem).offset().top - gutterTop); return false;
    $(parent).animate({ scrollTop: scrollToTop }, animate);
  }

  dateIsToday(date: Date) {

    const today = moment().format('YYYY-M-DD');


    const dateCurrent = moment(date).format('YYYY-M-DD');


    return today === dateCurrent;

  }
  dateIsYesterday(date: Date) {
    const yesterday = moment().subtract(1, 'days').format('YYYY-M-DD');
    const dateCurrent = moment(date).format('YYYY-M-DD')

    return yesterday === dateCurrent;
  }


  /**
   *
   * @hex (String) - The hex value. Can be prefixed with "#" or not. Can be
   *   long format (6 chars) or short format (3 chars)
   * @opacity (number between 0 and 1) - This is an optional float value that
   *   will be used for the opacity
   *
   * returns (Object) - an object with r, g, and b properties set as numbers
   *   along with a "css" property representing the css rule as a string
   */
  hex2rgb(hex, opacity) {
    hex = (hex + '').trim();

    let rgb = null;
    const match = hex.match(/^#?(([0-9a-zA-Z]{3}){1,3})$/);

    if (!match) { return null; }

    rgb = {};

    hex = match[1];
    // check if 6 letters are provided
    if (hex.length === 6) {
      rgb.r = parseInt(hex.substring(0, 2), 16);
      rgb.g = parseInt(hex.substring(2, 4), 16);
      rgb.b = parseInt(hex.substring(4, 6), 16);
    } else if (hex.length === 3) {
      rgb.r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16);
      rgb.g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16);
      rgb.b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16);
    }

    rgb.css = 'rgb' + (opacity ? 'a' : '') + '(';
    rgb.css += rgb.r + ',' + rgb.g + ',' + rgb.b;
    rgb.css += (opacity ? ',' + opacity : '') + ')';

    return rgb;
  }
  /**
   * get data response from http
   * @param response Response from api-wateway
   */
  httpResponse(response: any): any {
    if (200 === response.statusCode) {
      return JSON.parse(response.body);
    } else {
      console.log('Server response', response);
      return null;
    }
  }

  decodeJWToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
  }

}
