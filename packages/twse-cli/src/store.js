import { createStore, combineReducers } from 'redux';
import screenReducer from './ducks/screen';
import symbolReducer from './ducks/symbol';
import conf from './conf';

const rootReducer = combineReducers({
    screen: screenReducer,
    symbol: symbolReducer
});

const initialState = {
    ...conf.get('appState'),
    screen: { name: 'menu' }
};

export default createStore(rootReducer, initialState);
