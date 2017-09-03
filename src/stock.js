// @flow
import axios from 'axios';
import url from 'url';

export function getMultiplePriceInfo(stockNoList: Array<string> = []) {
  return [];
}

export function getPriceInfo(stockNo: string) {
  if (typeof stockNo !== 'string') {
    throw new Error('getPriceInfo: stockNo should be a string');
  }
  return getMultiplePriceInfo([stockNo]);
}
