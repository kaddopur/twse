import inquirer from 'inquirer';
import { SYMBOLLIST_ADD, SYMBOLLIST_BACK } from '../locales/en';

export default symbols => {
    const questions = [
        {
            type: 'list',
            name: 'symbol',
            message: 'Add/remove your symbol',
            choices: [
                SYMBOLLIST_ADD,
                ...symbols.map(s => `${s.code} ${s.name}`),
                SYMBOLLIST_BACK
            ]
        }
    ];
    return inquirer.prompt(questions);
};
