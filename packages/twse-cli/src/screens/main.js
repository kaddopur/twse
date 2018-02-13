import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';
import chooseMenu from '../questions/chooseMenu';

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
        case 'Ticker':
            return updateScreen('ticker');
        case 'Symbols':
            return updateScreen('symbolList');
    }
};
