const notifier = {
    state: {
        notifiers: {
            '0061': {
                cost: 18.95,
                share: 20000,
                conditions: [
                    {
                        type: '>=',
                        price: 19.16
                    },
                    {
                        type: '<=',
                        price: 18.5
                    },
                    {
                        type: '%>=',
                        rate: 0.05
                    },
                    {
                        type: '%<=',
                        rate: 0.05
                    }
                ]
            }
        }
    },
    reducers: {
        updateCondition(state, payload) {
            const { symbol, index, newCondition } = payload;
            const { conditions } = state.notifiers[symbol];

            state.notifiers[symbol] = {
                ...state.notifiers[symbol],
                conditions: [
                    ...conditions.slice(0, index),
                    {
                        ...conditions[index],
                        ...newCondition
                    },
                    ...conditions.slice(index + 1)
                ]
            };

            return state;
        },
        addCondition(state, payload) {
            const { symbol, type, value } = payload;
            const code = symbol.split(' ')[0];

            if (!state.notifiers[code]) {
                state.notifiers = {
                    ...state.notifiers,
                    [code]: {}
                };
            }

            const { conditions = [] } = state.notifiers[code];
            const conditionExist = conditions.find(entry => notifier === `${entry.type} ${entry.price || entry.rate}`);

            if (!conditionExist) {
                state.notifiers[code] = {
                    ...state.notifiers[code],
                    conditions: [
                        ...conditions,
                        {
                            type,
                            [type === '>=' || type === '<=' ? 'price' : 'rate']: value
                        }
                    ]
                };
            }

            return state;
        },
        removeCondition(state, payload) {
            const { symbol, notifier } = payload;
            const code = symbol.split(' ')[0];
            const { conditions = [] } = state.notifiers[code] || {};

            if (conditions.length === 0) {
                return state;
            }

            state.notifiers[code] = {
                ...state.notifiers[code],
                conditions: conditions.filter(entry => {
                    return notifier !== `${entry.type} ${entry.price || entry.rate}`;
                })
            };

            return state;
        },
        sortCondition(state, payload) {
            return state;
        },
        cleanUpFiredAt(state) {
            Object.keys(state.notifiers).forEach(symbol => {
                const { conditions = [] } = state.notifiers[symbol];

                state.notifiers[symbol] = {
                    ...state.notifiers[symbol],
                    conditions: conditions.map(entry => {
                        const newEntry = { ...entry };

                        delete newEntry.firedAt;
                        return newEntry;
                    })
                };
            });

            return state;
        }
    },
    selectors: {
        getNotifiers(state = {}) {
            return state.notifiers || [];
        }
    }
};

export default notifier;
