import { getStockInfo, getStockName } from 'twse';
import askNewSymbol from '../questions/askNewSymbol';

export default async ({ actions: { updateScreen, addSymbol } = {} }) => {
    const { symbol } = await askNewSymbol();
    const [code, name] = symbol.split(' ');

    if (name) {
        addSymbol({ code, name });
    }
    updateScreen({ name: 'symbolList' });
};
