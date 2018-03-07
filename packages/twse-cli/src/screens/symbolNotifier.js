import { getStockInfo } from 'twse';
import { dispatch } from '@rematch/core';
import prompt from '../prompt';

const SYMBOLNOTIFIER_ADD = 'Add notifier';

function getChoices(conditions) {
    return conditions.map(condition => `${condition.type} ${condition.price || condition.rate}`);
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
                'Back to symbol edit'
            ]
        }
    ];

    const { notifier } = await prompt.ask(questions);

    switch (notifier) {
        case SYMBOLNOTIFIER_ADD:
        default:
            return dispatch.screen.update({ name: 'symbolEdit', params: { symbol } });
    }
};
