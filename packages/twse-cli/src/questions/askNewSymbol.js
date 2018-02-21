import inquirer from 'inquirer';
import autocompletePrompt from 'inquirer-autocomplete-prompt';
import { getTSEStocks } from 'twse';
import fuzzy from 'fuzzy';

inquirer.registerPrompt('autocomplete', autocompletePrompt);

const tse = getTSEStocks();
const tseStocks = Object.entries(tse).map(
    ([symbol, name]) => `${symbol} ${name}`
);

let searchSymbol = (answers = [], input = '') => {
    return new Promise(resolve => {
        resolve(fuzzy.filter(input, tseStocks).map(ele => ele.original));
    });
};

export default () => {
    const questions = [
        {
            type: 'autocomplete',
            name: 'symbol',
            message: 'Enter new symbol:',
            source: searchSymbol
        }
    ];
    return inquirer.prompt(questions);
};
