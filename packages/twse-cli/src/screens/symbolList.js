import clear from 'clear';
import { askSymbolList } from '../questions';

export default async ({ actions: { updateScreen } = {} }) => {
    clear();
    const { symbol } = await askSymbolList();

    switch (symbol) {
        case 'Add new':
            return updateScreen('symbolAdd');
        case 'Back to menu':
            return updateScreen('main');
        default:
            return updateScreen('symbolRemove');
    }
};
