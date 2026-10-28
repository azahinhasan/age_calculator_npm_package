/** A Date, a date string ("MM/DD/YYYY", "YYYY-MM-DD", ISO) or a timestamp. */
export type DateInput = Date | string | number;

export interface Age {
  year: number;
  month: number;
  day: number;
}

export interface Duration {
  years?: number;
  months?: number;
  days?: number;
}

export interface DateDiff {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
}

export interface NextBirthday {
  /** Date of the next birthday (today if today is the birthday). */
  date: Date;
  /** Days until the next birthday, 0 if it is today. */
  daysLeft: number;
  /** The age the person turns on that birthday. */
  age: number;
}

export type AgeUnit = "years" | "months" | "weeks" | "days" | "hours";

// The original functions are typed loosely so existing code keeps compiling.
// They return an error string instead of throwing on invalid input.

/** Age as `{ year, month, day }`, or an error string. */
export function ageIs(dob: any, startDate?: any): any;
/** Date of birth for an age as a `Date`, or an error string. */
export function dobIs(age: any, startDate?: any): any;
/** @deprecated Use `dateDiff` instead. Returns `{ milliseconds, days }`. */
export function differentBetweenTowDate(date1: any, date2: any): any;

// The newer functions throw a TypeError or RangeError on invalid input.

export function dateDiff(date1: DateInput, date2: DateInput): DateDiff;
export function nextBirthday(dob: DateInput, fromDate?: DateInput): NextBirthday;
export function isBirthday(dob: DateInput, date?: DateInput): boolean;
export function ageIn(dob: DateInput, unit: AgeUnit, date?: DateInput): number;
export function isAgeAtLeast(dob: DateInput, years: number, date?: DateInput): boolean;
export function addToDate(date: DateInput, duration: Duration): Date;
export function isLeapYear(year: number): boolean;
/** `month` is 1-12. */
export function daysInMonth(year: number, month: number): number;
