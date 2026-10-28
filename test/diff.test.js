const { test } = require("node:test");
const assert = require("node:assert/strict");
const { differentBetweenTowDate } = require("../index");

const DAY = 86400000;

test("MM/DD/YYYY strings", () => {
  assert.deepEqual(differentBetweenTowDate("01/01/2021", "01/05/2021"), {
    milliseconds: 4 * DAY,
    days: 4,
  });
});

test("order of dates does not matter", () => {
  assert.equal(differentBetweenTowDate("01/05/2021", "01/01/2021").days, 4);
});

test("accepts Date objects, ISO and non-padded strings", () => {
  assert.equal(differentBetweenTowDate(new Date(2021, 0, 1), new Date(2021, 0, 5)).days, 4);
  assert.equal(differentBetweenTowDate("2021-01-01", "2021-01-05").days, 4);
  assert.equal(differentBetweenTowDate("5/5/2021", "5/10/2021").days, 5);
});

test("still accepts any separator in MM?DD?YYYY", () => {
  assert.equal(differentBetweenTowDate("01_01_2021", "01_05_2021").days, 4);
});

test("keeps the existing empty-parameter message", () => {
  assert.equal(differentBetweenTowDate("", "01/01/2021"), "parameter is empty");
  assert.equal(differentBetweenTowDate("01/01/2021"), "parameter is empty");
});

test("invalid dates give NaN like before", () => {
  const result = differentBetweenTowDate("hello", "01/01/2021");
  assert.ok(Number.isNaN(result.days));
  assert.ok(Number.isNaN(result.milliseconds));
});
