const formateDateMMDDYY = require("./formate_data_MMDDYY");

const ageIs = (date) => {
  let yearAge;
  let monthAge;
  let dateAge;

  var now = new Date();

  var yearNow = now.getYear();
  var monthNow = now.getMonth();
  var dateNow = now.getDate();

  var dob = formateDateMMDDYY(date);

  var yearDob = dob.getYear();
  var monthDob = dob.getMonth();
  var dateDob = dob.getDate();

  yearAge = yearNow - yearDob;

  if (monthNow >= monthDob) monthAge = monthNow - monthDob;
  else {
    yearAge--;
    monthAge = 12 + monthNow - monthDob;
  }

  if (dateNow >= dateDob) dateAge = dateNow - dateDob;
  else {
    monthAge--;
    dateAge = 31 + dateNow - dateDob;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }

  return {
    year: yearAge,
    month: monthAge,
    day: dateAge,
  };
};

module.exports = ageIs;
