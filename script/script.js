"use strict";

let btnStart = document.getElementById("start"),
  btnPlus = document.getElementsByTagName("button"),
  btnPlusIncome = btnPlus[0],
  btnPlusExpenses = btnPlus[1],
  btnCancel = document.getElementById("cancel"),
  inputAll = document.getElementsByTagName("input"),
  checkbox = document.querySelector("#deposit-check"),
  inputValue = document.querySelectorAll(".additional_income-item"),
  // доход за месяц
  inputValueBudgetMonth = document.getElementsByClassName(
    "budget_month-value"
  )[0],
  // дневной бюджет
  inputValueBudgetDay = document.getElementsByClassName("budget_day-value")[0],
  // расход за месяц
  inputValueExpensesMonth = document.getElementsByClassName(
    "expenses_month-value"
  )[0],
  expensesItems = document.querySelectorAll(".expenses-items"),
  // возможные доходы
  inputValueAdditionalIncome = document.getElementsByClassName(
    "additional_income-value"
  )[0],
  incomeItems = document.querySelectorAll(".income-items"),
  // возможные расходы
  inputValueAdditionalExpenses = document.getElementsByClassName(
    "additional_expenses-value"
  )[0],
  // накопления за период
  inputValueIncomePeriod = document.getElementsByClassName(
    "income_period-value"
  )[0],
  // срок достижения цели
  inputValueTargetMonth = document.getElementsByClassName(
    "target_month-value"
  )[0],
  // месячны доход
  inputValueSalaryAmount = document.querySelector(".salary-amount"),
  // дополнительный доход
  inputValueIncomeTitle = document.querySelector(".income-title"),
  inputValueIncomAmount = document.querySelector(".income-amount"),
  // возможный доход
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  // возможные расходы
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  // цель
  targetAmount = document.querySelector(".target-amount"),
  // ползунок
  periodSelect = document.querySelector(".period-select"),
  paragraph = document.querySelector(".period-amount"),
  money,
  periodAmount = document.querySelector(".period-amount");

// Функция проверки вводимого значения
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
// Функция проверка строки
let isString = function (n) {
  return !isNaN(n);
};

let AppData = function () {
  this.budget = 0;
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.period = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.incomesMonth = 0;
};
AppData.prototype.reset = function () {
  for (let i = 0; i < inputAll.length; i++) {
    inputAll[i].value = "";
  }
  periodSelect.value = 0;
  periodAmount.textContent = 1;
};
AppData.prototype.start = function () {
  if (inputValueSalaryAmount.value.trim() === "") {
    alert('Поле "Месячный доход" должно быть заполнено');
    return;
  }
  this.budget = inputValueSalaryAmount.value;

  // вызов функции с затратами
  this.getExpenses();
  // вызов функции с доходами
  this.getIncome();
  // затраты на месяц
  this.getIncomesMonth();
  this.getExpensesMonth();
  // бюджет
  this.getBudget();
  this.getStatusIncome();
  this.getAddExpenses();
  this.getAddIncome();
  this.getTargetMonth();
  this.showResult();
};
AppData.prototype.showResult = function () {
  inputValueBudgetMonth.value = this.budgetMonth;
  inputValueBudgetDay.value = this.budgetDay;
  inputValueExpensesMonth.value = this.expensesMonth;
  inputValueAdditionalExpenses.value = this.addExpenses.join(" , ");
  inputValueAdditionalIncome.value = this.addIncome.join(" , ");
  inputValueTargetMonth.value = this.period;
  inputValueIncomePeriod.value = this.calcSAvedMoney();
};
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.querySelector(".income-title").value = "";
  cloneIncomeItem.querySelector(".income-amount").value = "";
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncome);
  incomeItems = document.querySelectorAll(".income-items");
  if (incomeItems.length === 3) {
    btnPlusIncome.style.display = "none";
  }
  let sumPlaceHolder = document.querySelectorAll('[placeholder = "Сумма"]');
  let namePlaceHolder = document.querySelectorAll(
    '[placeholder = "Наименование"]'
  );
  sumPlaceHolder.forEach(function (item) {
    item.addEventListener("input", function () {
      item.value = item.value.replace(/[^0-9\.]/g, "");
    });
  });
  namePlaceHolder.forEach(function (item) {
    item.addEventListener("input", function () {
      item.value = item.value.replace(/[^а-я]/, "");
    });
  });
};
AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.querySelector(".expenses-title").value = "";
  cloneExpensesItem.querySelector(".expenses-amount").value = "";
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
  expensesItems = document.querySelectorAll(".expenses-items");
  if (expensesItems.length === 3) {
    btnPlusExpenses.style.display = "none";
  }
  let expensesSumPlaceHolder = document.querySelectorAll(
    '[placeholder = "Сумма"]'
  );
  let expensesNamePlaceHolder = document.querySelectorAll(
    '[placeholder = "Наименование"]'
  );
  expensesSumPlaceHolder.forEach(function (item) {
    item.addEventListener("input", function () {
      item.value = item.value.replace(/[^0-9\.]/g, "");
    });
  });
  expensesNamePlaceHolder.forEach(function (item) {
    item.addEventListener("input", function () {
      item.value = item.value.replace(/[^а-я]/, "");
    });
  });
};
AppData.prototype.getExpenses = function () {
  let _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector(".expenses-title").value;
    let cashExpenses = item.querySelector(".expenses-amount").value;
    if (itemExpenses !== "" && cashExpenses !== "") {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.getAddExpenses = function () {
  let _this = this;
  let addExpenses = additionalExpensesItem.value.split(" ,");
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== "") {
      _this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {
  let _this = this;
  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      _this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getIncome = function () {
  let _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector(".income-title").value;
    let cashItem = item.querySelector(".income-amount").value;
    if (itemIncome !== "" && cashItem !== "") {
      _this.income[itemIncome] = cashItem;
    }
  });
};
AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
  return this.expensesMonth;
};
AppData.prototype.getIncomesMonth = function () {
  for (let key in this.income) {
    this.incomesMonth += +this.income[key];
  }
  return this.incomesMonth;
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget - this.expensesMonth + this.incomesMonth;
  return this.budgetMonth;
};
AppData.prototype.getTargetMonth = function () {
  if (this.budgetMonth > 0) {
    this.period = Math.ceil(targetAmount.value / this.budgetMonth);
  }
  return this.period;
};
AppData.prototype.getStatusIncome = function () {
  this.budgetDay = Math.floor(this.budgetMonth / 30);
  if (this.budgetDay >= 1200) {
    return "У вас высокий уровень дохода";
  } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
    return "У вас средний уровень дохода";
  } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
    return "К сожалению у вас уровень дохода ниже среднего";
  } else if (this.budgetDay < 0) {
    return "Что то пошло не так";
  }
};
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt("Введите процентную ставку?");
    } while (!isNumber(this.percentDeposit));
    do {
      this.moneyDeposit = prompt("Какой размер вклада?");
    } while (!isNumber(this.deposit) && !isNumber(this.moneyDeposit));
  }
};
AppData.prototype.calcSAvedMoney = function () {
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.eventListener = function () {
  btnStart.disabled = true;
  inputValueSalaryAmount.addEventListener("input", function () {
    if (inputValueSalaryAmount.value.trim() !== "") {
      btnStart.disabled = false;
    }
    return btnStart;
  });
  btnStart.addEventListener("click", function () {
    appData.start();
    AppData.prototype.disableInput();
    btnStart.hidden = true;
    btnCancel.style.display = "block";
  });
  btnCancel.addEventListener("click", function () {
    btnStart.hidden = false;
    btnCancel.style.display = "none";
    appData.reset();
    AppData.prototype.activeInput();
  });
  periodSelect.addEventListener("input", function () {
    paragraph.innerHTML = periodSelect.value;
    inputValueIncomePeriod.value = appData.calcSAvedMoney();
  });
  btnPlusExpenses.addEventListener("click", function () {
    appData.addExpensesBlock();
  });

  btnPlusIncome.addEventListener("click", function () {
    appData.addIncomeBlock();
  });
};
AppData.prototype.disableInput = function () {
  for (let i = 0; i < inputAll.length; i++) {
    if (inputAll[i].type === "text") {
      inputAll[i].disabled = true;
    }
  }
};
AppData.prototype.activeInput = function () {
  for (let i = 0; i < inputAll.length; i++) {
    if (inputAll[i].disabled) {
      inputAll[i].disabled = false;
    }
  }
};
let appData = new AppData();
AppData.prototype.eventListener();

function getReplace(placeHolder) {
  for (let i = 0; i < inputAll.length; i++) {
    if (inputAll[i].placeholder === placeHolder) {
      inputAll[i].addEventListener("input", function () {
        if (placeHolder === "Наименование") {
          inputAll[i].value = inputAll[i].value.replace(/[^а-я]/, "");
        } else if (placeHolder === "Сумма") {
          inputAll[i].value = inputAll[i].value.replace(/[^0-9\.]/g, "");
        }
      });
    }
  }
}
getReplace("Наименование");
getReplace("Сумма");
