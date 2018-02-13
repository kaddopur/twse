import { createStore, combineReducers } from 'redux';
import screenReducer from './ducks/screen';
import symbolsRecuder from './ducks/symbols';

const rootReducer = combineReducers({
    screen: screenReducer,
    symbols: symbolsRecuder
});

export default createStore(rootReducer);
