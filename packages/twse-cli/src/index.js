#!/usr/bin/env node

import '@babel/polyfill';
import { renderTickerScreen, renderMySymbolsScreen } from './screens';
import mainScreen from './screens/main';
import tickerScreen from './screens/ticker';
import symbolListScreen from './screens/symbolList';
import symbolAddScreen from './screens/symbolAdd';

import { createStore } from 'redux';
import rootReducer, { getScreen, updateScreen } from './ducks/screen';
import { bindActionCreators } from 'redux';

const store = createStore(rootReducer);
const actions = bindActionCreators({ updateScreen }, store.dispatch);

function render() {
    const screen = getScreen(store.getState());

    switch (screen) {
        case 'main':
            mainScreen({ actions });
            break;
        case 'ticker':
            tickerScreen({ actions });
            break;
        case 'symbolList':
            symbolListScreen({ actions });
            break;
        case 'symbolAdd':
            symbolAddScreen({ actions });
            break;
        default:
            break;
    }
}

store.subscribe(render);
render();
