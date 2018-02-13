import { createAction, handleActions } from 'redux-actions';

//- Actions
export const addSymbols = createAction('SYMBOLS_ADD');

//- State
const initialState = [];

//- Reducers
export default handleActions(
    {
        SYMBOLS_ADD: (state, action) => [...state, action.payload]
    },
    initialState
);

//- Selectors
export const getSymbols = state => state;
