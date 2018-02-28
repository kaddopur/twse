const option = {
    state: {
        order: ['invertColor'],
        options: {
            invertColor: {
                title: 'Invert color',
                value: false
            }
        }
    },
    reducers: {
        updateOption(state, payload) {
            return {
                ...state,
                options: {
                    ...state.options,
                    ...payload
                }
            };
        }
    },
    selectors: {
        getOrder(state = {}) {
            return state.order;
        },
        getOptions(state = {}) {
            return state.options;
        }
    }
};

export default option;
