import { getStockInfo } from 'twse';
import confirmRemoveSymbol from '../questions/confirmRemoveSymbol';
import { dispatch } from '@rematch/core';

export default async ({ params: { symbol } }) => {
    const { remove } = await confirmRemoveSymbol(symbol);

    if (remove) {
        const symbolCode = symbol.split(' ')[0];
        dispatch.symbol.remove(symbolCode);
    }

    dispatch.screen.update({ name: 'symbolList' });
};
