const formateDateMMDDYY = require("./formate_data_MMDDYY");

const dobIs = (age, startDate) => {
  if (startDate && new Date(startDate) === "Invalid Date")
    return "Invalid Date";
  else if (startDate) startDate = formateDateMMDDYY(startDate);
  const d = startDate || new Date();

  let tempDate = startDate || new Date();

  tempDate.setDate(tempDate.getDate() - (age.day || 0));
  tempDate.setMonth(tempDate.getMonth() - (age.month || 0));
  tempDate.setFullYear(tempDate.getFullYear() - (age.year || 0));

  if (age.day >= d.getDate()) {
    const tempMonth = tempDate.getMonth();
    const tempYear = tempDate.getFullYear();
    let tempDay = 0;
    console.log(tempMonth, "tempMonth");
    if (tempMonth === 1) {
      if (tempYear % 4 === 0) {
        tempDay = 1;
      } else {
        tempDay = 2;
      }
    } else if (tempMonth !== 2 && tempMonth % 2 === 0) {
      tempDay = -1;
    }
    tempDate.setDate(tempDate.getDate() - tempDay);
  }

  return new Date(tempDate);
};

module.exports = dobIs;
