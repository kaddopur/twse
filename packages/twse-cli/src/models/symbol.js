const symbol = {
    state: {
        symbols: []
    },
    reducers: {
        add(state, payload) {
            const duplicate = state.symbols.find(symbol => symbol.code === payload.code);

            if (duplicate) {
                return state;
            }

            return {
                ...state,
                symbols: [...state.symbols, payload]
            };
        },
        remove(state, payload) {
            return {
                ...state,
                symbols: state.symbols.filter(s => s.code !== payload)
            };
        }
    },
    selectors: {
        getSymbols(state) {
            return state.symbols;
        }
    }
};

export default symbol;
