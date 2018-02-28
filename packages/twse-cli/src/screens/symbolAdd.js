import { getStockInfo, getStockName } from 'twse';
import askNewSymbol from '../questions/askNewSymbol';
import { dispatch } from '@rematch/core';

export default async () => {
    const { symbol } = await askNewSymbol();
    const [code, name] = symbol.split(' ');

    if (name) {
        dispatch.symbol.add({ code, name });
    }
    dispatch.screen.update({ name: 'symbolList' });
};
