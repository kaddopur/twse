import { getStockInfo } from 'twse';
import { dispatch } from '@rematch/core';
import prompt from '../prompt';

export default async ({ params: { symbol } }) => {
    const typeQuestion = [
        {
            type: 'list',
            name: 'type',
            message: `choose notifier type?`,
            choices: ['>=', '<=']
        },
        {
            type: 'input',
            name: 'value',
            message: `at what price/rate (empty to exit)?`
        }
    ];

    const { type, value } = await prompt.ask(typeQuestion);

    if (value) {
        dispatch.notifier.addCondition({ symbol, type, value });
    }

    return dispatch.screen.update({ name: 'symbolNotifier', params: { symbol } });
};
