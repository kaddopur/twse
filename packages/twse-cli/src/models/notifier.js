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

            const { notifiers = {}, notifiers: { [code]: { conditions = [] } = {} } = {} } = state;
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
            const { code, notifier: notifierOption } = payload;

            if (!code || !notifierOption) {
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
                        conditions: conditions.filter(entry => notifierOption !== `${entry.type} ${entry.value}`)
                    }
                }
            };
        },
        sortCondition(state, payload) {
            const order = ['>=', '<=', '%>=', '%<='];
            const { code } = payload;

            if (!code) {
                return state;
            }

            const { notifiers, notifiers: { [code]: { conditions = [] } = {} } = {} } = state;

            return {
                ...state,
                notifiers: {
                    ...notifiers,
                    [code]: {
                        ...(notifiers[code] || {}),
                        conditions: [
                            ...conditions.filter(entry => order.indexOf(entry.type) !== -1).sort((lhs, rhs) => {
                                if (lhs.type === rhs.type) {
                                    switch (lhs.type) {
                                        case '>=':
                                        case '<=':
                                        case '%>=':
                                            return rhs.value - lhs.value;
                                        case '%<=':
                                            return lhs.value - rhs.value;
                                    }
                                }

                                return order.indexOf(lhs.type) - order.indexOf(rhs.type);
                            })
                        ]
                    }
                }
            };
        },
        cleanUpFiredAt(state) {
            const { notifiers = {} } = state;
            const newNotifiers = {};

            Object.keys(notifiers).forEach(code => {
                const { conditions = [] } = notifiers[code];

                newNotifiers[code] = {
                    ...notifiers[code],
                    conditions: conditions.map(entry => {
                        const newEntry = { ...entry };
                        delete newEntry.firedAt;
                        return newEntry;
                    })
                };
            });

            return { ...state, notifiers: newNotifiers };
        }
    },
    selectors: {
        getNotifiers(state = {}) {
            return state.notifiers || [];
        }
    }
};

export default notifier;
