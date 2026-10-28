const { test } = require("node:test");
const assert = require("node:assert/strict");
const { ageIs, dobIs } = require("../index");

const sameDay = (actual, year, month, day) =>
  assert.equal(actual.toDateString(), new Date(year, month - 1, day).toDateString());

test("subtracts the age from the start date", () => {
  sameDay(dobIs({ year: 1 }, "11/17/2021"), 2020, 11, 17);
  sameDay(dobIs({ year: 1, month: 12, day: 0 }, "11/17/2021"), 2019, 11, 17);
  sameDay(dobIs({ year: 2, month: 3, day: 10 }, "06/15/2024"), 2022, 3, 5);
  sameDay(dobIs({ day: 1 }, "03/01/2021"), 2021, 2, 28);
});

test("returns a Date", () => {
  assert.ok(dobIs({ year: 1 }, "11/17/2021") instanceof Date);
});

test("defaults to today when no start date is given", () => {
  const now = new Date();
  sameDay(dobIs({}), now.getFullYear(), now.getMonth() + 1, now.getDate());
  sameDay(dobIs({ year: 5 }), now.getFullYear() - 5, now.getMonth() + 1, now.getDate());
});

test("round trips with ageIs", () => {
  const ages = [
    { year: 1, month: 0, day: 0 },
    { year: 0, month: 11, day: 0 },
    { year: 25, month: 4, day: 12 },
    { year: 3, month: 1, day: 1 },
  ];
  for (const age of ages) {
    assert.deepEqual(ageIs(dobIs(age, "11/17/2021"), "11/17/2021"), age);
  }
});

test("accepts ISO start dates", () => {
  sameDay(dobIs({ year: 1 }, "2021-11-17"), 2020, 11, 17);
});

test("keeps the existing error messages", () => {
  assert.equal(dobIs({ year: 1 }, "not a date"), "Invalid Start Date");
  assert.equal(dobIs(), "Invalid Age Date");
  assert.equal(dobIs({ year: "5" }), "Invalid Age Date");
  assert.equal(dobIs({ year: -5 }), "Invalid Age Date");
  assert.equal(dobIs({ day: -1 }), "Invalid Age Date");
});
