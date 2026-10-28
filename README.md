# @azahinhasan/age-calculator

[![npm version](https://img.shields.io/npm/v/@azahinhasan/age-calculator.svg)](https://www.npmjs.com/package/@azahinhasan/age-calculator)
[![test](https://github.com/azahinhasan/age_calculator_npm_package/actions/workflows/test.yml/badge.svg)](https://github.com/azahinhasan/age_calculator_npm_package/actions/workflows/test.yml)
[![license](https://img.shields.io/npm/l/@azahinhasan/age-calculator.svg)](LICENSE)

A small, dependency-free library to calculate age from a date of birth, find a date of birth from an age, and work with date differences and birthdays. Includes TypeScript types.

## Install

```bash
npm install @azahinhasan/age-calculator
```

## Quick start

```js
const { ageIs, dobIs, nextBirthday } = require("@azahinhasan/age-calculator");
// or: import { ageIs, dobIs, nextBirthday } from "@azahinhasan/age-calculator";

ageIs("05/10/1990", "05/01/2024");        // { year: 33, month: 11, day: 21 }
dobIs({ year: 1 }, "11/17/2021");         // Date: Nov 17 2020
nextBirthday("05/10/1990", "05/01/2024"); // { date: Date(May 10 2024), daysLeft: 9, age: 34 }
```

## Date input

Every function accepts any of these as a date:

| Input | Example |
| --- | --- |
| `Date` object | `new Date(2021, 4, 5)` |
| `MM/DD/YYYY` string | `"05/05/2021"` or `"5/5/2021"` |
| `YYYY-MM-DD` string | `"2021-05-05"` |
| ISO date-time string | `"2024-07-26T18:00:00.000Z"` |
| Timestamp (ms) | `1620172800000` |

Only the calendar date is used; the time of day is ignored. Dates are read in the local timezone, so `"2021-05-05"` is May 5 everywhere.

When the optional date argument is left out, today is used.

## API

### `ageIs(dob, startDate?)`

Age on `startDate` as `{ year, month, day }`.

```js
ageIs("05/05/2021", "05/05/2022"); // { year: 1, month: 0, day: 0 }
ageIs("2020-02-10", "2021-03-05"); // { year: 1, month: 0, day: 23 }
ageIs("05/05/2021");               // age today
```

Returns an error string for invalid input: `"Invalid DOB Date"`, `"Invalid Start Date Date"`, or `"DOB must be bigger then start date"` when the DOB is after the start date.

### `dobIs(age, startDate?)`

Date of birth for someone who is `age` old on `startDate`. `age` is `{ year?, month?, day? }` with non-negative numbers. Returns a `Date`.

```js
dobIs({ year: 1 }, "11/17/2021");                     // Nov 17 2020
dobIs({ year: 1, month: 2, day: 10 }, "06/15/2024");  // Apr 05 2023
```

Returns `"Invalid Age Date"` or `"Invalid Start Date"` for invalid input.

### `dateDiff(date1, date2)`

Difference between two dates, in any order.

```js
dateDiff("01/15/2020", "03/20/2021");
// {
//   years: 1, months: 2, days: 5,
//   totalMonths: 14, totalWeeks: 61, totalDays: 430, totalHours: 10320
// }
```

### `ageIn(dob, unit, date?)`

Total age in one unit, rounded down. `unit` is `"years"`, `"months"`, `"weeks"`, `"days"` or `"hours"`.

```js
ageIn("01/15/2020", "weeks", "03/20/2021");  // 61
ageIn("01/15/2020", "months", "03/20/2021"); // 14
```

### `isAgeAtLeast(dob, years, date?)`

Whether someone is at least `years` old on `date`. Useful for age checks.

```js
isAgeAtLeast("05/10/2006", 18, "05/10/2024"); // true
isAgeAtLeast("05/10/2006", 18, "05/09/2024"); // false
```

Returns `false` if the DOB is after `date`.

### `nextBirthday(dob, fromDate?)`

The next birthday on or after `fromDate`.

```js
nextBirthday("05/10/1990", "05/01/2024");
// { date: Date(May 10 2024), daysLeft: 9, age: 34 }
```

`daysLeft` is `0` when `fromDate` is the birthday. `age` is the age the person turns on that day.

### `isBirthday(dob, date?)`

Whether `date` is the person's birthday.

```js
isBirthday("05/10/1990", "05/10/2024"); // true
```

### `addToDate(date, { years?, months?, days? })`

Adds whole years, months and days to a date. Use negative numbers to subtract. Returns a `Date`.

```js
addToDate("01/31/2021", { months: 1 });            // Feb 28 2021
addToDate("03/01/2021", { years: -1, days: -1 });  // Feb 29 2020
```

Months are added first. If the day doesn't exist in the resulting month, the last day of that month is used.

### `isLeapYear(year)` and `daysInMonth(year, month)`

```js
isLeapYear(2024);     // true
daysInMonth(2023, 2); // 28 (month is 1-12)
```

### `differentBetweenTowDate(date1, date2)`

> Deprecated: use `dateDiff` instead. Kept so existing code keeps working.

```js
differentBetweenTowDate("01/01/2021", "01/05/2021"); // { milliseconds: 345600000, days: 4 }
```

Returns `"parameter is empty"` if either date is missing.

## Error handling

- `ageIs`, `dobIs` and `differentBetweenTowDate` **return an error string** for invalid input, as they always have:

  ```js
  const age = ageIs(input);
  if (typeof age === "string") {
    // invalid input, `age` is the error message
  }
  ```

- All other functions **throw** a `TypeError` for invalid input (or a `RangeError` from `ageIn` when the DOB is after the date):

  ```js
  try {
    isAgeAtLeast(input, 18);
  } catch (error) {
    // error.message: "Invalid DOB"
  }
  ```

## How ages are counted

- An age is whole years, then whole months, then the remaining days. Adding the result back to the DOB with `addToDate` gives the original date.
- Someone born on **Feb 29** has their birthday on **Mar 1** in non-leap years. `ageIs`, `isAgeAtLeast`, `nextBirthday` and `isBirthday` all follow this rule.
- Daylight saving changes never add or remove a day.

## TypeScript

Types are included. The newer functions are fully typed. `ageIs`, `dobIs` and `differentBetweenTowDate` return `any` because they can return either a result or an error string.

```ts
import { dateDiff, type DateDiff } from "@azahinhasan/age-calculator";

const diff: DateDiff = dateDiff("2020-01-15", new Date());
```

## Changelog

### 1.3.0

- **New:** `dateDiff`, `ageIn`, `isAgeAtLeast`, `nextBirthday`, `isBirthday`, `addToDate`, `isLeapYear`, `daysInMonth`.
- **New:** TypeScript types.
- **Fixed:** `ageIs` counted the leftover days wrong in some cases, especially for DOBs in February of a leap year.
- **Fixed:** `dobIs` returned a date one day too late. It now matches `ageIs`.
- **Fixed:** `dobIs` now returns `"Invalid Age Date"` for negative ages.
- **Fixed:** `differentBetweenTowDate` now accepts `Date` objects, ISO strings and non-padded dates, and no longer counts a daylight-saving day as two days.
- **Fixed:** `"YYYY-MM-DD"` strings were off by one day in timezones behind UTC.
- No breaking changes: function names, arguments, return shapes and error messages are unchanged.

## License

[MIT](LICENSE) © Ashak Zahin Hasan
