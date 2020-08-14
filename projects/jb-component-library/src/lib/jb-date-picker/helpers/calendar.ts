import {
  addDays,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

export const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const isSameDayAs = (day: Date, comparedTo: Date): boolean => {
  return isSameDay(day, comparedTo);
};

export const isSameMonthAs = (month: Date, comparedTo: Date): boolean => {
  return isSameMonth(month, startOfMonth(comparedTo));
};

// Returns an array of dates that encompases the selected month
export const getDaysInMonth = (month: Date): Date[][] => {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const rows = [];

  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      days.push(day);
      day = addDays(day, 1);
    }
    rows.push(days);
    days = [];
  }
  return rows;
};

export const flatten = <T>(array: T[][]): T[] => {
  return [].concat(...array);
};
