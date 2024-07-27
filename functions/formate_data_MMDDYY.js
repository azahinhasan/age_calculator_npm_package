const formateDateMMDDYY = (date) => {
  if (!date) {
    return 0;
  }
  let dateString = date.toString();

  var dob = new Date(
    dateString.substring(6, 10), //year
    dateString.substring(0, 2) - 1, //month
    dateString.substring(3, 5) //day
  );

  return dob;
};

module.exports = formateDateMMDDYY;
