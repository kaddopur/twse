#!/usr/bin/env node

import '@babel/polyfill';
import clear from 'clear';
import menuScreen from './screens/menu';
import tickerScreen from './screens/ticker';
import symbolListScreen from './screens/symbolList';
import symbolAddScreen from './screens/symbolAdd';
import symbolEditScreen from './screens/symbolEdit';
import symbolNotifierScreen from './screens/symbolNotifier';
import symbolRemoveScreen from './screens/symbolRemove';
import optionScreen from './screens/option';
import optionEditScreen from './screens/optionEdit';

import { getState } from '@rematch/core';
import { select } from '@rematch/select';
import store from './store';
import conf from './conf';

let prevScreen = null;

function render() {
    const state = getState();
    const screen = select.screen.getScreen(state);
    const symbols = select.symbol.getSymbols(state);
    const optionOrder = select.option.getOrder(state);
    const options = select.option.getOptions(state);
    const notifiers = select.notifier.getNotifiers(state);
    conf.set('appState', state);

    if (screen === prevScreen) {
        return;
    }
    prevScreen = screen;
    clear();

    const { name, params } = screen;

    switch (name) {
        case 'menu':
            return menuScreen();
        case 'ticker':
            return tickerScreen({ symbols, options, notifiers });
        case 'symbolList':
            return symbolListScreen({ symbols });
        case 'symbolAdd':
            return symbolAddScreen();
        case 'symbolEdit':
            return symbolEditScreen({ params, notifiers });
        case 'symbolNotifier':
            return symbolNotifierScreen({ params });
        case 'symbolRemove':
            return symbolRemoveScreen({ params });
        case 'option':
            return optionScreen({ optionOrder, options });
        case 'optionEdit':
            return optionEditScreen({ options, params });
        default:
            return;
    }
}

store.subscribe(render);
render();
