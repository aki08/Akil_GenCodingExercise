/*
 * Write a function that will take a date and compare with today date and return text:
 * - Today: same year, same month, same date
 * - Yesterday: same year, same month, date = today - 1
 * - This week: same year, same month, today - 7 < date < today - 1
 * - Last week: same year, same month, date = today - 7
 * - This month: same year, same month, date < today - 7
 * - Last month: same year, month = current month - 1
 * - This year: same year
 * - last year: year = current year - 1
 * - Long time ago: everything else
 *
 * Lastly, please write a unit test for calculateRelativeDate function
 * */

const calculateRelativeDate = (inputDate) => {
  //Creating date object
  const date = new Date();
  const enteredDate = new Date(inputDate);

  //Adjusting date to remove irregularities with time
  const adjustedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const adjustedEnteredDate = new Date(
    enteredDate.getFullYear(),
    enteredDate.getMonth(),
    enteredDate.getDate()
  );

  //Conditions to check the various cases (today, yesterday, last month..)
  //Checking with time as directly comparing date objects leads to reference erros
  if (adjustedDate.getTime() === adjustedEnteredDate.getTime()) {
    return `Today`;
  } else if (
    adjustedEnteredDate.getTime() < adjustedDate.getTime() &&
    adjustedDate.getTime() - adjustedEnteredDate.getTime() <= oneDay
  ) {
    return `Yesterday`;
  } else if (thisWeek(adjustedDate, adjustedEnteredDate)) {
    return `This Week`;
  } else if (lastWeek(adjustedEnteredDate)) {
    return `Last Week`;
  } else if (thisMonth(adjustedEnteredDate)) {
    return "This Month";
  } else if (lastMonth(adjustedEnteredDate)) {
    return `Last Month`;
  } else if (thisYear(adjustedEnteredDate)) {
    return `This Year`;
  } else if (lastYear(adjustedEnteredDate)) {
    return `Last Year`;
  }

  return `Long time ago`;
};

//Declaring one day and current date object globally
const oneDay = 24 * 60 * 60 * 1000;
const currentDate = new Date();

function thisWeek(date1, date2) {
  //Calculate the start of the week for each date
  const startOfWeek1 = new Date(date1);
  startOfWeek1.setDate(date1.getDate() - date1.getDay());

  const startOfWeek2 = new Date(date2);
  startOfWeek2.setDate(date2.getDate() - date2.getDay());

  //Check if both dates fall within the same week
  return Math.abs(startOfWeek1 - startOfWeek2) < 7 * oneDay;
}

function lastWeek(date) {
  //Calculate the start of the current week and the start of the week before
  const startOfThisWeek = new Date();
  startOfThisWeek.setDate(startOfThisWeek.getDate() - startOfThisWeek.getDay());

  const startOfLastWeek = new Date(startOfThisWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

  //Check if the given date falls within the last week
  return date >= startOfLastWeek && date < startOfThisWeek;
}

function thisMonth(date) {
  //Check if year and month of the entered date and current date are same
  return (
    date.getFullYear() === currentDate.getFullYear() &&
    date.getMonth() === currentDate.getMonth()
  );
}

function lastMonth(date) {
  //Setting the lastMonth by picking the current date month and reducing it by 1
  const lastMonth = new Date(currentDate);
  lastMonth.setMonth(currentDate.getMonth() - 1);

  //Check if given date month match lastMonth date
  return (
    date.getFullYear() === lastMonth.getFullYear() &&
    date.getMonth() === lastMonth.getMonth()
  );
}

function thisYear(date) {
  // Check if given year and current date year are same
  return date.getFullYear() === currentDate.getFullYear();
}

function lastYear(date) {
  // Check if given year and current date year -reduced by 1 are same
  return date.getFullYear() === currentDate.getFullYear() - 1;
}

const View = {
  init: () => {
    document
      .getElementById("relative-date-btn")
      .addEventListener("click", () => {
        const msgElement = document.getElementById("relative-date-msg");
        const inputDateElem = document.getElementById("relative-date-input");
        msgElement.textContent = calculateRelativeDate(inputDateElem.value);
      });
  },
};

document.addEventListener("DOMContentLoaded", View.init);
export { calculateRelativeDate };
