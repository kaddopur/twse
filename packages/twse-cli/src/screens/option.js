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
                ...order.map(entry => {
                    const { title, value } = options[entry] || {};
                    return `${title}: ${value}`;
                }),
                OPTION_BACK
            ]
        }
    ];
    const { option } = await prompt.ask(questions);
    const optionKey = order.find(entry => option.indexOf(options[entry].title) === 0) || OPTION_BACK;

    switch (optionKey) {
        case 'menu':
            return dispatch.screen.update({ name: 'menu' });
        case 'invertColor':
            return dispatc.screen.update({ name: 'optionEdit', params: { optionKey } });
    }
};
