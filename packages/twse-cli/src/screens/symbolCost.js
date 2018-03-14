import { getStockInfo } from 'twse';
import { dispatch } from '@rematch/core';
import prompt from '../prompt';
import { parseSymbolOption } from '../utils';

const debug = require('debug')('screen:symbolCost');

export default async ({ notifiers, params: { symbol } }) => {
    debug(notifiers);
    debug(symbol);

    const { code } = parseSymbolOption(symbol);
    const questions = [
        {
            type: 'input',
            name: 'cost',
            message: `Enter you average cost of '${symbol}' (empty to exit)`
        }
    ];
    const { cost } = await prompt.ask(questions);

    dispatch.notifier.updateCost({ code, cost });
    dispatch.screen.update({ name: 'symbolEdit', params: { symbol } });
};
