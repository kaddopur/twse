import inquirer from 'inquirer';

export const askMenu = () => {
    const questions = [
        {
            type: 'list',
            name: 'menu',
            message: 'What do you want to do?',
            choices: ['Show ticker', 'Add a new symbol', 'List current symbols']
        }
    ];
    return inquirer.prompt(questions);
};
