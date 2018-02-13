import inquirer from 'inquirer';

export default symbols => {
    const questions = [
        {
            type: 'list',
            name: 'symbol',
            message: 'Add/remove your symbol',
            choices: [
                ...symbols.map(s => `${s.code} ${s.name}`),
                'Add new',
                'Back to menu'
            ]
        }
    ];
    return inquirer.prompt(questions);
};
