const ageIs = (date, startDate) => {
  if (!date || new Date(date).toString() == "Invalid Date")
    return "Invalid DOB Date";
  if (startDate && new Date(startDate).toString() == "Invalid Date")
    return "Invalid Start Date Date";

  const [month, day, year] = date.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = startDate ? new Date(startDate) : new Date();

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    const lastMonth = new Date(year, month, 0);
    ageDays += lastMonth.getDate();
  }

  if (
    month === 2 &&
    ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) &&
    day > today.getDate()
  ) {
    // console.log(
    //   month,
    //   date,
    //   day,
    //   today.getDate(),
    //   today.getMonth(),
    //   (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    // );
    ageDays += today.getMonth() < 4 ? 2 : 1;
  }
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  return {
    year: ageYears,
    month: ageMonths,
    day: ageDays,
  };
};

module.exports = ageIs;
