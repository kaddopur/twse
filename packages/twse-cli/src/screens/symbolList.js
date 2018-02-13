import clear from 'clear';
import chooseSymbol from '../questions/chooseSymbol';

export default async ({ actions: { updateScreen } = {}, symbols = [] }) => {
    clear();
    const { symbol } = await chooseSymbol(symbols);

    switch (symbol) {
        case 'Add new':
            return updateScreen('symbolAdd');
        case 'Back to menu':
            return updateScreen('menu');
        default:
            return updateScreen('symbolRemove');
    }
};
