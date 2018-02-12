import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';

export const renderWelcomeScreen = () => {
    clear();
    console.log(
        chalk.red(
            figlet.textSync('twse', {
                horizontalLayout: 'full',
                font: 'Ogre'
            })
        )
    );
};
