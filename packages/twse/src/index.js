import '@babel/polyfill';
import axios from 'axios';

// no encoding for params
axios.defaults.paramsSerializer = params =>
    Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&');

export { default as getStockInfo } from './getStockInfo';
export { default as getStockInfoStream } from './getStockInfoStream';
export { default as getStockName } from './getStockName';
