import clear from 'clear';
import { getStockInfo } from 'twse';
import askNewSymbol from '../questions/askNewSymbol';

export default async ({ actions: { updateScreen, addSymbols } = {} }) => {
    clear();

    const { symbol } = await askNewSymbol();
    const [stock] = await getStockInfo([symbol]);

    if (stock) {
        addSymbols({
            code: stock.c,
            name: stock.n
        });
    }

    updateScreen('symbolList');
};
