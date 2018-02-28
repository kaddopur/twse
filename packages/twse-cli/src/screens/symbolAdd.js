import { getStockInfo, getStockName } from 'twse';
import { dispatch } from '@rematch/core';
import { getOTCStocks, getTSEStocks } from 'twse';
import fuzzy from 'fuzzy';
import prompt from '../prompt';

const otc = getOTCStocks();
const otcStocks = Object.entries(otc).map(([symbol, name]) => `${symbol} ${name}`);
const tse = getTSEStocks();
const tseStocks = Object.entries(tse).map(([symbol, name]) => `${symbol} ${name}`);
const stocks = [...otcStocks, ...tseStocks, 'exit'];

export default async () => {
    const questions = [
        {
            type: 'autocomplete',
            name: 'symbol',
            message: 'Enter new symbol (Type exit to quit):',
            source: (answers, input) => {
                if (!input) {
                    return Promise.resolve([]);
                }
                return Promise.resolve().then(() =>
                    fuzzy
                        .filter(input, stocks)
                        .map(ele => ele.original)
                        .sort((lhs, rhs) => parseInt(lhs) - parseInt(rhs))
                );
            }
        }
    ];
    const { symbol } = await prompt.ask(questions);
    const [code, name] = symbol.split(' ');

    if (name) {
        dispatch.symbol.add({ code, name });
    }
    dispatch.screen.update({ name: 'symbolList' });
};
