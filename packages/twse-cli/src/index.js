#!/usr/bin/env node

import '@babel/polyfill';
import clear from 'clear';
import menuScreen from './screens/menu';
import tickerScreen from './screens/ticker';
import symbolListScreen from './screens/symbolList';
import symbolAddScreen from './screens/symbolAdd';
import symbolRemoveScreen from './screens/symbolRemove';

import { getScreen, updateScreen } from './ducks/screen';
import { getSymbols, addSymbol, removeSymbol } from './ducks/symbol';
import { bindActionCreators } from 'redux';
import store from './store';
import conf from './conf';

const actions = bindActionCreators(
    { updateScreen, addSymbol, removeSymbol },
    store.dispatch
);

let prevScreen = null;

function render() {
    clear();

    const state = store.getState();
    const { screen: screenState, symbol: symbolState } = state;
    const screen = getScreen(screenState);
    const symbols = getSymbols(symbolState);
    conf.set('appState', store.getState());

    if (screen === prevScreen) {
        return;
    }
    prevScreen = screen;

    const { name, params } = screen;

    switch (name) {
        case 'menu':
            return menuScreen({ actions });
        case 'ticker':
            return tickerScreen({ actions, symbols });
        case 'symbolList':
            return symbolListScreen({ actions, symbols });
        case 'symbolAdd':
            return symbolAddScreen({ actions });
        case 'symbolRemove':
            return symbolRemoveScreen({ actions, params });
        default:
            return;
    }
}

store.subscribe(render);
render();
