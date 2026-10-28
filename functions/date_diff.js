const { toDate, calendarDiff, daysBetween } = require("./date_utils");

const dateDiff = (date1, date2) => {
  const first = toDate(date1, "first date");
  const second = toDate(date2, "second date");
  const [start, end] = first <= second ? [first, second] : [second, first];

  const { years, months, days, totalMonths } = calendarDiff(start, end);
  const totalDays = daysBetween(start, end);

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks: Math.floor(totalDays / 7),
    totalDays,
    totalHours: totalDays * 24,
  };
};

module.exports = dateDiff;
