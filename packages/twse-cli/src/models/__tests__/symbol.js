import SymbolModel from '../symbol';

describe('[TWSE-CLI][Model] Symbol', () => {
    describe('initial state', () => {
        it('should have correct initial state', () => {
            const { state } = SymbolModel;
            expect(state).toEqual({ symbols: [] });
        });
    });

    describe('reducers', () => {
        describe('#add', () => {
            const { reducers: { add } } = SymbolModel;

            it('should be an Function', () => {
                expect(add).toBeInstanceOf(Function);
            });

            it('should be no-op for duplicate symbol code', () => {
                const mockState = { symbols: [{ code: 'mockCode', name: 'mockName' }] };
                const newState = add(mockState, { code: 'mockCode' });

                expect(newState).toBe(mockState);
            });

            it('should return new state and add new symbol', () => {
                const mockState = { symbols: [{ code: 'mockCode', name: 'mockName' }] };
                const newState = add(mockState, { code: 'newCode', name: 'newName' });

                expect(newState).not.toBe(mockState);
                expect(newState.symbols).toEqual([
                    { code: 'mockCode', name: 'mockName' },
                    { code: 'newCode', name: 'newName' }
                ]);
            });
        });

        describe('#remove', () => {
            const { reducers: { remove } } = SymbolModel;

            it('should be an Function', () => {
                expect(remove).toBeInstanceOf(Function);
            });

            it('should return new state but leave symbols untouched for non exist target symbol', () => {
                const mockState = { symbols: [{ code: 'mockCode', name: 'mockName' }] };
                const newState = remove(mockState, { code: 'notExistCode' });

                expect(newState).not.toBe(mockState);
                expect(newState.symbols).toEqual([{ code: 'mockCode', name: 'mockName' }]);
            });

            it('should return new state with target symbol removed', () => {
                const mockState = { symbols: [{ code: 'mockCode', name: 'mockName' }] };
                const newState = remove(mockState, { code: 'mockCode' });

                expect(newState).not.toBe(mockState);
                expect(newState.symbols).toEqual([]);
            });
        });
    });

    describe('selectors', () => {
        describe('#getSymbols', () => {
            const { selectors: { getSymbols } } = SymbolModel;

            it('should be an Function', () => {
                expect(getSymbols).toBeInstanceOf(Function);
            });

            it('should return correct symbols', () => {
                const mockSymbols = ['mockSymbol'];
                const mockState = { symbols: mockSymbols };

                expect(getSymbols(mockState)).toBe(mockSymbols);
            });
        });
    });
});
