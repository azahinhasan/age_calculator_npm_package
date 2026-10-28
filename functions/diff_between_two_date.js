const formateDateMMDDYY = require("./formate_data_MMDDYY");
const parseDate = require("./parse_date");

// Try the general parser first, then the original MM/DD/YYYY reader so
// every input that worked before still works.
const toDate = (date) => {
  const parsed = parseDate(date);
  return parsed || formateDateMMDDYY(date);
};

const differentBetweenTowDate = (date1, date2) => {
  if (!date1 || !date2) {
    return "parameter is empty";
  }
  const dateTemp1 = toDate(date1);
  const dateTemp2 = toDate(date2);
  const diffTime = Math.abs(dateTemp2 - dateTemp1);
  // Round instead of ceil so a 23h/25h daylight-saving day still counts as 1.
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  return {
    milliseconds: diffTime,
    days: diffDays,
  };
};

module.exports = differentBetweenTowDate;
