import { isValid } from 'date-fns';

export const dateOr = (date: Date | void, def: Date): Date =>
  date && isValid(date) ? date : def;

export const anyTruthy = (arr: any[]) => arr.some((item) => Boolean(item)); // tslint:disable-line
