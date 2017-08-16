// @flow
import axios from 'axios';
import url from 'url';

export default class Stock {
  stockNo: string;
  data: {};

  constructor(stockNo: string) {
    this.stockNo = stockNo;
  }

  fetchData(date: string): Promise<any> {
    console.log('2');
    const urlObject = url.parse(
      'http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json',
      true
    );

    urlObject.query = urlObject.query || {};
    urlObject.query.stockNo = this.stockNo;

    delete urlObject.search;

    return axios(url.format(urlObject));
  }
}
