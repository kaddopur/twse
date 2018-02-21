import axios from 'axios';
import getCookie from './getCookie';

export default async (symbols = []) => {
    try {
        const url = `http://mis.twse.com.tw/stock/api/getStockInfo.jsp`;
        const response = await axios.get(url, {
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
