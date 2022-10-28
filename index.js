function packageTest() {
  return "hello";
}

const packageTest2 = (s) => {
  return "test2";
};

const ageIs = (date) => {
  let yearAge;
  let monthAge;
  let dateAge;

  extraMsg = "";
  var now = new Date();
  dateString = date.toString();

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


const dobIs = (age,startDate) => {

  const d = startDate || new Date();

  let tempDate = startDate || new Date();
  tempDate.setDate(tempDate.getDate() - age.day);
  tempDate.setMonth(tempDate.getMonth() - age.month);
  tempDate.setFullYear(tempDate.getFullYear() - age.year);

  if(age.day>=d.getDate()){
    const tempMonth = tempDate.getMonth();
    const tempYear=tempDate.getFullYear();
    let tempDay=0;
    console.log(tempMonth,'tempMonth')
    if(tempMonth===1){
      if(tempYear%4===0){
        tempDay=1
      }else{
        tempDay=2
      }
    }
    else if(tempMonth!==2 && tempMonth%2===0){
      tempDay= -1;
    }
    tempDate.setDate(tempDate.getDate() - tempDay);
  }

  return new Date(tempDate);

};

module.exports = { packageTest, packageTest2,ageIs,dobIs };
