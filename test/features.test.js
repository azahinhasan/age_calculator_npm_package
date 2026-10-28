const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  ageIs,
  dateDiff,
  nextBirthday,
  isBirthday,
  ageIn,
  isAgeAtLeast,
  addToDate,
  isLeapYear,
  daysInMonth,
} = require("../index");

const day = (year, month, date) => new Date(year, month - 1, date);
const sameDay = (actual, expected) =>
  assert.equal(actual.toDateString(), expected.toDateString());

test("dateDiff", () => {
  assert.deepEqual(dateDiff("01/15/2020", "03/20/2021"), {
    years: 1,
    months: 2,
    days: 5,
    totalMonths: 14,
    totalWeeks: 61,
    totalDays: 430,
    totalHours: 10320,
  });
  assert.deepEqual(dateDiff("2021-03-20", new Date(2020, 0, 15)), dateDiff("01/15/2020", "03/20/2021"));
  assert.equal(dateDiff("05/05/2021", "05/05/2021").totalDays, 0);
  assert.throws(() => dateDiff("05/05/2021"), TypeError);
  assert.throws(() => dateDiff("hello", "05/05/2021"), TypeError);
});

test("nextBirthday", () => {
  assert.deepEqual(nextBirthday("05/10/1990", "05/01/2024"), {
    date: day(2024, 5, 10),
    daysLeft: 9,
    age: 34,
  });
  assert.equal(nextBirthday("05/10/1990", "05/10/2024").daysLeft, 0);
  assert.deepEqual(nextBirthday("05/10/1990", "05/11/2024").date, day(2025, 5, 10));
  assert.deepEqual(nextBirthday("12/31/1990", "01/01/2024").daysLeft, 365);
  // Not born yet: first birthday
  assert.deepEqual(nextBirthday("05/10/2030", "01/01/2024").date, day(2031, 5, 10));
  // Feb 29 birthdays fall on Mar 1 in non-leap years
  assert.deepEqual(nextBirthday("02/29/2020", "02/01/2023").date, day(2023, 3, 1));
  assert.deepEqual(nextBirthday("02/29/2020", "02/01/2024").date, day(2024, 2, 29));
  assert.throws(() => nextBirthday("hello"), TypeError);
});

test("nextBirthday defaults to today", () => {
  const now = new Date();
  const dob = day(now.getFullYear() - 20, now.getMonth() + 1, now.getDate());
  assert.equal(nextBirthday(dob).daysLeft, 0);
  assert.equal(nextBirthday(dob).age, 20);
});

test("isBirthday", () => {
  assert.equal(isBirthday("05/10/1990", "05/10/2024"), true);
  assert.equal(isBirthday("05/10/1990", "05/11/2024"), false);
  assert.equal(isBirthday("05/10/1990", "05/10/1980"), false);
  assert.equal(isBirthday("02/29/2020", "03/01/2023"), true);
  assert.equal(isBirthday("02/29/2020", "02/28/2023"), false);
  assert.equal(isBirthday("02/29/2020", "03/01/2024"), false);
  assert.throws(() => isBirthday("hello"), TypeError);
});

test("ageIn", () => {
  assert.equal(ageIn("01/15/2020", "years", "03/20/2021"), 1);
  assert.equal(ageIn("01/15/2020", "months", "03/20/2021"), 14);
  assert.equal(ageIn("01/15/2020", "weeks", "03/20/2021"), 61);
  assert.equal(ageIn("01/15/2020", "days", "03/20/2021"), 430);
  assert.equal(ageIn("01/15/2020", "hours", "01/16/2020"), 24);
  assert.throws(() => ageIn("01/15/2020", "decades"), TypeError);
  assert.throws(() => ageIn("01/15/2030", "days", "01/15/2020"), RangeError);
});

test("isAgeAtLeast", () => {
  assert.equal(isAgeAtLeast("05/10/2006", 18, "05/10/2024"), true);
  assert.equal(isAgeAtLeast("05/10/2006", 18, "05/09/2024"), false);
  assert.equal(isAgeAtLeast("02/29/2004", 18, "02/28/2022"), false);
  assert.equal(isAgeAtLeast("02/29/2004", 18, "03/01/2022"), true);
  assert.equal(isAgeAtLeast("05/10/2030", 0, "05/10/2024"), false);
  assert.throws(() => isAgeAtLeast("hello", 18), TypeError);
  assert.throws(() => isAgeAtLeast("05/10/2006", "18"), TypeError);
});

test("addToDate", () => {
  sameDay(addToDate("01/15/2020", { years: 1, months: 2, days: 5 }), day(2021, 3, 20));
  sameDay(addToDate("01/31/2021", { months: 1 }), day(2021, 2, 28));
  sameDay(addToDate("02/29/2020", { years: 1 }), day(2021, 2, 28));
  sameDay(addToDate("03/01/2021", { days: -1 }), day(2021, 2, 28));
  sameDay(addToDate("01/15/2021", { months: -1 }), day(2020, 12, 15));
  sameDay(addToDate("01/15/2021", {}), day(2021, 1, 15));
  assert.throws(() => addToDate("01/15/2021", { days: 1.5 }), TypeError);
  assert.throws(() => addToDate("hello", { days: 1 }), TypeError);
});

test("addToDate(dob, age) lands on the start date", () => {
  const dobs = ["01/31/2019", "02/29/2020", "05/06/2020", "11/18/2020", "12/31/2018"];
  const ends = ["02/28/2021", "03/01/2021", "05/05/2021", "11/17/2021", "12/30/2021"];
  for (const dob of dobs) {
    for (const end of ends) {
      const { year, month, day: days } = ageIs(dob, end);
      sameDay(addToDate(dob, { years: year, months: month, days }), new Date(end));
    }
  }
});

test("isLeapYear and daysInMonth", () => {
  assert.equal(isLeapYear(2024), true);
  assert.equal(isLeapYear(2023), false);
  assert.equal(isLeapYear(1900), false);
  assert.equal(isLeapYear(2000), true);
  assert.equal(daysInMonth(2024, 2), 29);
  assert.equal(daysInMonth(2023, 2), 28);
  assert.equal(daysInMonth(2023, 12), 31);
  assert.throws(() => daysInMonth(2023, 13), TypeError);
  assert.throws(() => isLeapYear("2024"), TypeError);
});
