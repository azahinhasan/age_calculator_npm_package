const parseDate = require("./parse_date");

const DAY_MS = 86400000;

const isLeapYear = (year) => {
  if (!Number.isInteger(year)) throw new TypeError("Invalid year");
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// month is 1-12
const daysInMonth = (year, month) => {
  if (!Number.isInteger(year)) throw new TypeError("Invalid year");
  if (!Number.isInteger(month) || month < 1 || month > 12)
    throw new TypeError("Invalid month");
  return new Date(year, month, 0).getDate();
};

// Parses a date for the newer functions, which throw instead of returning
// error strings. An empty value means today.
const toDate = (input, name, optional) => {
  if (input == null || input === "") {
    if (optional) return parseDate(new Date());
    throw new TypeError(`${name} is required`);
  }
  const date = parseDate(input);
  if (!date) throw new TypeError(`Invalid ${name}`);
  return date;
};

// Compare in UTC so daylight saving changes can't add or remove a day.
const daysBetween = (from, to) =>
  Math.round(
    (Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) -
      Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())) /
      DAY_MS
  );

// Adds months, clamping to the end of short months (Jan 31 + 1 month = Feb 28).
const addMonths = (date, months) => {
  const year = date.getFullYear() + Math.floor((date.getMonth() + months) / 12);
  const month = (((date.getMonth() + months) % 12) + 12) % 12;
  const lastDay = new Date(year, month + 1, 0).getDate();
  return new Date(year, month, Math.min(date.getDate(), lastDay));
};

// Calendar difference between two dates where start <= end.
// addMonths(start, totalMonths) + days always lands exactly on end.
const calendarDiff = (start, end) => {
  let totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) totalMonths--;

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    days: daysBetween(addMonths(start, totalMonths), end),
    totalMonths,
  };
};

// The day a birthday falls on in a given year. Feb 29 birthdays fall on
// Mar 1 in non-leap years, which is also the day ageIs counts a new year.
const birthdayInYear = (dob, year) => {
  if (dob.getMonth() === 1 && dob.getDate() === 29 && !isLeapYear(year))
    return new Date(year, 2, 1);
  return new Date(year, dob.getMonth(), dob.getDate());
};

module.exports = {
  isLeapYear,
  daysInMonth,
  toDate,
  daysBetween,
  addMonths,
  calendarDiff,
  birthdayInYear,
};
