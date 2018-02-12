import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';
import Table from 'cli-table2';
import { getStockInfo } from 'twse';
import numeral from 'numeral';

export const renderWelcomeScreen = () => {
    clear();
    console.log(
        chalk.red(
            figlet.textSync('twse', {
                horizontalLayout: 'full',
                font: 'Ogre'
            })
        )
    );
};

export const renderTickerScreen = async () => {
    clear();
    const stockInfo = await getStockInfo(['2888']);
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
            { content: numeral(stock.z).format('0.00'), hAlign: 'right' },
            {
                content: numeral(stock.z - stock.y).format('0.00'),
                hAlign: 'right'
            },
            {
                content: numeral((stock.z - stock.y) / stock.y).format(
                    '+0.00%'
                ),
                hAlign: 'right'
            },
            {
                content: numeral(stock.tv).format('0,0'),
                hAlign: 'right'
            },
            { content: numeral(stock.v).format('0,0'), hAlign: 'right' },
            { content: numeral(stock.h).format('0.00'), hAlign: 'right' },
            { content: numeral(stock.l).format('0.00'), hAlign: 'right' },
            {
                content: numeral((stock.h - stock.l) / stock.y).format(
                    '+0.00%'
                ),
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
