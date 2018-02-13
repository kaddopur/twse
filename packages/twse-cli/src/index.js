#!/usr/bin/env node

import '@babel/polyfill';
import menuScreen from './screens/menu';
import tickerScreen from './screens/ticker';
import symbolListScreen from './screens/symbolList';
import symbolAddScreen from './screens/symbolAdd';
import symbolRemoveScreen from './screens/symbolRemove';

import { getScreen, updateScreen } from './ducks/screen';
import { getSymbols, addSymbols } from './ducks/symbols';
import { bindActionCreators } from 'redux';
import store from './store';

const actions = bindActionCreators(
    { updateScreen, addSymbols },
    store.dispatch
);

let prevScreen = null;

function render() {
    const { screen: screenState, symbols: symbolsState } = store.getState();
    const screen = getScreen(screenState);
    const symbols = getSymbols(symbolsState);

    if (screen === prevScreen) {
        return;
    }
    prevScreen = screen;

    switch (screen) {
        case 'menu':
            return menuScreen({ actions });
        case 'ticker':
            return tickerScreen({ actions, symbols });
        case 'symbolList':
            return symbolListScreen({ actions, symbols });
        case 'symbolAdd':
            return symbolAddScreen({ actions });
        case 'symbolRemove':
            return symbolRemoveScreen({ actions });
        default:
            return;
    }
}

store.subscribe(render);
render();
