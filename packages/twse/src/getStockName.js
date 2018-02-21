import getOTCStocks from './getOTCStocks';
import getTSEStocks from './getTSEStocks';

export default symbol => {
    const otcStocks = getOTCStocks();
    const tseStocks = getTSEStocks();

    return otcStocks[symbol] || tseStocks[symbol] || null;
};
