import { getStockInfo } from 'twse';
import { dispatch } from '@rematch/core';
import prompt from '../prompt';

export default async ({ params: { symbol } }) => {
    const questions = [
        {
            type: 'confirm',
            name: 'remove',
            message: `Remove ${symbol}?`
        }
    ];
    const { remove } = await prompt.ask(questions);

    if (remove) {
        const symbolCode = symbol.split(' ')[0];
        dispatch.symbol.remove(symbolCode);
    }

    dispatch.screen.update({ name: 'symbolList' });
};
