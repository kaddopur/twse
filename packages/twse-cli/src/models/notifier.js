const notifier = {
    // state: {
    //     notifiers: {
    //         '0061': {
    //             cost: 18.95,
    //             share: 20000,
    //             conditions: [
    //                 {
    //                     type: '>=',
    //                     value: 19.16
    //                 },
    //                 {
    //                     type: '<=',
    //                     value: 18.5
    //                 },
    //                 {
    //                     type: '%>=',
    //                     value: 0.05
    //                 },
    //                 {
    //                     type: '%<=',
    //                     value: 0.05
    //                 }
    //             ]
    //         }
    //     }
    // },
    state: {
        notifiers: {}
    },
    reducers: {
        add(state, payload) {
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

            if (!code) {
                return state;
            }

            delete notifiers[code];

            return { ...state, notifiers };
        },
        addCondition(state, payload) {
            const { code, condition: { type, value } = {} } = payload;

            if (!code || !type || !value) {
                return state;
            }

            const { notifiers, notifiers: { [code]: { conditions = [] } = {} } = {} } = state;
            const parsedValue = parseFloat(value);
            const conditionExist = conditions.find(entry => {
                return entry.type === type && entry.value === parsedValue;
            });

            if (conditionExist) {
                return state;
            }

            return {
                ...state,
                notifiers: {
                    ...notifiers,
                    [code]: {
                        ...(notifiers[code] || {}),
                        conditions: [...conditions, { type, value: parsedValue }]
                    }
                }
            };
        },
        updateCondition(state, payload) {
            const { code, index, condition } = payload;

            if (!code || !Number.isInteger(index)) {
                return state;
            }

            const { notifiers = {}, notifiers: { [code]: { conditions = [] } = {} } = {} } = state;

            if (!notifiers[code]) {
                return state;
            }

            return {
                ...state,
                notifiers: {
                    ...notifiers,
                    [code]: {
                        ...(notifiers[code] || {}),
                        conditions: [
                            ...conditions.slice(0, index),
                            {
                                ...conditions[index],
                                ...condition
                            },
                            ...conditions.slice(index + 1)
                        ]
                    }
                }
            };
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
                    return notifier !== `${entry.type} ${entry.value || entry.value}`;
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
                                    return rhs.value - lhs.value;
                                case '%>=':
                                    return rhs.value - lhs.value;
                                case '%<=':
                                    return lhs.value - rhs.value;
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
