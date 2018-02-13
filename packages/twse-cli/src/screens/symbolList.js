import clear from 'clear';
import chooseSymbol from '../questions/chooseSymbol';

export default async ({ actions: { updateScreen } = {} }) => {
    clear();
    const { symbol } = await chooseSymbol();

    switch (symbol) {
        case 'Add new':
            return updateScreen('symbolAdd');
        case 'Back to menu':
            return updateScreen('main');
        default:
            return updateScreen('symbolRemove');
    }
};
