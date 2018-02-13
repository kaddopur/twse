import inquirer from 'inquirer';
import { getSymbols } from '../store';

export default () => {
    const questions = [
        {
            type: 'list',
            name: 'symbol',
            message: 'Add/remove your symbol',
            choices: [
                ...getSymbols().map(s => `${s.code} ${s.name}`),
                'Add new',
                'Back to menu'
            ]
        }
    ];
    return inquirer.prompt(questions);
};
