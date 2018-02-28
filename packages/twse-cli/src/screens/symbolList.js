import chooseSymbol from '../questions/chooseSymbol';
import { SYMBOLLIST_ADD, SYMBOLLIST_BACK } from '../locales/en';
import { dispatch } from '@rematch/core';

export default async ({ symbols = [] }) => {
    const { symbol } = await chooseSymbol(symbols);

    switch (symbol) {
        case SYMBOLLIST_ADD:
            return dispatch.screen.update({ name: 'symbolAdd' });
        case SYMBOLLIST_BACK:
            return dispatch.screen.update({ name: 'menu' });
        default:
            return dispatch.screen.update({ name: 'symbolRemove', params: { symbol } });
    }
};
