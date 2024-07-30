const ageIs = (dob, startDate) => {
  if (!dob || new Date(dob).toString() == "Invalid Date")
    return "Invalid DOB Date";
  if (startDate && new Date(startDate).toString() == "Invalid Date")
    return "Invalid Start Date Date";

  const [dobMonth, dobDay, dobYear] = dob.split("/").map(Number);

  const birthDate = new Date(dob);
  console.log();

  const today = startDate ? new Date(startDate) : new Date();

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    const lastMonth = new Date(dobYear, dobMonth, 0);
    ageDays += lastMonth.getDate();
  }

  if (
    dobMonth === 2 &&
    ((dobYear % 4 === 0 && dobYear % 100 !== 0) || dobYear % 400 === 0) &&
    dobDay > today.getDate()
  ) {
    // console.log(
    //   dobMonth,
    //   dob,
    //   dobDay,
    //   today.getDate(),
    //   today.getMonth(),
    //   (dobYear % 4 === 0 && dobYear % 100 !== 0) || dobYear % 400 === 0
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
