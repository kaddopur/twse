import prompt from '../prompt';

export default () => {
    const questions = [
        {
            type: 'confirm',
            name: 'back',
            message: `Back to menu?`
        }
    ];
    return prompt.ask(questions);
};
