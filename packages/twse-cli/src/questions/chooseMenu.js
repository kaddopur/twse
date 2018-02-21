import inquirer from 'inquirer';
import { MENU_TICKER, MENU_SYMBOLS, MENU_EXIT } from '../locales/en';

export default () => {
    const questions = [
        {
            type: 'list',
            name: 'menu',
            message: 'What do you want to do?',
            choices: [MENU_TICKER, MENU_SYMBOLS, MENU_EXIT]
        }
    ];
    return inquirer.prompt(questions);
};
