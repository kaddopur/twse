import inquirer from 'inquirer';
import { getSymbols } from './store';

export const askMenu = () => {
    const questions = [
        {
            type: 'list',
            name: 'menu',
            message: 'What do you want to do?',
            choices: ['Show ticker', 'Edit symbols', 'Exit']
        }
    ];
    return inquirer.prompt(questions);
};

export const askSymbolList = () => {
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

export const askAddSymbol = () => {
    const questions = [
        {
            type: 'input',
            name: 'symbol',
            message: `Enter new symbol:`
        }
    ];
    return inquirer.prompt(questions);
};

export const confirmRemoveSymbol = symbol => {
    const questions = [
        {
            type: 'confirm',
            name: 'remove',
            message: `Remove ${symbol}?`
        }
    ];
    return inquirer.prompt(questions);
};
