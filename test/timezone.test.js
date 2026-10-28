// Runs in a timezone behind UTC with daylight saving, where the old code
// was off by one day. Must be set before any Date is created.
process.env.TZ = "America/New_York";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { ageIs, dobIs, differentBetweenTowDate } = require("../index");

test("timezone is applied", () => {
  assert.equal(new Date(2020, 4, 5).getTimezoneOffset(), 240);
});

test("ISO date-only strings are read as local dates", () => {
  assert.deepEqual(ageIs("2020-05-06", "2021-05-05"), { year: 0, month: 11, day: 29 });
  assert.deepEqual(ageIs("2020-05-05", "05/05/2021"), { year: 1, month: 0, day: 0 });
  assert.equal(dobIs({ year: 1 }, "2021-11-17").toDateString(), "Tue Nov 17 2020");
});

test("a daylight-saving day still counts as one day", () => {
  // Clocks go back on Nov 1 2020 (25h day) and forward on Mar 8 2020 (23h day).
  assert.equal(differentBetweenTowDate("10/31/2020", "11/01/2020").days, 1);
  assert.equal(differentBetweenTowDate("10/31/2020", "11/02/2020").days, 2);
  assert.equal(differentBetweenTowDate("03/07/2020", "03/09/2020").days, 2);
  assert.deepEqual(ageIs("10/15/2020", "11/14/2020"), { year: 0, month: 0, day: 30 });
});
