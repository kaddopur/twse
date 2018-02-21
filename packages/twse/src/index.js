import '@babel/polyfill';
import axios from 'axios';

// no encoding for params
axios.defaults.paramsSerializer = params =>
    Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&');

export { default as getStockInfo } from './lib/getStockInfo';
export { default as getStockInfoStream } from './lib/getStockInfoStream';
