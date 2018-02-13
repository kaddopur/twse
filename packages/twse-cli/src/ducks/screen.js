import { createAction, handleActions } from 'redux-actions';

//- Actions
export const updateScreen = createAction('SCREEN_UPDATE');

//- State
const initialState = 'menu';

//- Reducers
export default handleActions(
    {
        SCREEN_UPDATE: (state, action) => action.payload
    },
    initialState
);

//- Selectors
export const getScreen = state => state;
