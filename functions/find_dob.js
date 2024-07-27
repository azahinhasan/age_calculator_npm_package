const dobIs = (age, startDate) => {
  //stateDate should be MM/DD/YYYY
  if (startDate && new Date(startDate).toString() == "Invalid Date")
    return "Invalid Start Date";
  else startDate = startDate ? new Date(startDate) : new Date();
  const birthDate = new Date(
    startDate.getFullYear() - age.year,
    startDate.getMonth() - age.month,
    startDate.getDate() - age.day
  );
  birthDate.setDate(birthDate.getDate() + 1);
  return birthDate;
};

module.exports = dobIs;
