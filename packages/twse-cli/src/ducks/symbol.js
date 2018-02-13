import { createAction, handleActions } from 'redux-actions';

//- Actions
export const addSymbol = createAction('SYMBOL_ADD');
export const removeSymbol = createAction('SYMBOL_REMOVE');

//- State
const initialState = {
    symbols: []
};

//- Reducers
export default handleActions(
    {
        SYMBOL_ADD: (state, action) => ({
            ...state,
            symbols: [...state.symbols, action.payload]
        }),
        SYMBOL_REMOVE: (state, action) => ({
            ...state,
            symbols: state.symbols.filter(s => s.code !== action.payload)
        })
    },
    initialState
);

//- Selectors
export const getSymbols = state => state.symbols;
