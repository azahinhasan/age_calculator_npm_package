const formateDateMMDDYY = require("./formate_data_MMDDYY");

const differentBetweenTowDate = (date1, date2) => {
  const dateTemp1 = formateDateMMDDYY(date1) || 0;
  const dateTemp2 = formateDateMMDDYY(date2) || 0;
  if (dateTemp1 === 0 || dateTemp2 === 0) {
    return "parameter is empty";
  }
  const diffTime = Math.abs(dateTemp2 - dateTemp1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    milliseconds: diffTime,
    days: diffDays,
  };
};

module.exports = differentBetweenTowDate;
