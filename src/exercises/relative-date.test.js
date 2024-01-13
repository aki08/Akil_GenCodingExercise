import { calculateRelativeDate } from "./relative-date";
import { expect } from "@open-wc/testing";

// Test cases writtten for Last Year, This Week, Today & last Month
describe("Calculate Relative Date", () => {
  it("Last Year", () => {
    const input = new Date(2023, 1, 1);
    const expected = "Last Year";
    const actual = calculateRelativeDate(input);
    expect(actual).to.equal(expected);
  });
  it("This Week", () => {
    const input = new Date(2024, 0, 10);
    const expected = "This Week";
    const actual = calculateRelativeDate(input);
    expect(actual).to.equal(expected);
  });
  it("Today", () => {
    const input = new Date(2024, 0, 13);
    const expected = "Today";
    const actual = calculateRelativeDate(input);
    expect(actual).to.equal(expected);
  });
  it("Last Month", () => {
    const input = new Date(2023, 11, 13);
    const expected = "Last Month";
    const actual = calculateRelativeDate(input);
    expect(actual).to.equal(expected);
  });
});
