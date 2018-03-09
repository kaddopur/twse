import OptionModel from '../option';

describe('[TWSE-CLI][Model] Option', () => {
    describe('initial state', () => {
        it('should hvae order contains only valid options', () => {
            const { state } = OptionModel;
            expect(state).toHaveProperty('order', expect.any(Array));
            expect(state).toHaveProperty('options', expect.any(Object));
            expect(Object.keys(state.options)).toEqual(expect.arrayContaining(state.order));
        });
    });

    describe('reducers', () => {
        describe('#updateOption', () => {
            const { reducers: { updateOption } } = OptionModel;

            it('should be an Function', () => {
                expect(updateOption).toBeInstanceOf(Function);
            });

            it('should return new state and update options correctly', () => {
                const mockColoring = { value: 'mockValue' };
                const mockOptions = { coloring: mockColoring };
                const mockState = {
                    foo: 'bar',
                    options: mockOptions
                };

                const newState = updateOption(mockState, { optionKey: 'coloring', value: 'newColoring' });
                expect(newState).not.toBe(mockState);
                expect(newState.options).not.toBe(mockOptions);
                expect(newState.options.coloring).not.toBe(mockColoring);
                expect(newState.options.coloring.value).toEqual('newColoring');
            });
        });
    });

    describe('selectors', () => {
        describe('#getOrder', () => {
            const { selectors: { getOrder } } = OptionModel;

            it('should be an Function', () => {
                expect(getOrder).toBeInstanceOf(Function);
            });

            it('should return order', () => {
                const mockOrder = ['coloring', 'locale'];
                const mockState = {
                    order: mockOrder
                };
                expect(getOrder(mockState)).toBe(mockOrder);
            });
        });

        describe('#getOptions', () => {
            const { selectors: { getOptions } } = OptionModel;

            it('should be an Function', () => {
                expect(getOptions).toBeInstanceOf(Function);
            });

            it('should return options', () => {
                const mockOptions = { coloring: {} };
                const mockState = {
                    options: mockOptions
                };
                expect(getOptions(mockState)).toBe(mockOptions);
            });
        });
    });
});
