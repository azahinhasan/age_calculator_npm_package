const dobIs = (age, startDate) => {
  //stateDate should be MM/DD/YYYY
  if (startDate && new Date(startDate).toString() == "Invalid Date")
    return "Invalid Start Date";
  if (
    !age ||
    (age.year && typeof age.year !== "number") ||
    (age.month && typeof age.month !== "number") ||
    (age.day && typeof age.day !== "number")
  )
    return "Invalid Age Date";
  else startDate = startDate ? new Date(startDate) : new Date();

  const birthDate = new Date(
    startDate.getFullYear() - (age.year ?? 0),
    startDate.getMonth() - (age.month ?? 0),
    startDate.getDate() - (age.day ?? 0)
  );
  birthDate.setDate(birthDate.getDate() + 1);
  return birthDate;
};

module.exports = dobIs;
