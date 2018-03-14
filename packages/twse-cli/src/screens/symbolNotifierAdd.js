import { getStockInfo } from 'twse';
import { dispatch } from '@rematch/core';
import prompt from '../prompt';
import { parseSymbolOption } from '../utils';

const debug = require('debug')('screen:symbolNotifierAdd');

export default async ({ params: { symbol }, notifiers }) => {
    debug(symbol);
    const { code } = parseSymbolOption(symbol);

    const typeQuestion = [
        {
            type: 'list',
            name: 'type',
            message: 'choose notifier type?',
            choices: notifiers[code].cost !== null ? ['>=', '<=', '%>=', '%<='] : ['>=', '<=']
        },
        {
            type: 'input',
            name: 'value',
            message: `at what price/rate (empty to exit)?`
        }
    ];

    const { type, value } = await prompt.ask(typeQuestion);

    if (value) {
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
