const { toDate, calendarDiff, daysBetween } = require("./date_utils");

const UNITS = ["years", "months", "weeks", "days", "hours"];

// Total age in a single unit, rounded down. Throws on invalid input.
const ageIn = (dob, unit, date) => {
  const birthDate = toDate(dob, "DOB");
  const day = toDate(date, "date", true);
  if (!UNITS.includes(unit))
    throw new TypeError(`Invalid unit, use one of: ${UNITS.join(", ")}`);
  if (birthDate > day) throw new RangeError("DOB must be before the date");

  const totalDays = daysBetween(birthDate, day);
  switch (unit) {
    case "years":
      return calendarDiff(birthDate, day).years;
    case "months":
      return calendarDiff(birthDate, day).totalMonths;
    case "weeks":
      return Math.floor(totalDays / 7);
    case "days":
      return totalDays;
    case "hours":
      return totalDays * 24;
  }
};

// Returns false for a DOB after the date (not born yet).
const isAgeAtLeast = (dob, years, date) => {
  const birthDate = toDate(dob, "DOB");
  const day = toDate(date, "date", true);
  if (typeof years !== "number" || !(years >= 0))
    throw new TypeError("Invalid years");
  if (birthDate > day) return false;
  return calendarDiff(birthDate, day).years >= years;
};

module.exports = { ageIn, isAgeAtLeast };
