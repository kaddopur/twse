import clear from 'clear';
import { getStockInfo } from 'twse';
import { getSymbols, setSymbols } from '../store';
import confirmRemoveSymbol from '../questions/confirmRemoveSymbol';

export default async ({ actions: { updateScreen } = {}, symbol }) => {
    clear();

    const { remove } = await confirmRemoveSymbol(symbol);

    console.log('asdf', remove);

    if (remove) {
        const newSymbols = getSymbols().filter(
            s => `${s.code} ${s.name}` !== symbol
        );
        setSymbols(newSymbols);
    }

    updateScreen('symbolList');
};
