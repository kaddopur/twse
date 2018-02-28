#!/usr/bin/env node

import '@babel/polyfill';
import clear from 'clear';
import menuScreen from './screens/menu';
import tickerScreen from './screens/ticker';
import symbolListScreen from './screens/symbolList';
import symbolAddScreen from './screens/symbolAdd';
import symbolRemoveScreen from './screens/symbolRemove';

import { getState } from '@rematch/core';
import { select } from '@rematch/select';
import store from './store';
import conf from './conf';

let prevScreen = null;

function render() {
    clear();

    const state = getState();
    const screen = select.screen.getScreen(state);
    const symbols = select.symbol.getSymbols(state);
    conf.set('appState', state);

    if (screen === prevScreen) {
        return;
    }
    prevScreen = screen;

    const { name, params } = screen;

    switch (name) {
        case 'menu':
            return menuScreen();
        case 'ticker':
            return tickerScreen({ symbols });
        case 'symbolList':
            return symbolListScreen({ symbols });
        case 'symbolAdd':
            return symbolAddScreen();
        case 'symbolRemove':
            return symbolRemoveScreen({ params });
        default:
            return;
    }
}

store.subscribe(render);
render();
