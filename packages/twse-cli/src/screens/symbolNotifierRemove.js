import { getStockInfo } from 'twse';
import { dispatch } from '@rematch/core';
import prompt from '../prompt';

export default async ({ params: { symbol, notifier }, notifiers = {} }) => {
    const { conditions = [] } = notifiers[symbol.split(' ')[0]] || {};

    const questions = [
        {
            type: 'confirm',
            name: 'remove',
            message: `remove ${symbol} on ${notifier}`,
            default: false
        }
    ];

    const { remove } = await prompt.ask(questions);

    if (remove) {
        dispatch.notifier.removeCondition({ symbol, notifier });
    }
    return dispatch.screen.update({ name: 'symbolNotifier', params: { symbol } });
};
