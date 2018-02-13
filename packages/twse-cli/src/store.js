import { createStore, combineReducers } from 'redux';
import screenReducer from './ducks/screen';
import symbolRecuder from './ducks/symbol';
import conf from './conf';

const rootReducer = combineReducers({
    screen: screenReducer,
    symbol: symbolRecuder
});

const initialState = {
    ...conf.get('appState'),
    screen: { name: 'menu' }
};

export default createStore(rootReducer, initialState);
