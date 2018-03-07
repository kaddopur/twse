import { getStockInfo } from 'twse';
import { dispatch } from '@rematch/core';
import prompt from '../prompt';

const SYMBOLNOTIFIER_ADD = 'Add notifier';

export default async ({ params: { symbol } }) => {
    const questions = [
        {
            type: 'list',
            name: 'notifier',
            message: symbol,
            choices: [
                new prompt.Separator(),
                SYMBOLNOTIFIER_ADD,
                new prompt.Separator(),
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
