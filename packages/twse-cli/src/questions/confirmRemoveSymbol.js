import inquirer from 'inquirer';

export default symbol => {
    const questions = [
        {
            type: 'confirm',
            name: 'remove',
            message: `Remove ${symbol}?`
        }
    ];
    return inquirer.prompt(questions);
};
