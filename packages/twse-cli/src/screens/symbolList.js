import clear from 'clear';
import { askSymbolList } from '../questions';

export default async ({ actions: { updateScreen } = {} }) => {
    clear();
    const { symbol } = await askSymbolList();

    switch (symbol) {
        case 'Add new':
            updateScreen('addSymbol');
            break;
        case 'Back to menu':
            updateScreen('main');
            break;
        default:
            updateScreen('removeSymbol');
    }
};
