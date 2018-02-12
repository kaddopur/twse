import Configstore from 'configstore';
import pkg from '../package.json';

const conf = new Configstore(pkg.name, {
    symbols: []
});

export const getSymbols = () => conf.get('symbols') || [];
export const setSymbols = symbols => conf.set('symbols', symbols);
