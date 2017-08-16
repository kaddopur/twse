// @flow
import axios from 'axios';

export default class Stock {
  stockId: string;
  data: {};

  constructor(stockId: string) {
    this.stockId = stockId;
  }

  fetchData() {
    return new Promise((resolve, reject) => {
      axios(
        'http://mis.twse.com.tw/stock/api/getStock.jsp?ch=1101.tw&json=1&_=1501258882292'
      ).then(result => {
        this.data = result.data;
        resolve(result.data);
      });
    });
  }
}
