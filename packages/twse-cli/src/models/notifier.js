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

            state.notifiers[symbol].conditions = [
                ...conditions.slice(0, index),
                {
                    ...conditions[index],
                    ...newCondition
                },
                ...conditions.slice(index + 1)
            ];

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
