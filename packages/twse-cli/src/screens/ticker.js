import clear from 'clear';
import chalk from 'chalk';
import Table from 'cli-table2';
import { getStockInfoStream } from 'twse';
import numeral from 'numeral';
import { dispatch } from '@rematch/core';
import prompt from '../prompt';

let invertColor = false;

const coloring = (string, condition, bgColor) => {
    let upColor = chalk.red.bind(chalk);
    let downColor = chalk.green.bind(chalk);
    let upBgColor = chalk.bgRed.bind(chalk);
    let downBgColor = chalk.bgGreenBright.bind(chalk);

    if (invertColor) {
        [upColor, downColor] = [downColor, upColor];
        [upBgColor, downBgColor] = [downBgColor, upBgColor];
    }

    if (bgColor) {
        return condition > 0 ? upBgColor(string) : downBgColor(string);
    } else if (condition > 0) {
        return upColor(string);
    } else if (condition < 0) {
        return downColor(string);
    } else {
        return string;
    }
};

const renderTickerTable = (stockInfo = []) => {
    clear();

    if (!stockInfo) {
        console.log('Server error');
        return;
    }

    const table = new Table({
        head: [
            '代號',
            '商品',
            { content: '成交', hAlign: 'right' },
            { content: '漲跌', hAlign: 'right' },
            { content: '漲幅%', hAlign: 'right' },
            { content: '單量', hAlign: 'right' },
            { content: '總量', hAlign: 'right' },
            { content: '最高', hAlign: 'right' },
            { content: '最低', hAlign: 'right' },
            { content: '振幅%', hAlign: 'right' }
        ],
        style: {
            head: [],
            border: [],
            'padding-left': 0
        },
        chars: {
            top: '',
            'top-mid': '',
            'top-left': '',
            'top-right': '',
            bottom: '',
            'bottom-mid': '',
            'bottom-left': '',
            'bottom-right': '',
            left: '',
            'left-mid': '',
            mid: '',
            'mid-mid': '',
            right: '',
            'right-mid': '',
            middle: ' '
        }
    });

    stockInfo.forEach(stock => {
        table.push([
            stock.c,
            stock.n,
            {
                content: coloring(
                    numeral(stock.z).format('0.00'),
                    stock.z - stock.y,
                    stock.z === stock.u || stock.z === stock.w
                ),
                hAlign: 'right'
            },
            {
                content: coloring(numeral(stock.z - stock.y).format('0.00'), stock.z - stock.y),
                hAlign: 'right'
            },
            {
                content: coloring(numeral((stock.z - stock.y) / stock.y).format('+0.00%'), stock.z - stock.y),
                hAlign: 'right'
            },
            {
                content: coloring(
                    numeral(stock.tv).format('0,0'),
                    stock.a === '-'
                        ? 1
                        : stock.b === '-' ? -1 : 2 * stock.z - stock.a.split('_')[0] - stock.b.split('_')[0]
                ),
                hAlign: 'right'
            },
            { content: numeral(stock.v).format('0,0'), hAlign: 'right' },
            {
                content: coloring(numeral(stock.h).format('0.00'), stock.h - stock.y, stock.h === stock.u),
                hAlign: 'right'
            },
            {
                content: coloring(numeral(stock.l).format('0.00'), stock.l - stock.y, stock.l === stock.w),
                hAlign: 'right'
            },
            {
                content: numeral((stock.h - stock.l) / stock.y).format('+0.00%'),
                hAlign: 'right'
            }
        ]);
    });

    table.push([{ content: '', colSpan: 10 }]);
    table.push([
        {
            content: `資料時間: ${stockInfo[0].d} ${stockInfo[0].t}`,
            colSpan: 10
        }
    ]);

    console.log(table.toString());
};

export default async ({ symbols = [], options = {} }) => {
    if (symbols.length === 0) {
        return dispatch.screen.update({ name: 'menu' });
    }

    invertColor = options.coloring.value !== 'Taiwan';

    let backPrompt = null;
    const subscription = getStockInfoStream(symbols.map(s => s.code)).subscribe(stockInfo => {
        renderTickerTable(stockInfo);
        console.log('');

        if (!backPrompt) {
            const questions = [
                {
                    type: 'confirm',
                    name: 'back',
                    message: `Back to menu?`
                }
            ];
            backPrompt = prompt.ask(questions).then(({ back }) => {
                subscription.unsubscribe();
                if (back) {
                    dispatch.screen.update({ name: 'menu' });
                } else {
                    dispatch.screen.update({ name: 'ticker' });
                }
            });
        }
    });
};
