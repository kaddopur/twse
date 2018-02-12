import '@babel/polyfill';
import axios from 'axios';
import querystring from 'querystring';

const getStockCookie = async () => {
    try {
        const { headers = {} } = await axios('http://mis.twse.com.tw/stock/');
        const REGEX_COOKIE = /(JSESSIONID=[^;]*)/;
        const [cookie] = (headers['set-cookie'] || [])
            .find(header => REGEX_COOKIE.test(header))
            .match(REGEX_COOKIE);
        return cookie;
    } catch (e) {
        return null;
    }
};

export const getStockInfo = async symbol => {
    if (!symbol) {
        return null;
    }

    try {
        const query = querystring.stringify({
            ex_ch: `tse_${symbol}.tw`,
            _: new Date().getTime()
        });
        const url =
            `http://mis.twse.com.tw/stock/api/getStockInfo.jsp?` + query;
        const cookie = await getStockCookie();
        const {
            data: { msgArray: [stockInfo = null] = [] } = {}
        } = await axios(url, { headers: { Cookie: cookie } });

        return stockInfo;
    } catch (e) {
        return null;
    }
};
