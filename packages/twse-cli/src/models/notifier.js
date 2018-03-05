const notifier = {
    state: {
        notifiers: [
            {
                symbol: '0061',
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
        ]
    },
    reducers: {},
    selectors: {
        getNotifiers(state = {}) {
            return state.notifiers || [];
        }
    }
};

export default notifier;
