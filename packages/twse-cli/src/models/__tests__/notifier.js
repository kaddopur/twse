import NotifierModel from '../notifier';

describe('[TWSE-CLI][Model] Notifier', () => {
    describe('initial state', () => {
        it('should have correct initial state', () => {
            const { state } = NotifierModel;
            expect(state).toEqual({ notifiers: {} });
        });
    });

    describe('reducers', () => {
        describe('#add', () => {
            const { reducers: { add } } = NotifierModel;

            it('should be an Function', () => {
                expect(add).toBeInstanceOf(Function);
            });

            it('should create a new notifier with symbol code', () => {
                const mockState = { notifiers: {} };
                const mockPayload = { code: 'mockCode' };
                const newState = add(mockState, mockPayload);

                expect(newState).not.toBe(mockState);
                expect(newState).toHaveProperty('notifiers.mockCode', {
                    cost: null,
                    share: null,
                    conditions: []
                });
            });

            it('should be no-op without code in payload', () => {
                const mockState = { notifiers: {} };
                const mockPayload = {};
                const newState = add(mockState, mockPayload);

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

            it('should be no-op without code in payload', () => {
                const mockState = { notifiers: { mockCode: 'mockNotifier' } };
                const mockPayload = {};
                const newState = remove(mockState, mockPayload);

                expect(newState).toBe(mockState);
                expect(newState).toEqual(mockState);
            });
        });

        describe('#addCondition', () => {
            const { reducers: { addCondition } } = NotifierModel;

            it('should be an Function', () => {
                expect(addCondition).toBeInstanceOf(Function);
            });

            it('should add a new condition to target notifier', () => {
                const mockState = {
                    notifiers: {
                        mockCode: {
                            cost: null,
                            share: null,
                            conditions: []
                        }
                    }
                };
                const mockPayload = {
                    code: 'mockCode',
                    condition: {
                        type: 'mockType',
                        value: '1.23'
                    }
                };
                const newState = addCondition(mockState, mockPayload);

                expect(newState).not.toBe(mockState);
                expect(newState.notifiers).not.toBe(mockState.notifiers);
                expect(newState.notifiers.mockCode).not.toBe(mockState.notifiers.mockCode);
                expect(newState.notifiers.mockCode).toHaveProperty('conditions', [
                    {
                        type: 'mockType',
                        value: 1.23
                    }
                ]);
            });

            it('should be no-op if condition already exist', () => {
                const mockState = {
                    notifiers: {
                        mockCode: {
                            cost: null,
                            share: null,
                            conditions: [
                                {
                                    type: 'mockType',
                                    value: 1.23
                                }
                            ]
                        }
                    }
                };
                const mockPayload = {
                    code: 'mockCode',
                    condition: {
                        type: 'mockType',
                        value: '1.23'
                    }
                };
                const newState = addCondition(mockState, mockPayload);

                expect(newState).toBe(mockState);
                expect(newState).toEqual(mockState);
            });

            it('should be no-op without code in payload', () => {
                const mockState = {
                    notifiers: {
                        mockCode: {
                            cost: null,
                            share: null,
                            conditions: []
                        }
                    }
                };
                const mockPayload = {
                    condtion: {
                        type: 'mockType',
                        value: 'mockValue'
                    }
                };
                const newState = addCondition(mockState, mockPayload);

                expect(newState).toBe(mockState);
                expect(newState).toEqual(mockState);
            });

            it('should be no-op without condition in payload', () => {
                const mockState = {
                    notifiers: {
                        mockCode: {
                            cost: null,
                            share: null,
                            conditions: []
                        }
                    }
                };
                const mockPayload = {
                    code: 'mockCode'
                };
                const newState = addCondition(mockState, mockPayload);

                expect(newState).toBe(mockState);
                expect(newState).toEqual(mockState);
            });
        });
    });

    describe('selectors', () => {
        describe('#getNotifiers', () => {
            const { selectors: { getNotifiers } } = NotifierModel;

            it('should be an Function', () => {
                expect(getNotifiers).toBeInstanceOf(Function);
            });

            it('should return notifiers', () => {
                const mockNotifiers = { mockCode: 'mockNotifier' };
                const mockState = { notifiers: mockNotifiers };

                expect(getNotifiers(mockState)).toBe(mockNotifiers);
            });
        });
    });
});
