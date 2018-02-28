import conf from './conf';
import selectorsPlugin from '@rematch/select';
import { init, getState } from '@rematch/core';
import * as models from './models';

const select = selectorsPlugin();

const initialState = {
    ...conf.get('appState'),
    screen: { name: 'menu' }
};

const store = init({
    // redux: {
    //     initialState
    // },
    models,
    plugins: [select]
});

console.log(Object.keys(store));

export default store;
