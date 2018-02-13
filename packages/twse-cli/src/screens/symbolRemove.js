import clear from 'clear';
import { getStockInfo } from 'twse';
import confirmRemoveSymbol from '../questions/confirmRemoveSymbol';

export default async ({
    actions: { updateScreen, removeSymbol } = {},
    params: { symbol }
}) => {
    clear();

    const { remove } = await confirmRemoveSymbol(symbol);

    if (remove) {
        const symbolCode = symbol.split(' ')[0];
        removeSymbol(symbolCode);
    }

    updateScreen({ name: 'symbolList' });
};
