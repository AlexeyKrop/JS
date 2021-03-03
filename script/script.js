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
  periodAmount = document.querySelector(".period-amount"),
  depositBank = document.querySelector(".deposit-bank"),
  depositAmount = document.querySelector(".deposit-amount"),
  depositPercent = document.querySelector(".deposit-percent");

// Функция проверки вводимого значения
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
// Функция проверка строки
let isString = function (n) {
  return !isNaN(n);
};

class AppData {
  constructor() {
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
  }

  reset() {
    for (let i = 0; i < inputAll.length; i++) {
      inputAll[i].value = "";
    }
    periodSelect.value = 0;
    periodAmount.textContent = 1;
    checkbox.checked = false;
    depositBank.value = "";
  }

  start() {
    if (inputValueSalaryAmount.value.trim() !== "") {
      // alert('Поле "Месячный доход" должно быть заполнено');
      // return;
      this.budget = inputValueSalaryAmount.value;
    }
    // this.budget = inputValueSalaryAmount.value;

    // вызов функции с затратами
    this.getExpenses();
    // вызов функции с доходами
    this.getIncome();
    // затраты на месяц
    this.getIncomesMonth();
    this.getExpensesMonth();

    // бюджет
    this.depositHandler();
    this.getInfoDeposit();
    this.getBudget();
    this.getStatusIncome();
    this.getAddExpenses();
    this.getAddIncome();
    this.getTargetMonth();
    this.showResult();
  }

  showResult() {
    inputValueBudgetMonth.value = this.budgetMonth;
    inputValueBudgetDay.value = this.budgetDay;
    inputValueExpensesMonth.value = this.expensesMonth;
    inputValueAdditionalExpenses.value = this.addExpenses.join(" , ");
    inputValueAdditionalIncome.value = this.addIncome.join(" , ");
    inputValueTargetMonth.value = this.period;
    inputValueIncomePeriod.value = this.calcSAvedMoney();
  }

  addIncomeBlock() {
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
  }

  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector(".expenses-title").value = "";
    cloneExpensesItem.querySelector(".expenses-amount").value = "";
    expensesItems[0].parentNode.insertBefore(
      cloneExpensesItem,
      btnPlusExpenses
    );
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
  }

  getExpenses() {
    let _this = this;
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        _this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }

  getAddExpenses() {
    let _this = this;
    let addExpenses = additionalExpensesItem.value.split(" ,");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        _this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    let _this = this;
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        _this.addIncome.push(itemValue);
      }
    });
  }

  getIncome() {
    let _this = this;
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashItem = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashItem !== "") {
        _this.income[itemIncome] = cashItem;
      }
    });
  }

  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  }

  getIncomesMonth() {
    for (let key in this.income) {
      this.incomesMonth += +this.income[key];
    }
    return this.incomesMonth;
  }

  getBudget() {
    let monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth =
      this.budget - this.expensesMonth + this.incomesMonth + monthDeposit;
    return this.budgetMonth;
  }

  getTargetMonth() {
    if (this.budgetMonth > 0) {
      this.period = Math.ceil(targetAmount.value / this.budgetMonth);
    }
    return this.period;
  }

  getStatusIncome() {
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
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      do {
        this.moneyDeposit = depositAmount.value;
      } while (!isNumber(this.deposit) && !isNumber(this.moneyDeposit));
    }
  }

  calcSAvedMoney() {
    return this.budgetMonth * periodSelect.value;
  }

  changePercent() {
    let selectInput = this.value;
    if (selectInput === "other") {
      depositPercent.style.display = "inline-block";
      this.percentDeposit = depositPercent.value;
    } else {
      depositPercent.value = selectInput;
    }
  }

  depositHandler() {
    if (checkbox.checked) {
      depositBank.style.display = "inline-block";
      depositAmount.style.display = "inline-block";
      this.deposit = true;
      depositBank.addEventListener("change", this.changePercent);
    } else {
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositBank.value = " ";
      depositAmount.value = " ";
      this.deposit = true;
      depositBank.removeEventListener("change", this.changePercent);
    }
  }

  eventListener() {
    btnStart.disabled = true;
    inputValueSalaryAmount.addEventListener("input", function () {
      if (inputValueSalaryAmount.value.trim() !== "") {
        btnStart.disabled = false;
      }
      return btnStart;
    });
    btnStart.addEventListener("click", function () {
      appData.start();
      appData.disableInput();
      btnStart.hidden = true;
      btnCancel.style.display = "block";
    });
    btnCancel.addEventListener("click", function () {
      btnStart.hidden = false;
      btnCancel.style.display = "none";
      appData.reset();
      appData.activeInput();
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
    checkbox.addEventListener("change", this.depositHandler.bind(this));
  }

  disableInput() {
    for (let i = 0; i < inputAll.length; i++) {
      if (inputAll[i].type === "text") {
        inputAll[i].disabled = true;
      }
    }
  }

  activeInput() {
    for (let i = 0; i < inputAll.length; i++) {
      if (inputAll[i].disabled) {
        inputAll[i].disabled = false;
      }
    }
  }
}

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
        } else if (placeHolder === "Процент") {
          inputAll[i].value = inputAll[i].value.replace(/[^0-9\.]/g, "");
          if (inputAll[i].value > 100) {
            btnStart.disabled = true;
            alert("Введите число меньше 100");
          } else {
            btnStart.disabled = false;
          }
        }
      });
    }
  }
}
getReplace("Наименование");
getReplace("Сумма");
getReplace("Процент");
