const { toDate, addMonths } = require("./date_utils");

// Adds (or with negative values, subtracts) years, months and days.
// Months are added first and clamp to the end of short months.
const addToDate = (date, duration) => {
  const start = toDate(date, "date");
  const { years = 0, months = 0, days = 0 } = duration || {};
  for (const [name, value] of Object.entries({ years, months, days })) {
    if (!Number.isInteger(value)) throw new TypeError(`Invalid ${name}`);
  }

  const result = addMonths(start, years * 12 + months);
  result.setDate(result.getDate() + days);
  return result;
};

module.exports = addToDate;
