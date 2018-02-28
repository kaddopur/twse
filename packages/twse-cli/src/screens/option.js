import { dispatch } from '@rematch/core';
import prompt from '../prompt';
import { OPTION_BACK } from '../locales/en';

export default async ({ optionOrder: order, options }) => {
    const questions = [
        {
            type: 'list',
            name: 'option',
            message: 'Select to edit option',
            choices: [
                new prompt.Separator(),
                ...order.map(entry => {
                    const { title, value } = options[entry] || {};
                    return `${title}: ${value}`;
                }),
                new prompt.Separator(),
                OPTION_BACK
            ]
        }
    ];
    const { option } = await prompt.ask(questions);
    const optionKey = order.find(entry => option.indexOf(options[entry].title) === 0) || OPTION_BACK;

    switch (optionKey) {
        case OPTION_BACK:
            return dispatch.screen.update({ name: 'menu' });
        case 'invertColor':
            return dispatch.screen.update({ name: 'optionEdit', params: { optionKey } });
    }
};
