import conf from './conf';
import selectorsPlugin from '@rematch/select';
import { init, getState } from '@rematch/core';
import * as models from './models';
import migrations from './migrations';

const select = selectorsPlugin();

const initialState = migrations({
    ...conf.get('appState'),
    screen: { name: 'menu' }
});

const store = init({
    redux: {
        initialState
    },
    models,
    plugins: [select]
});

export default store;
