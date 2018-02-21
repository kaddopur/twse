import Rx from 'rxjs';
import getStockInfo from './getStockInfo';

const DEFAULT_API_INTERVAL_MS = 5000;

export default (symbols = [], interval = DEFAULT_API_INTERVAL_MS) =>
    Rx.Observable.interval(interval)
        .startWith(0)
        .flatMap(() => getStockInfo(symbols));
