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
                    condition: {
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
        });

        describe('#updateCondition', () => {
            const { reducers: { updateCondition } } = NotifierModel;

            it('should be an Function', () => {
                expect(updateCondition).toBeInstanceOf(Function);
            });

            it('should update target code condition', () => {
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
                    index: 0,
                    condition: {
                        firedAt: 'mockFiredAt'
                    }
                };
                const newState = updateCondition(mockState, mockPayload);

                expect(newState).not.toBe(mockState);
                expect(newState.notifiers).not.toBe(mockState.notifiers);
                expect(newState.notifiers.mockCode).not.toBe(mockState.notifiers.mockCode);
                expect(newState.notifiers.mockCode.conditions).not.toBe(mockState.notifiers.mockCode.conditions);
                expect(newState.notifiers.mockCode.conditions[0]).not.toBe(mockState.notifiers.mockCode.conditions[0]);
                expect(newState.notifiers.mockCode.conditions[0]).toEqual({
                    type: 'mockType',
                    value: 1.23,
                    firedAt: 'mockFiredAt'
                });
            });

            it('should be no-op without code in payload', () => {
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
                    index: 0,
                    condition: {
                        firedAt: 'mockFiredAt'
                    }
                };
                const newState = updateCondition(mockState, mockPayload);

                expect(newState).toBe(mockState);
                expect(newState).toEqual(mockState);
            });

            it('should be no-op without valid index in payload', () => {
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
                        firedAt: 'mockFiredAt'
                    }
                };
                const newState = updateCondition(mockState, mockPayload);

                expect(newState).toBe(mockState);
                expect(newState).toEqual(mockState);
            });

            it('should be no-op if target code is not found', () => {
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
                    code: 'fooCode',
                    index: 0,
                    condition: {
                        firedAt: 'mockFiredAt'
                    }
                };
                const newState = updateCondition(mockState, mockPayload);

                expect(newState).toBe(mockState);
                expect(newState).toEqual(mockState);
            });
        });

        describe('#removeCondition', () => {
            const { reducers: { removeCondition } } = NotifierModel;

            it('should be an Function', () => {
                expect(removeCondition).toBeInstanceOf(Function);
            });

            it('should remove target code condition', () => {
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
                    notifier: 'mockType 1.23'
                };
                const newState = removeCondition(mockState, mockPayload);

                expect(newState).not.toBe(mockState);
                expect(newState.notifiers).not.toBe(mockState.notifiers);
                expect(newState.notifiers.mockCode).not.toBe(mockState.notifiers.mockCode);
                expect(newState.notifiers.mockCode.conditions).not.toBe(mockState.notifiers.mockCode.conditions);
                expect(newState.notifiers.mockCode.conditions).toEqual([]);
            });

            it('should be no-op without code in payload', () => {
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
                    notifier: 'mockType 1.23'
                };
                const newState = removeCondition(mockState, mockPayload);

                expect(newState).toBe(mockState);
                expect(newState).toEqual(mockState);
            });

            it('should be no-op without notifier in payload', () => {
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
                    code: 'fooCode'
                };
                const newState = removeCondition(mockState, mockPayload);

                expect(newState).toBe(mockState);
                expect(newState).toEqual(mockState);
            });

            it('should be no-op if target code is not found', () => {
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
                    code: 'fooCode',
                    notifier: 'mockType 1.23'
                };
                const newState = removeCondition(mockState, mockPayload);

                expect(newState).toBe(mockState);
                expect(newState).toEqual(mockState);
            });
        });

        describe('#sortCondition', () => {
            const { reducers: { sortCondition } } = NotifierModel;

            it('should be an Function', () => {
                expect(sortCondition).toBeInstanceOf(Function);
            });

            it('should sort target code condition', () => {
                const mockState = {
                    notifiers: {
                        mockCode: {
                            cost: null,
                            share: null,
                            conditions: [
                                {
                                    type: '>=',
                                    value: 50
                                },
                                {
                                    type: '<=',
                                    value: 20
                                },
                                {
                                    type: '%>=',
                                    value: 0.05
                                },
                                {
                                    type: '%>=',
                                    value: 0.1
                                },
                                {
                                    type: '%<=',
                                    value: 0.1
                                },
                                {
                                    type: '%<=',
                                    value: 0.05
                                },

                                {
                                    type: '<=',
                                    value: 40
                                },
                                {
                                    type: '>=',
                                    value: 100
                                }
                            ]
                        }
                    }
                };
                const mockPayload = {
                    code: 'mockCode'
                };
                const newState = sortCondition(mockState, mockPayload);

                expect(newState).not.toBe(mockState);
                expect(newState.notifiers).not.toBe(mockState.notifiers);
                expect(newState.notifiers.mockCode).not.toBe(mockState.notifiers.mockCode);
                expect(newState.notifiers.mockCode.conditions).not.toBe(mockState.notifiers.mockCode.conditions);
                expect(newState.notifiers.mockCode.conditions).toEqual([
                    {
                        type: '>=',
                        value: 100
                    },
                    {
                        type: '>=',
                        value: 50
                    },
                    {
                        type: '<=',
                        value: 40
                    },
                    {
                        type: '<=',
                        value: 20
                    },
                    {
                        type: '%>=',
                        value: 0.1
                    },
                    {
                        type: '%>=',
                        value: 0.05
                    },
                    {
                        type: '%<=',
                        value: 0.05
                    },
                    {
                        type: '%<=',
                        value: 0.1
                    }
                ]);
            });

            it('should filter condition with unknown type', () => {
                const mockState = {
                    notifiers: {
                        mockCode: {
                            cost: null,
                            share: null,
                            conditions: [
                                {
                                    type: 'unknown',
                                    value: 10
                                }
                            ]
                        }
                    }
                };
                const mockPayload = {
                    code: 'mockCode'
                };
                const newState = sortCondition(mockState, mockPayload);

                expect(newState).not.toBe(mockState);
                expect(newState.notifiers).not.toBe(mockState.notifiers);
                expect(newState.notifiers.mockCode).not.toBe(mockState.notifiers.mockCode);
                expect(newState.notifiers.mockCode.conditions).not.toBe(mockState.notifiers.mockCode.conditions);
                expect(newState.notifiers.mockCode.conditions).toEqual([]);
            });

            it('should be no-op without code in payload', () => {
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
                const mockPayload = {};
                const newState = sortCondition(mockState, mockPayload);

                expect(newState).toBe(mockState);
                expect(newState).toEqual(mockState);
            });
        });

        describe('#cleanUpFiredAt', () => {
            const { reducers: { cleanUpFiredAt } } = NotifierModel;

            it('should be an Function', () => {
                expect(cleanUpFiredAt).toBeInstanceOf(Function);
            });

            it('should clean up firedAt for all conditions', () => {
                const mockState = {
                    notifiers: {
                        fooCode: {
                            cost: null,
                            share: null,
                            conditions: [
                                {
                                    type: 'mockType1',
                                    value: 1.23,
                                    firedAt: 'fooFiredAt1'
                                },
                                {
                                    type: 'mockType2',
                                    value: 1.23,
                                    firedAt: 'fooFiredAt2'
                                }
                            ]
                        },
                        barCode: {
                            cost: null,
                            share: null,
                            conditions: [
                                {
                                    type: 'mockType',
                                    value: 1.23,
                                    firedAt: 'barFiredAt'
                                }
                            ]
                        }
                    }
                };
                const newState = cleanUpFiredAt(mockState);

                expect(newState).not.toBe(mockState);
                expect(newState.notifiers).not.toBe(mockState.notifiers);
                expect(newState.notifiers).toEqual({
                    fooCode: {
                        cost: null,
                        share: null,
                        conditions: [
                            {
                                type: 'mockType1',
                                value: 1.23
                            },
                            {
                                type: 'mockType2',
                                value: 1.23
                            }
                        ]
                    },
                    barCode: {
                        cost: null,
                        share: null,
                        conditions: [
                            {
                                type: 'mockType',
                                value: 1.23
                            }
                        ]
                    }
                });
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
