import { getStockInfo } from 'twse';
import { dispatch } from '@rematch/core';
import prompt from '../prompt';

const SYMBOLNOTIFIER_ADD = 'Add notifier';
const SYMBOLNOTIFIER_BACK = 'Back to symbol edit';

function getChoices(conditions) {
    return conditions.map(condition => `${condition.type} ${condition.value}`);
}

export default async ({ params: { symbol }, notifiers = {} }) => {
    const { conditions = [] } = notifiers[symbol.split(' ')[0]] || {};

    const questions = [
        {
            type: 'list',
            name: 'notifier',
            message: symbol,
            pageSize: 50,
            choices: [
                new prompt.Separator(),
                SYMBOLNOTIFIER_ADD,
                new prompt.Separator(),
                ...getChoices(conditions),
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
            return dispatch.screen.update({ name: 'symbolNotifierRemove', params: { symbol, notifier } });
    }
};
