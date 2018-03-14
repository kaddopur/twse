import { getStockInfo } from 'twse';
import { dispatch } from '@rematch/core';
import prompt from '../prompt';

const debug = require('debug')('screen:symbolEdit');

const SYMBOLEDIT_COST = 'Setup average cost';
const SYMBOLEDIT_SETUP = 'Setup notifiers';
const SYMBOLEDIT_REMOVE = 'Remove';
const SYMBOLEDIT_BACK = 'Back to symbol list';

function getCost(notifiers, symbol) {
    const code = symbol.split(' ')[0];
    return notifiers[code].cost;
}

export default async ({ notifiers, params: { symbol } }) => {
    debug(notifiers);
    debug(symbol);

    const cost = 'unknown';
    const questions = [
        {
            type: 'list',
            name: 'edit',
            message: symbol,
            choices: [
                new prompt.Separator(),
                SYMBOLEDIT_SETUP,
                `${SYMBOLEDIT_COST}, current: ${getCost(notifiers, symbol)}`,
                SYMBOLEDIT_REMOVE,
                new prompt.Separator(),
                SYMBOLEDIT_BACK
            ]
        }
    ];

    const { edit } = await prompt.ask(questions);

    switch (edit) {
        case SYMBOLEDIT_SETUP:
            return dispatch.screen.update({ name: 'symbolNotifier', params: { symbol } });
        case SYMBOLEDIT_REMOVE:
            return dispatch.screen.update({ name: 'symbolRemove', params: { symbol } });
        case SYMBOLEDIT_BACK:
            return dispatch.screen.update({ name: 'symbolList' });
        default:
            return dispatch.screen.update({ name: 'symbolCost', params: { symbol } });
    }
};
