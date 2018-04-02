function migrateConditonAddValueField(state) {
    const { notifier = {}, notifier: { notifiers = [] } = {} } = state;

    const newNotifiers = Object.entries(notifiers).reduce((acc, [key, value]) => {
        acc[key] = {
            ...value,
            conditions: value.conditions.map(cond => {
                const { value, price, rate } = cond;
                const oldValue = price !== undefined ? price : rate;
                const newCond = {
                    ...cond,
                    value: value !== undefined ? value : oldValue
                };

                delete newCond.price;
                delete newCond.rate;

                return newCond;
            })
        };

        return acc;
    }, {});

    return {
        ...state,
        notifier: {
            ...notifier,
            notifiers: newNotifiers
        }
    };
}

export default state => {
    const migrations = [migrateConditonAddValueField];
    return migrations.reduce((acc, migrate) => migrate(acc), state);
};
