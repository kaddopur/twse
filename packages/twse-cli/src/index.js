#!/usr/bin/env node

import '@babel/polyfill';
import {
    renderWelcomeScreen,
    renderTickerScreen,
    renderMySymbolsScreen
} from './screens';

import { createStore } from 'redux';
import rootReducer, { getScreen, updateScreen } from './ducks/screen';
import { bindActionCreators } from 'redux';

const store = createStore(rootReducer);
const actions = bindActionCreators({ updateScreen }, store.dispatch);

function render() {
    const screen = getScreen(store.getState());

    switch (screen) {
        case 'main':
            renderWelcomeScreen({ actions });
            break;
        case 'ticker':
            renderTickerScreen({ actions });
            break;
        case 'symbols':
            renderMySymbolsScreen({ actions });
            break;
        default:
            break;
    }
}

store.subscribe(render);
render();
