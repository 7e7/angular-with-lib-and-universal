import { dateOr, anyTruthy } from './utils';

describe('utils', () => {
  describe('dateOr', () => {
    it('should return the passed in date if the date is valid', () => {
      const now = new Date();
      const defaultDate = new Date('01/01/2000');
      expect(dateOr(now, defaultDate)).toEqual(now);
    });
    it('should return the default date if the date is not valid', () => {
      const invalidDate = new Date('');
      const defaultDate = new Date('01/01/2000');
      expect(dateOr(invalidDate, defaultDate)).toEqual(defaultDate);
    });
    it('should return the default date if the passed in date is void', () => {
      const defaultDate = new Date('01/01/2000');
      expect(dateOr(undefined, defaultDate)).toEqual(defaultDate);
      expect(dateOr(null, defaultDate)).toEqual(defaultDate);
    });
  });
  describe('anyTruthy', () => {
    it('should return false when all values of an arr are falsey', () => {
      const expected = false;
      const actual = anyTruthy([false, false, false]);
      expect(actual).toEqual(expected);
    });
    it('should return false when arr is empty', () => {
      const expected = false;
      const actual = anyTruthy([]);
      expect(actual).toEqual(expected);
    });
    it('should return true when one or more values of an arr are truthy', () => {
      const expected = true;
      const actual = anyTruthy([true, false, false]);
      expect(actual).toEqual(expected);
    });
  });
});
