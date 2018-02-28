const screen = {
    state: {
        name: 'menu',
        params: {}
    },
    reducers: {
        update(state, payload) {
            return { ...payload };
        }
    },
    selectors: {
        getScreen(state) {
            return state;
        }
    }
};

export default screen;
