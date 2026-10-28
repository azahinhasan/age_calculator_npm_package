const { test } = require("node:test");
const assert = require("node:assert/strict");
const { ageIs } = require("../index");

test("exact years", () => {
  assert.deepEqual(ageIs("05/05/2021", "05/05/2022"), { year: 1, month: 0, day: 0 });
  assert.deepEqual(ageIs("05/05/2021", "05/05/2021"), { year: 0, month: 0, day: 0 });
});

test("borrows days from the month before the start date", () => {
  assert.deepEqual(ageIs("05/06/2020", "05/05/2021"), { year: 0, month: 11, day: 29 });
  assert.deepEqual(ageIs("11/18/2020", "11/17/2021"), { year: 0, month: 11, day: 30 });
});

test("DOB in February of a leap year", () => {
  assert.deepEqual(ageIs("02/10/2020", "03/05/2021"), { year: 1, month: 0, day: 23 });
  assert.deepEqual(ageIs("02/10/2020", "03/05/2020"), { year: 0, month: 0, day: 24 });
});

test("born on Feb 29", () => {
  assert.deepEqual(ageIs("02/29/2020", "02/28/2021"), { year: 0, month: 11, day: 30 });
  assert.deepEqual(ageIs("02/29/2020", "03/01/2021"), { year: 1, month: 0, day: 1 });
  assert.deepEqual(ageIs("02/29/2020", "02/29/2024"), { year: 4, month: 0, day: 0 });
});

test("end of month", () => {
  assert.deepEqual(ageIs("01/31/2021", "02/28/2021"), { year: 0, month: 0, day: 28 });
  assert.deepEqual(ageIs("01/31/2021", "03/01/2021"), { year: 0, month: 1, day: 1 });
  assert.deepEqual(ageIs("01/31/2021", "03/31/2021"), { year: 0, month: 2, day: 0 });
});

test("accepts Date objects, ISO strings and timestamps", () => {
  const expected = { year: 1, month: 2, day: 3 };
  assert.deepEqual(ageIs(new Date(2020, 0, 1), new Date(2021, 2, 4)), expected);
  assert.deepEqual(ageIs("2020-01-01", "2021-03-04"), expected);
  assert.deepEqual(ageIs("1/1/2020", "3/4/2021"), expected);
  assert.deepEqual(ageIs(new Date(2020, 0, 1).getTime(), "03/04/2021"), expected);
});

test("defaults to today when no start date is given", () => {
  const now = new Date();
  const dob = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());
  assert.deepEqual(ageIs(dob), { year: 10, month: 0, day: 0 });
});

test("keeps the existing error messages", () => {
  assert.equal(ageIs(), "Invalid DOB Date");
  assert.equal(ageIs("not a date"), "Invalid DOB Date");
  assert.equal(ageIs("05/05/2021", "not a date"), "Invalid Start Date Date");
  assert.equal(ageIs("05/06/2021", "05/05/2021"), "DOB must be bigger then start date");
  assert.equal(ageIs("01/01/3000"), "DOB must be bigger then start date");
});
