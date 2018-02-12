import '@babel/polyfill';
import { renderWelcomeScreen, renderTickerScreen } from './screens';
import { askMenu } from './questions';

const run = async () => {
    renderWelcomeScreen();

    const { menu } = await askMenu();

    switch (menu) {
        case 'Show ticker':
            renderTickerScreen();
        default:
            return;
    }
};

run();
