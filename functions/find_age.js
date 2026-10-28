const parseDate = require("./parse_date");

const ageIs = (dob, startDate) => {
  const birthDate = dob ? parseDate(dob) : null;
  if (!birthDate) return "Invalid DOB Date";

  const today = startDate ? parseDate(startDate) : parseDate(new Date());
  if (!today) return "Invalid Start Date Date";
  if (birthDate > today) return "DOB must be bigger then start date";

  // Count whole months first, then the days left over from the date reached
  // by adding those months to the DOB (clamped to the end of short months).
  let totalMonths =
    (today.getFullYear() - birthDate.getFullYear()) * 12 +
    (today.getMonth() - birthDate.getMonth());
  if (today.getDate() < birthDate.getDate()) totalMonths--;

  const anchorYear = birthDate.getFullYear() + Math.floor(totalMonths / 12);
  const anchorMonth = birthDate.getMonth() + (totalMonths % 12);
  const daysInAnchorMonth = new Date(anchorYear, anchorMonth + 1, 0).getDate();
  const anchor = new Date(
    anchorYear,
    anchorMonth,
    Math.min(birthDate.getDate(), daysInAnchorMonth)
  );

  // Compare in UTC so daylight saving changes can't add or remove a day.
  const toUTCDay = (date) =>
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

  return {
    year: Math.floor(totalMonths / 12),
    month: totalMonths % 12,
    day: Math.round((toUTCDay(today) - toUTCDay(anchor)) / 86400000),
  };
};

module.exports = ageIs;
