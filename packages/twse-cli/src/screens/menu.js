import chalk from 'chalk';
import figlet from 'figlet';
import chooseMenu from '../questions/chooseMenu';
import { MENU_TICKER, MENU_SYMBOLS } from '../locales/en';
import { version } from '../../package.json';
import { dispatch } from '@rematch/core';

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

    const { menu } = await chooseMenu();

    switch (menu) {
        case MENU_TICKER:
            return dispatch.screen.update({ name: 'ticker' });
        case MENU_SYMBOLS:
            return dispatch.screen.update({ name: 'symbolList' });
    }
};
