import chooseSymbol from '../questions/chooseSymbol';
import { SYMBOLLIST_ADD, SYMBOLLIST_BACK } from '../locales/en';

export default async ({ actions: { updateScreen } = {}, symbols = [] }) => {
    const { symbol } = await chooseSymbol(symbols);

    switch (symbol) {
        case SYMBOLLIST_ADD:
            return updateScreen({ name: 'symbolAdd' });
        case SYMBOLLIST_BACK:
            return updateScreen({ name: 'menu' });
        default:
            return updateScreen({ name: 'symbolRemove', params: { symbol } });
    }
};
