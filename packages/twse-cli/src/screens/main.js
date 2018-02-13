import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';
import { askMenu } from '../questions';

export default async ({ actions: { updateScreen } = {} }) => {
    clear();

    console.log(
        chalk.red(
            figlet.textSync('twse', {
                horizontalLayout: 'full',
                font: 'Ogre'
            })
        )
    );

    const { menu } = await askMenu();

    switch (menu) {
        case 'Show ticker':
            return updateScreen('ticker');
        case 'Edit symbols':
            return updateScreen('symbolList');
    }
};
