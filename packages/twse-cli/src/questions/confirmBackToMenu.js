import inquirer from 'inquirer';

export default () => {
    const questions = [
        {
            type: 'confirm',
            name: 'back',
            message: `Back to menu?`
        }
    ];
    return inquirer.prompt(questions);
};
