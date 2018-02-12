import '@babel/polyfill';
import { renderWelcomeScreen } from './screens';
import { askMenu } from './questions';

const run = async () => {
    renderWelcomeScreen();

    const { menu } = await askMenu();

    switch (menu) {
        case 'Show ticker':

        default:
            return;
    }
};

run();
