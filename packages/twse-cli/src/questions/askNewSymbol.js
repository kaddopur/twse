import inquirer from 'inquirer';

export default () => {
    const questions = [
        {
            type: 'input',
            name: 'symbol',
            message: `Enter new symbol:`
        }
    ];
    return inquirer.prompt(questions);
};
