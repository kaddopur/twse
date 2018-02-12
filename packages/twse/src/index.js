import '@babel/polyfill';
import axios from 'axios';

// no encoding for params
axios.defaults.paramsSerializer = params =>
    Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&');

const getStockCookie = async () => {
    try {
        const { headers = {} } = await axios('http://mis.twse.com.tw/stock');
        const REGEX_COOKIE = /(JSESSIONID=[^;]*)/;
        const [cookie] = (headers['set-cookie'] || [])
            .find(header => REGEX_COOKIE.test(header))
            .match(REGEX_COOKIE);
        return cookie;
    } catch (e) {
        return null;
    }
};

export const getStockInfo = async (symbols = []) => {
    try {
        const url = `http://mis.twse.com.tw/stock/api/getStockInfo.jsp`;
        const response = await axios.get(url, {
            headers: { Cookie: await getStockCookie() },
            params: {
                ex_ch: symbols.map(symbol => `tse_${symbol}.tw`).join('|'),
                _: new Date().getTime()
            }
        });
        const { data: { msgArray: stockInfo = [] } = {} } = response;

        return stockInfo;
    } catch (e) {
        return null;
    }
};
