let currentDate = new Date();
const testDate = new Date(Date.UTC(2024, 6, 2));

const header = document.getElementById("canlender-header");
const dateHeader = document.getElementById("date-header");
const dayWeek = document.getElementById("day-week");
const tableCanlender = document.getElementById("current-table-canlender");
const dayCard = document.getElementById("day-card");
const prevYear = document.getElementById("prev-year");
const prevMonth = document.getElementById("prev-month");
const nextYear = document.getElementById("next-year");
const nextMonth = document.getElementById("next-month");
const resetDate = document.getElementById("reset-date");
const daysSelect = document.getElementById("days-select");
const monthsSelect = document.getElementById("months-select");
const dateValue = document.getElementById("days-select");
const monthValue = document.getElementById("months-select");
const yearValue = document.getElementById("year");
const confirmButton = document.getElementById("confirm-button");

class CustomDate {
  constructor(date, month, year) {
    this.date = date;
    this.month = month;
    this.year = year;
  }
}

let checkErrorDate = new CustomDate(1, 6, 2024);

function subtractOneYear(date) {
  let newDate = new CustomDate(date.date, date.month, date.year - 1);

  if (isValidDate(newDate)) {
    changeDate(newDate);
    changeTableCanlender(newDate.month, newDate.year);
  } else {
    checkErrorDate = newDate;
    changeDate("");
    changeTableCanlender(newDate.month, newDate.year);
  }
}

function addOneYear(date) {
  let newDate = new CustomDate(date.date, date.month, date.year + 1);

  if (isValidDate(newDate)) {
    changeDate(newDate);
    changeTableCanlender(newDate.month, newDate.year);
  } else {
    checkErrorDate = newDate;
    changeDate("");
    changeTableCanlender(newDate.month, newDate.year);
  }
}

function addOneMonth(date) {
  let newDate;

  if (date.month === 11) {
    newDate = new CustomDate(date.date, 0, date.year + 1);
  } else {
    newDate = new CustomDate(date.date, date.month + 1, date.year);
  }

  if (isValidDate(newDate)) {
    changeDate(newDate);
    changeTableCanlender(newDate.month, newDate.year);
  } else {
    checkErrorDate = newDate;
    changeDate("");
    changeTableCanlender(newDate.month, newDate.year);
  }
}

function isValidDate(date) {
  return (
    date.date <= getDaysAmountInMonth(date.month, date.year) &&
    date.date > 0 &&
    date.year > 1900
  );
}

function subtractOneMonth(date) {
  let newDate;

  if (date.month === 0) {
    newDate = new CustomDate(date.date, 11, date.year - 1);
  } else {
    newDate = new CustomDate(date.date, date.month - 1, date.year);
  }

  if (isValidDate(newDate)) {
    changeDate(newDate);
    changeTableCanlender(newDate.month, date.year);
  } else {
    checkErrorDate = newDate;
    changeDate("");
    changeTableCanlender(newDate.month, date.year);
  }
}

function getDaysAmountInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getDayInWeek(number) {
  switch (number) {
    case 0:
      return "Chủ nhật";
    case 1:
      return "Thứ 2";
    case 2:
      return "Thứ 3";
    case 3:
      return "Thứ 4";
    case 4:
      return "Thứ 5";
    case 5:
      return "Thứ 6";
    case 6:
      return "Thứ 7";
    default:
      return "";
  }
}

function changeDate(newDate) {
  if (newDate != "") {
    checkErrorDate = newDate;
    newDate = new Date(Date.UTC(newDate.year, newDate.month, newDate.date));
    header.innerHTML = `Tháng ${
      newDate.getMonth() + 1
    } năm ${newDate.getFullYear()}`;
    dateHeader.innerHTML = newDate.getDate();
    dayWeek.innerHTML = getDayInWeek(newDate.getDay());
  } else {
    header.innerHTML = ``;
    dateHeader.innerHTML = ``;
    dayWeek.innerHTML = ``;
  }
}

function getDaysInMonth(month, year) {
  var date = new Date(Date.UTC(year, month, 1));
  var days = [];
  while (date.getUTCMonth() === month) {
    days.push(new Date(date));
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return days;
}

function changeTableCanlender(month, year) {
  tableCanlender.innerHTML = "";
  const daysInMonth = getDaysInMonth(month, year);

  const firstDayInMonth = daysInMonth[0];
  let daysBefore;
  console.log(firstDayInMonth);
  if (firstDayInMonth.getDay() > 0) {
    daysBefore = firstDayInMonth.getDay();
  } else {
    daysBefore = 6;
  }

  for (let i = 0; i < daysBefore; i++) {
    const clone = dayCard.cloneNode(true);
    clone.querySelector("#date").textContent = "";

    tableCanlender.appendChild(clone);
  }

  daysInMonth.map((e) => {
    const clone = dayCard.cloneNode(true);
    clone.addEventListener("click", () => {
      changeDate(new CustomDate(e.getDate(), e.getMonth(), e.getFullYear()));
      changeTableCanlender(e.getMonth(), e.getFullYear());
    });
    if (e.getDate() === checkErrorDate.date) {
      //Testing
      // if (e.getDate() === currentDate.getDate()) {
      clone.style.backgroundColor = "yellowgreen";
    }
    clone.querySelector("#date").textContent = e.getDate();

    tableCanlender.appendChild(clone);
  });
}

prevYear.addEventListener("click", () => {
  subtractOneYear(checkErrorDate);
});

prevMonth.addEventListener("click", () => {
  subtractOneMonth(checkErrorDate);
});

nextMonth.addEventListener("click", () => {
  addOneMonth(checkErrorDate);
});

nextYear.addEventListener("click", () => {
  addOneYear(checkErrorDate);
});

resetDate.addEventListener("click", () => {
  const newDate = new CustomDate(
    currentDate.getDate(),
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
  changeDate(newDate);
  changeTableCanlender(newDate.month, newDate.year);
});

confirmButton.addEventListener("click", () => {
  const newDate = new CustomDate(
    Number(dateValue.value),
    Number(monthValue.value),
    Number(yearValue.value)
  );
  if (isValidDate(newDate)) {
    changeDate(newDate);
    changeTableCanlender(newDate.month, newDate.year);
  } else {
    alert("Ngày không tồn tại");
  }
});

for (let i = 1; i <= 31; i++) {
  let dateOption = document.createElement("option");
  dateOption.textContent = i;
  daysSelect.appendChild(dateOption);
}

for (let i = 1; i <= 12; i++) {
  let monthOption = document.createElement("option");
  monthOption.value = i - 1;
  monthOption.textContent = i;
  monthsSelect.append(monthOption);
}

changeDate(checkErrorDate);
changeTableCanlender(checkErrorDate.month, checkErrorDate.year);
