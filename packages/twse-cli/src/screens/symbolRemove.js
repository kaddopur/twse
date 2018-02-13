import clear from 'clear';
import { getStockInfo } from 'twse';
import { getSymbols, setSymbols } from '../store';
import { askAddSymbol, confirmRemoveSymbol } from '../questions';

export default async ({ actions: { updateScreen } = {}, symbol }) => {
    clear();

    const { remove } = await confirmRemoveSymbol(symbol);

    if (remove) {
        const newSymbols = getSymbols().filter(
            s => `${s.code} ${s.name}` !== symbol
        );
        setSymbols(newSymbols);
    }

    updateScreen('symbolList');
};
