const parseDate = require("./parse_date");
const { calendarDiff } = require("./date_utils");

const ageIs = (dob, startDate) => {
  const birthDate = dob ? parseDate(dob) : null;
  if (!birthDate) return "Invalid DOB Date";

  const today = startDate ? parseDate(startDate) : parseDate(new Date());
  if (!today) return "Invalid Start Date Date";
  if (birthDate > today) return "DOB must be bigger then start date";

  const { years, months, days } = calendarDiff(birthDate, today);
  return {
    year: years,
    month: months,
    day: days,
  };
};

module.exports = ageIs;
