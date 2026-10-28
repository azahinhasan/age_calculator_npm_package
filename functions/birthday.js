const { toDate, daysBetween, birthdayInYear } = require("./date_utils");

const nextBirthday = (dob, fromDate) => {
  const birthDate = toDate(dob, "DOB");
  const from = toDate(fromDate, "date", true);

  let year = Math.max(from.getFullYear(), birthDate.getFullYear() + 1);
  let date = birthdayInYear(birthDate, year);
  if (date < from) date = birthdayInYear(birthDate, ++year);

  return {
    date,
    daysLeft: daysBetween(from, date),
    age: year - birthDate.getFullYear(),
  };
};

const isBirthday = (dob, date) => {
  const birthDate = toDate(dob, "DOB");
  const day = toDate(date, "date", true);
  if (day < birthDate) return false;
  return daysBetween(birthdayInYear(birthDate, day.getFullYear()), day) === 0;
};

module.exports = { nextBirthday, isBirthday };
