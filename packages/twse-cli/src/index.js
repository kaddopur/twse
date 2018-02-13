#!/usr/bin/env node

import '@babel/polyfill';
import menuScreen from './screens/menu';
import tickerScreen from './screens/ticker';
import symbolListScreen from './screens/symbolList';
import symbolAddScreen from './screens/symbolAdd';
import symbolRemoveScreen from './screens/symbolRemove';

import { createStore, combineReducers } from 'redux';
import screenReducer, { getScreen, updateScreen } from './ducks/screen';
import symbolsRecuder, { getSymbols, addSymbols } from './ducks/symbols';
import { bindActionCreators } from 'redux';

const rootReducer = combineReducers({
    screen: screenReducer,
    symbols: symbolsRecuder
});

const store = createStore(rootReducer);
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
