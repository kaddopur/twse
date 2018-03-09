import { dispatch } from '@rematch/core';
import prompt from '../prompt';

export default async ({ options = {}, params = {} }) => {
    const { optionKey } = params;
    const { title, value, choices } = options[optionKey] || {};
    const questions = [
        {
            type: 'list',
            name: 'newValue',
            message: `Set '${title}' to:`,
            default: String(value),
            choices
        }
    ];
    const { newValue } = await prompt.ask(questions);
    dispatch.option.updateOption({
        optionKey,
        value: newValue
    });

    dispatch.screen.update({ name: 'option' });
};
