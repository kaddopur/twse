import { dispatch } from '@rematch/core';
import prompt from '../prompt';
import { SYMBOLLIST_ADD, SYMBOLLIST_BACK } from '../locales/en';

export default async ({ symbols = [] }) => {
    const questions = [
        {
            type: 'list',
            name: 'symbol',
            message: 'Add / edit your symbol',
            pageSize: 50,
            choices: [
                new prompt.Separator(),
                SYMBOLLIST_ADD,
                new prompt.Separator(),
                ...symbols.map(s => `${s.code} ${s.name}`),
                new prompt.Separator(),
                SYMBOLLIST_BACK
            ]
        }
    ];
    const { symbol } = await prompt.ask(questions);

    switch (symbol) {
        case SYMBOLLIST_ADD:
            return dispatch.screen.update({ name: 'symbolAdd' });
        case SYMBOLLIST_BACK:
            return dispatch.screen.update({ name: 'menu' });
        default:
            return dispatch.screen.update({ name: 'symbolEdit', params: { symbol } });
    }
};
