import axios from 'axios';

const TWSE_STOCK_PAGE = 'http://mis.twse.com.tw/stock';
const REGEX_COOKIE = /(JSESSIONID=[^;]*)/;

export default async () => {
    try {
        const { headers } = await axios(TWSE_STOCK_PAGE);
        const [cookie] = (headers['set-cookie'] || [])
            .find(header => REGEX_COOKIE.test(header))
            .match(REGEX_COOKIE);

        return cookie;
    } catch (e) {
        return null;
    }
};
