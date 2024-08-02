const ageIs = (dob, startDate) => {
  if (!dob || new Date(dob).toString() == "Invalid Date")
    return "Invalid DOB Date";
  if (startDate && new Date(startDate).toString() == "Invalid Date")
    return "Invalid Start Date Date";
  if (
    (startDate && new Date(dob) > new Date(startDate)) ||
    (!startDate && new Date(dob) > new Date())
  )
    return "DOB must be bigger then start date";

  //const [dobMonth, dobDay, dobYear] = dob.split("/").map(Number);
  const dobDate = new Date(dob);
  const dobMonth = dobDate.getMonth() + 1;
  const dobDay = dobDate.getDate();
  const dobYear = dobDate.getFullYear();

  const birthDate = new Date(dob);

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
