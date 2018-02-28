import prompt from '../prompt';

export default symbol => {
    const questions = [
        {
            type: 'confirm',
            name: 'remove',
            message: `Remove ${symbol}?`
        }
    ];
    return prompt.ask(questions);
};
