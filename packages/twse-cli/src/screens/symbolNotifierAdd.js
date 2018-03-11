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
        const code = symbol.split(' ')[0];
        dispatch.notifier.addCondition({
            code,
            condition: {
                type,
                value
            }
        });
        dispatch.notifier.sortCondition({ code });
    }

    return dispatch.screen.update({ name: 'symbolNotifier', params: { symbol } });
};
