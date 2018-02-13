import { createStore, combineReducers } from 'redux';
import screenReducer from './ducks/screen';
import symbolRecuder from './ducks/symbol';

const rootReducer = combineReducers({
    screen: screenReducer,
    symbol: symbolRecuder
});

export default createStore(rootReducer);
