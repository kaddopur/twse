import clear from 'clear';
import { getStockInfo } from 'twse';
import { getSymbols, setSymbols } from '../store';
import { askAddSymbol } from '../questions';

export default async ({ actions: { updateScreen } = {} }) => {
    clear();

    const { symbol } = await askAddSymbol();
    const [stock] = await getStockInfo([symbol]);

    if (stock) {
        let newSymbols = getSymbols();
        newSymbols.push({
            code: stock.c,
            name: stock.n
        });
        setSymbols(newSymbols);
    }

    updateScreen('symbolList');
};
