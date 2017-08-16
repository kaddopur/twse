import Stock from '../src/stock';

describe('Stock', () => {
  describe('properties', () => {
    let stockFoo;

    beforeEach(() => {
      stockFoo = new Stock('1234');
    });

    test('it should be constructed with new keyword', () => {
      expect(stockFoo).toBeInstanceOf(Stock);
    });

    test('it should have correct properties', () => {
      expect(stockFoo).toHaveProperty('stockNo', '1234');
    });
  });

  describe('#fetchData', () => {
    test('it should fetch proper stock data', () => {
      const stockFoo = new Stock('2887');

      console.log('1');
      stockFoo.fetchData().then(data => {
        console.log('data', data);
        done();
      });
    });
  });
});
