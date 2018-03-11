import NotifierModel from '../notifier';

describe('[TWSE-CLI][Model] Notifier', () => {
    describe('initial state', () => {
        it('should have correct initial state', () => {
            const { state } = NotifierModel;
            expect(state).toEqual({ notifiers: {} });
        });
    });

    describe('reducers', () => {
        describe('#init', () => {
            const { reducers: { init } } = NotifierModel;

            it('should be an Function', () => {
                expect(init).toBeInstanceOf(Function);
            });

            it('should create a new notifier with symbol code', () => {
                const mockState = { notifiers: {} };
                const mockPayload = { code: 'mockCode' };
                const newState = init(mockState, mockPayload);

                expect(newState).not.toBe(mockState);
                expect(newState).toHaveProperty('notifiers.mockCode', {
                    cost: null,
                    share: null,
                    conditions: []
                });
            });

            it('should be no-np without code in payload', () => {
                const mockState = { notifiers: {} };
                const mockPayload = {};
                const newState = init(mockState, mockPayload);

                expect(newState).toBe(mockState);
                expect(newState).toEqual(mockState);
            });
        });

        describe('#remove', () => {
            const { reducers: { remove } } = NotifierModel;

            it('should be an Function', () => {
                expect(remove).toBeInstanceOf(Function);
            });

            it('should remove notifier with symbol code', () => {
                const mockState = { notifiers: { mockCode: 'mockNotifier' } };
                const mockPayload = { code: 'mockCode' };
                const newState = remove(mockState, mockPayload);

                expect(newState).not.toBe(mockState);
                expect(newState).not.toHaveProperty('mockCode');
            });

            it('should be no-np without code in payload', () => {
                const mockState = { notifiers: { mockCode: 'mockNotifier' } };
                const mockPayload = {};
                const newState = remove(mockState, mockPayload);

                expect(newState).toBe(mockState);
                expect(newState).toEqual(mockState);
            });
        });
    });

    xdescribe('selectors', () => {
        describe('#getScreen', () => {
            const { selectors: { getScreen } } = NotifierModel;

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
