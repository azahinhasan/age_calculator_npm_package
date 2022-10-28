const ageIs = (date) => {
  let yearAge;
  let monthAge;
  let dateAge;

  var now = new Date();
  let dateString = date.toString();

  var yearNow = now.getYear();
  var monthNow = now.getMonth();
  var dateNow = now.getDate();

  var dob = new Date(
    dateString.substring(6, 10),
    dateString.substring(0, 2) - 1,
    dateString.substring(3, 5)
  );

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

const dobIs = (age, startDate) => {
  const d = startDate || new Date();

  let tempDate = startDate || new Date();

  tempDate.setDate(tempDate.getDate() - (age.day||0));
  tempDate.setMonth(tempDate.getMonth() - (age.month||0));
  tempDate.setFullYear(tempDate.getFullYear() - (age.year||0));

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

const differentBetweenTowDate = (date1, date2) => {
  const dateTemp1 = new Date(date1);
  const dateTemp2 = new Date(date2);
  const diffTime = Math.abs(dateTemp2 - dateTemp1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    milliseconds: diffTime,
    days: diffDays,
  };
};

//PS I took help from open source documents and data

module.exports = { differentBetweenTowDate, ageIs, dobIs };
