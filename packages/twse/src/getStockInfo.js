import axios from 'axios';
import getCookie from './getCookie';
import getOTCStocks from './getOTCStocks';
import getTSEStocks from './getTSEStocks';

const TWSE_STOCK_API = `http://mis.twse.com.tw/stock/api/getStockInfo.jsp`;

const getFullSymbol = symbol => {
    const otcStocks = getOTCStocks();
    const tseStocks = getTSEStocks();

    if (otcStocks[symbol]) {
        return `otc_${symbol}.tw`;
    }

    if (tseStocks[symbol]) {
        return `tse_${symbol}.tw`;
    }

    return '';
};

export default async (symbols = []) => {
    try {
        const response = await axios.get(TWSE_STOCK_API, {
            headers: { Cookie: await getCookie() },
            params: {
                ex_ch: symbols
                    .map(getFullSymbol)
                    .filter(symbol => !!symbol)
                    .join('|'),
                _: new Date().getTime()
            }
        });
        const { data: { msgArray: stockInfo = [] } = {} } = response;

        return stockInfo;
    } catch (e) {
        return null;
    }
};
