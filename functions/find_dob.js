const parseDate = require("./parse_date");

const dobIs = (age, startDate) => {
  const fromDate = startDate ? parseDate(startDate) : parseDate(new Date());
  if (!fromDate) return "Invalid Start Date";
  if (
    !age ||
    (age.year && typeof age.year !== "number") ||
    (age.month && typeof age.month !== "number") ||
    (age.day && typeof age.day !== "number") ||
    age.year < 0 ||
    age.month < 0 ||
    age.day < 0
  )
    return "Invalid Age Date";

  return new Date(
    fromDate.getFullYear() - (age.year ?? 0),
    fromDate.getMonth() - (age.month ?? 0),
    fromDate.getDate() - (age.day ?? 0)
  );
};

module.exports = dobIs;
