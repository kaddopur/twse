import axios from 'axios';
import getCookie from './getCookie';

const TWSE_STOCK_API = `http://mis.twse.com.tw/stock/api/getStockInfo.jsp`;

export default async (symbols = []) => {
    try {
        const response = await axios.get(TWSE_STOCK_API, {
            headers: { Cookie: await getCookie() },
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
