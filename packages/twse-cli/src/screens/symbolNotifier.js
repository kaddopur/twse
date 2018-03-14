import { getStockInfo } from 'twse';
import { dispatch } from '@rematch/core';
import prompt from '../prompt';
import { parseSymbolOption } from '../utils';

const debug = require('debug')('screen:symbolNotifier');

const SYMBOLNOTIFIER_ADD = 'Add notifier';
const SYMBOLNOTIFIER_BACK = 'Back to symbol edit';

function getChoices(conditions, cost) {
    return conditions.map(({ type, value }) => {
        switch (type) {
            case '>=':
            case '<=':
                return `${type} ${parseFloat(value).toFixed(2)}`;
            case '%>=':
                return `${type} ${parseFloat(value).toFixed(2)}% -> ${parseFloat(cost * (1 + value / 100)).toFixed(2)}`;
            case '%<=':
                return `${type} ${parseFloat(value).toFixed(2)}% -> ${parseFloat(cost * (1 - value / 100)).toFixed(2)}`;
        }
    });
}

export default async ({ params: { symbol }, notifiers = {} }) => {
    debug(symbol);
    const { code } = parseSymbolOption(symbol);
    const { conditions = [], cost } = notifiers[code] || {};
    const notifierChoices = getChoices(conditions, cost);

    const questions = [
        {
            type: 'list',
            name: 'notifier',
            message: `${symbol}${cost === null ? '\n* setup average cost to enable rate notifier' : ''}`,
            pageSize: 50,
            choices: [
                new prompt.Separator(),
                SYMBOLNOTIFIER_ADD,
                new prompt.Separator(),
                ...notifierChoices,
                new prompt.Separator(),
                SYMBOLNOTIFIER_BACK
            ]
        }
    ];

    const { notifier } = await prompt.ask(questions);

    switch (notifier) {
        case SYMBOLNOTIFIER_ADD:
            return dispatch.screen.update({ name: 'symbolNotifierAdd', params: { symbol } });
        case SYMBOLNOTIFIER_BACK:
            return dispatch.screen.update({ name: 'symbolEdit', params: { symbol } });
        default:
            return dispatch.screen.update({
                name: 'symbolNotifierRemove',
                params: { symbol, notifier, index: notifierChoices.indexOf(notifier) }
            });
    }
};
