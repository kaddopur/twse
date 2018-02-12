#!/usr/bin/env node

import '@babel/polyfill';
import { renderWelcomeScreen } from './screens';

const run = async () => {
    renderWelcomeScreen();
};

run();
