import { isSameDayAs, isSameMonthAs, getDaysInMonth } from './calendar';

describe('Date Picker Helper Functions', () => {
  describe('isSameDayAs', () => {
    it('should return true if the dates match', () => {
      const date = new Date('01/01/2011');
      expect(isSameDayAs(date, date)).toBe(true);
    });
    it('should return false if the dates do not match', () => {
      const date = new Date('01/01/2011');
      const diffDate = new Date('01/02/2011');
      expect(isSameDayAs(date, diffDate)).toBe(false);
    });
  });
  describe('isSameMonthAs', () => {
    it("should return true if the date's month matches", () => {
      const date = new Date('01/01/2011');
      expect(isSameMonthAs(date, date)).toBe(true);
    });
    it("should return true if the date's month does not match", () => {
      const date = new Date('01/01/2011');
      const diffDate = new Date('02/01/2011');
      expect(isSameMonthAs(date, diffDate)).toBe(false);
    });
  });
  describe('getDaysInMonth', () => {
    it("should return true if the date array for the designated month matches the month's days", () => {
      const date = new Date('01/01/2019');
      const expected = [
        [
          new Date('2018-12-30T05:00:00.000Z'),
          new Date('2018-12-31T05:00:00.000Z'),
          new Date('2019-01-01T05:00:00.000Z'),
          new Date('2019-01-02T05:00:00.000Z'),
          new Date('2019-01-03T05:00:00.000Z'),
          new Date('2019-01-04T05:00:00.000Z'),
          new Date('2019-01-05T05:00:00.000Z'),
        ],
        [
          new Date('2019-01-06T05:00:00.000Z'),
          new Date('2019-01-07T05:00:00.000Z'),
          new Date('2019-01-08T05:00:00.000Z'),
          new Date('2019-01-09T05:00:00.000Z'),
          new Date('2019-01-10T05:00:00.000Z'),
          new Date('2019-01-11T05:00:00.000Z'),
          new Date('2019-01-12T05:00:00.000Z'),
        ],
        [
          new Date('2019-01-13T05:00:00.000Z'),
          new Date('2019-01-14T05:00:00.000Z'),
          new Date('2019-01-15T05:00:00.000Z'),
          new Date('2019-01-16T05:00:00.000Z'),
          new Date('2019-01-17T05:00:00.000Z'),
          new Date('2019-01-18T05:00:00.000Z'),
          new Date('2019-01-19T05:00:00.000Z'),
        ],
        [
          new Date('2019-01-20T05:00:00.000Z'),
          new Date('2019-01-21T05:00:00.000Z'),
          new Date('2019-01-22T05:00:00.000Z'),
          new Date('2019-01-23T05:00:00.000Z'),
          new Date('2019-01-24T05:00:00.000Z'),
          new Date('2019-01-25T05:00:00.000Z'),
          new Date('2019-01-26T05:00:00.000Z'),
        ],
        [
          new Date('2019-01-27T05:00:00.000Z'),
          new Date('2019-01-28T05:00:00.000Z'),
          new Date('2019-01-29T05:00:00.000Z'),
          new Date('2019-01-30T05:00:00.000Z'),
          new Date('2019-01-31T05:00:00.000Z'),
          new Date('2019-02-01T05:00:00.000Z'),
          new Date('2019-02-02T05:00:00.000Z'),
        ],
      ];
      const calendarDayArray = getDaysInMonth(date);
      expect(calendarDayArray).toEqual(expected);
    });
  });
});
