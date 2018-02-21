import { getStockInfo, getStockName } from 'twse';
import askNewSymbol from '../questions/askNewSymbol';

export default async ({ actions: { updateScreen, addSymbol } = {} }) => {
    const { symbol } = await askNewSymbol();
    const name = getStockName(symbol);

    if (name) {
        addSymbol({
            code: symbol,
            name
        });
    }

    updateScreen({ name: 'symbolList' });
};
