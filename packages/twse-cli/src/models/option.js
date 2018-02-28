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
        update(state, payload) {
            return { ...state, ...payload };
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
