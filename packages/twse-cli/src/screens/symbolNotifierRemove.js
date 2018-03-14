import { getStockInfo } from 'twse';
import { dispatch } from '@rematch/core';
import prompt from '../prompt';
import { parseSymbolOption } from '../utils';

export default async ({ params: { symbol, notifier, index }, notifiers = {} }) => {
    const { code } = parseSymbolOption(symbol);
    const { conditions = [] } = notifiers[code] || {};

    const questions = [
        {
            type: 'confirm',
            name: 'remove',
            message: `remove ${symbol} on ${notifier}`
        }
    ];

    const { remove } = await prompt.ask(questions);

    if (remove) {
        dispatch.notifier.removeCondition({ code, index });
    }
    return dispatch.screen.update({ name: 'symbolNotifier', params: { symbol } });
};
