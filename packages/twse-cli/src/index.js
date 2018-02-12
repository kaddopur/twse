import '@babel/polyfill';
import {
    renderWelcomeScreen,
    renderTickerScreen,
    renderMySymbolsScreen
} from './screens';
import { askMenu } from './questions';

const run = async () => {
    renderWelcomeScreen();

    const { menu } = await askMenu();

    switch (menu) {
        case 'Ticker':
            renderTickerScreen();
            break;
        case 'My symbols':
            renderMySymbolsScreen();
            break;
        default:
            break;
    }
};

run();
