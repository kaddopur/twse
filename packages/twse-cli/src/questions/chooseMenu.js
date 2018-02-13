import inquirer from 'inquirer';

export default () => {
    const questions = [
        {
            type: 'list',
            name: 'menu',
            message: 'What do you want to do?',
            choices: ['Ticker', 'Symbols', 'Option', 'Exit']
        }
    ];
    return inquirer.prompt(questions);
};
