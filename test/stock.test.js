import { getPriceInfo } from '../src/stock';

describe('Stock', () => {
  describe('#getPriceInfo', () => {
    test('it should a function', () => {
      expect(getPriceInfo).toBeInstanceOf(Function);
    });

    test('it should throw error for invalid stockNo', () => {
      expect(() => {
        getPriceInfo();
      }).toThrow(/getPriceInfo/);
    });
  });
});
