import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';
import Table from 'cli-table2';
import { getStockInfo, getStockInfoStream } from 'twse';
import numeral from 'numeral';
import { getSymbols, setSymbols } from './store';
import {
    askMenu,
    askSymbolList,
    askAddSymbol,
    confirmRemoveSymbol
} from './questions';

const renderAddSymbolScreen = async () => {
    clear();
    const { symbol } = await askAddSymbol();

    const [stock] = await getStockInfo([symbol]);

    if (stock) {
        let newSymbols = getSymbols();
        newSymbols.push({
            code: stock.c,
            name: stock.n
        });
        setSymbols(newSymbols);
    }

    renderMySymbolsScreen();
};

const renderRemoveSymbolScreen = async symbol => {
    clear();
    const { remove } = await confirmRemoveSymbol(symbol);

    if (remove) {
        const newSymbols = getSymbols().filter(
            s => `${s.code} ${s.name}` !== symbol
        );
        setSymbols(newSymbols);
    }

    renderMySymbolsScreen();
};

export const renderMySymbolsScreen = async () => {
    clear();
    const { symbol } = await askSymbolList();

    switch (symbol) {
        case 'Add new':
            renderAddSymbolScreen();
            break;
        case 'Back to menu':
            renderWelcomeScreen();
            break;
        default:
            renderRemoveSymbolScreen(symbol);
    }
};
