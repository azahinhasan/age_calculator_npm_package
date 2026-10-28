// Parses any supported date input into a local date at midnight.
// Returns null if the input is not a valid date.
const parseDate = (input) => {
  let date;
  // "YYYY-MM-DD" is parsed by JS as UTC midnight, which shifts the day for
  // timezones behind UTC. Read it as a local date instead.
  const isoDateOnly =
    typeof input === "string" &&
    input.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (isoDateOnly) {
    const [, year, month, day] = isoDateOnly.map(Number);
    date = new Date(year, month - 1, day);
  } else {
    date = input instanceof Date ? new Date(input.getTime()) : new Date(input);
  }

  if (isNaN(date.getTime())) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

module.exports = parseDate;
