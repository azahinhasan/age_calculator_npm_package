const differentBetweenTowDate = require("./functions/diff_between_two_date");
const ageIs = require("./functions/find_age");
const dobIs = require("./functions/find_dob");
const dateDiff = require("./functions/date_diff");
const { nextBirthday, isBirthday } = require("./functions/birthday");
const { ageIn, isAgeAtLeast } = require("./functions/age_in");
const addToDate = require("./functions/add_to_date");
const { isLeapYear, daysInMonth } = require("./functions/date_utils");

module.exports = {
  differentBetweenTowDate,
  ageIs,
  dobIs,
  dateDiff,
  nextBirthday,
  isBirthday,
  ageIn,
  isAgeAtLeast,
  addToDate,
  isLeapYear,
  daysInMonth,
};
