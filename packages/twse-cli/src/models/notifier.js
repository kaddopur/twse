const notifier = {
    // state: {
    //     notifiers: {
    //         '0061': {
    //             cost: 18.95,
    //             share: 20000,
    //             conditions: [
    //                 {
    //                     type: '>=',
    //                     price: 19.16
    //                 },
    //                 {
    //                     type: '<=',
    //                     price: 18.5
    //                 },
    //                 {
    //                     type: '%>=',
    //                     rate: 0.05
    //                 },
    //                 {
    //                     type: '%<=',
    //                     rate: 0.05
    //                 }
    //             ]
    //         }
    //     }
    // },
    state: {
        notifiers: {}
    },
    reducers: {
        init(state, payload) {
            const { code } = payload;

            if (!code) {
                return state;
            }

            return {
                ...state,
                notifiers: {
                    ...state.notifiers,
                    [code]: {
                        cost: null,
                        share: null,
                        conditions: []
                    }
                }
            };
        },
        remove(state, payload) {
            const { code } = payload;
            const { notifiers } = state;

            delete notifiers[code];

            return { ...state, notifiers };
        },
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

            return this['notifier/sortCondition'](state, { code: symbol });
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
                            [type === '>=' || type === '<=' ? 'price' : 'rate']: parseFloat(value)
                        }
                    ]
                };
            }

            return this['notifier/sortCondition'](state, { code });
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
            const order = ['>=', '<=', '%>=', '%<='];
            const { code } = payload;
            const { conditions = [] } = state.notifiers[code] || {};

            state.notifiers[code] = {
                ...state.notifiers[code],
                conditions: [
                    ...conditions.sort((lhs, rhs) => {
                        if (lhs.type === rhs.type) {
                            switch (lhs.type) {
                                case '>=':
                                case '<=':
                                    return rhs.price - lhs.price;
                                case '%>=':
                                    return rhs.rate - lhs.rate;
                                case '%<=':
                                    return lhs.rate - rhs.rate;
                                default:
                                    return 0;
                            }
                        }

                        return order.indexOf(lhs.type) - order.indexOf(rhs.type);
                    })
                ]
            };

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
