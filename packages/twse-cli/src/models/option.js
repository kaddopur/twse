const option = {
    state: {
        order: ['coloring'],
        options: {
            coloring: {
                title: 'Coloring',
                value: 'Taiwan',
                choices: ['Taiwan', 'global']
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
