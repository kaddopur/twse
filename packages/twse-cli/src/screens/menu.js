import chalk from 'chalk';
import figlet from 'figlet';
import { version } from '../../package.json';
import { dispatch } from '@rematch/core';
import prompt from '../prompt';
import { MENU_TICKER, MENU_SYMBOLS, MENU_OPTION, MENU_EXIT } from '../locales/en';

const renderWelcomeMessage = () => {
    console.log(
        chalk.red(
            figlet.textSync('twse', {
                horizontalLayout: 'full',
                font: 'Ogre'
            })
        )
    );
    console.log(chalk.red(`v${version}\n`));
};

export default async () => {
    renderWelcomeMessage();
    const questions = [
        {
            type: 'list',
            name: 'menu',
            message: 'What do you want to do?',
            choices: [MENU_TICKER, MENU_SYMBOLS, MENU_OPTION, MENU_EXIT]
        }
    ];
    const { menu } = await prompt.ask(questions);

    switch (menu) {
        case MENU_TICKER:
            return dispatch.screen.update({ name: 'ticker' });
        case MENU_SYMBOLS:
            return dispatch.screen.update({ name: 'symbolList' });
        case MENU_OPTION:
            return dispatch.screen.update({ name: 'option' });
    }
};
