import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';
import chooseMenu from '../questions/chooseMenu';
import { MENU_TICKER, MENU_SYMBOLS } from '../locales/en';

const renderWelcomeMessage = () => {
    console.log(
        chalk.red(
            figlet.textSync('twse', {
                horizontalLayout: 'full',
                font: 'Ogre'
            })
        )
    );
};

export default async ({ actions: { updateScreen } = {} }) => {
    clear();
    renderWelcomeMessage();

    const { menu } = await chooseMenu();

    switch (menu) {
        case MENU_TICKER:
            return updateScreen({ name: 'ticker' });
        case MENU_SYMBOLS:
            return updateScreen({ name: 'symbolList' });
    }
};
