import inquirer from 'inquirer';
import autocompletePrompt from 'inquirer-autocomplete-prompt';
import { getOTCStocks, getTSEStocks } from 'twse';
import fuzzy from 'fuzzy';

inquirer.registerPrompt('autocomplete', autocompletePrompt);

const otc = getOTCStocks();
const otcStocks = Object.entries(otc).map(
    ([symbol, name]) => `${symbol} ${name}`
);
const tse = getTSEStocks();
const tseStocks = Object.entries(tse).map(
    ([symbol, name]) => `${symbol} ${name}`
);
const stocks = [...otcStocks, ...tseStocks];

export default () => {
    const questions = [
        {
            type: 'autocomplete',
            name: 'symbol',
            message: 'Enter new symbol:',
            source: (answers, input) => {
                if (!input) {
                    return Promise.resolve([]);
                }
                return Promise.resolve().then(() =>
                    fuzzy.filter(input, stocks).map(ele => ele.original)
                );
            }
        }
    ];
    return inquirer.prompt(questions);
};
