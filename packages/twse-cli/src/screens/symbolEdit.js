import { getStockInfo } from 'twse';
import { dispatch } from '@rematch/core';
import prompt from '../prompt';

const SYMBOLEDIT_SETUP = 'Setup notifier';
const SYMBOLEDIT_REMOVE = 'Remove';

export default async ({ params: { symbol } }) => {
    const questions = [
        {
            type: 'list',
            name: 'edit',
            message: symbol,
            choices: [
                new prompt.Separator(),
                SYMBOLEDIT_SETUP,
                SYMBOLEDIT_REMOVE,
                new prompt.Separator(),
                'Back to symbol list'
            ]
        }
    ];

    const { edit } = await prompt.ask(questions);

    switch (edit) {
        case SYMBOLEDIT_SETUP:
            return dispatch.screen.update({ name: 'symbolNotifier', params: { symbol } });
        case SYMBOLEDIT_REMOVE:
            return dispatch.screen.update({ name: 'symbolRemove', params: { symbol } });
        default:
            return dispatch.screen.update({ name: 'symbolList' });
    }
};
