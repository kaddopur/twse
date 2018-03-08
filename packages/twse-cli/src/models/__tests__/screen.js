import ScreenModel from '../screen';

describe('[TWSE-CLI][Model] Screen', () => {
    describe('initial state', () => {
        it('should have correct initial state', () => {
            const { state } = ScreenModel;
            expect(state).toEqual({ name: 'menu', params: {} });
        });
    });

    describe('reducers', () => {
        describe('#update', () => {
            const { reducers: { update } } = ScreenModel;

            it('should be an Function', () => {
                expect(update).toBeInstanceOf(Function);
            });

            it('should return new state with payload updated', () => {
                const mockState = {
                    name: 'menu',
                    params: { baz: 'baz' }
                };
                const mockPayload = {
                    name: 'mockName',
                    params: {},
                    foo: 'bar'
                };
                const newState = update(mockState, mockPayload);

                expect(newState).not.toBe(mockState);
                expect(newState).toEqual(mockPayload);
            });
        });
    });

    describe('selectors', () => {
        describe('#getScreen', () => {
            const { selectors: { getScreen } } = ScreenModel;

            it('should be an Function', () => {
                expect(getScreen).toBeInstanceOf(Function);
            });

            it('should return whole state as screen', () => {
                const mockState = {
                    name: 'menu',
                    foo: 'bar'
                };
                expect(getScreen(mockState)).toBe(mockState);
            });
        });
    });
});
