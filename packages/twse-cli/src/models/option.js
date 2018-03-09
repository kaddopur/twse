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
            const { optionKey, value } = payload;

            return {
                ...state,
                options: {
                    ...state.options,
                    [optionKey]: {
                        ...state.options[optionKey],
                        value
                    }
                }
            };
        }
    },
    selectors: {
        getOrder(state) {
            return state.order;
        },
        getOptions(state) {
            return state.options;
        }
    }
};

export default option;
