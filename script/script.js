'use strict';

let btnStart = document.getElementById('start');
console.log(btnStart);

let income = document.querySelector('.income');
let btnPlusIncome = income.getElementsByTagName('button');
console.log(btnPlusIncome);

let expenses =document.querySelector('.expenses');
let btnPlusExpenses = expenses.getElementsByTagName('button');
console.log(btnPlusExpenses);

let checkbox = document.querySelector('#deposit-check');
console.log(checkbox);

let inputValue = document.querySelectorAll('.additional_income-item');
console.log(inputValue);

// доход за месяц
let inputValueBudgetMonth = document.getElementsByClassName('.budget_month-value');
console.log(inputValueBudgetMonth);
// дневной бюджет
let inputValueBudgetDay = document.getElementsByClassName('.budget_day-value');
console.log(inputValueBudgetDay);
// расход за месяц
let inputValueExpensesMonth = document.getElementsByClassName('.expenses_month-value');
console.log(inputValueBudgetMonth);
// возможные доходы
let inputValueAdditionalIncome = document.getElementsByClassName('.additional_income-value');
console.log(inputValueAdditionalIncome);
// возможные расходы
let inputValueAdditionalExpenses = document.getElementsByClassName('.additional_expenses-value');
console.log(inputValueAdditionalExpenses);
// накопления за период
let inputValueIncomePeriod = document.getElementsByClassName('.income_period-value');
console.log(inputValueIncomePeriod);
// срок достижения цели
let inputValueTargetMonth = document.getElementsByClassName('.target_month-value');
console.log(inputValueTargetMonth);

// месячны доход 
let inputValueSalaryAmount = document.querySelector('.salary-amount');
console.log(inputValueSalaryAmount);

// дополнительный доход
let inputValueIncomeTitle = document.querySelector('.income-title');
console.log(inputValueIncomeTitle);

let inputValueIncomAmount = document.querySelector('.income-amount');
console.log(inputValueIncomAmount);

// возможный доход
let inputValueAdditionalIncomeItemAll = document.querySelectorAll('.additional_income-item');
console.log(inputValueAdditionalIncomeItemAll);


// обязательные расходы
let inputValueExpensesTitle = document.querySelector('.expenses-title');
console.log(inputValueExpensesTitle);
let inputValueExpensesAmount = document.querySelector('.expenses-amount');
console.log(inputValueExpensesAmount);

// возможные расходы
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log(additionalExpensesItem);

// цель
let targetAmount = document.querySelector('.target-amount');
console.log(targetAmount);

// ползунок
let range = document.querySelector('.period-select');
console.log(range);

let money;

// Функция проверки вводимого значения
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n) ;
};
// Функция проверка строки
let isString = function(n) {
  return !isNaN(n);
};

// Функция возвращает введенным пользователем ежемесячный доход
let start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  } while(!isNumber(money));
};
start();

// Создан объект
let appData = {
  budget: money,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 1e6,
  period: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() {

    if (confirm("Есть ли у вас дополнительный источник заработка?")) { 
      let itemIncome,
          cashIncome;
      do {
        itemIncome = prompt("Какой у вас дополнительный источник заработка?");    
      } while (isString(itemIncome));
      
      do {
        cashIncome = prompt("Сколько вы там зарабатываете?");
      } while (!isNumber(cashIncome) || cashIncome < 0);
        appData.income[itemIncome] = cashIncome;
    }   
    let addExpenses;
      do {
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');   
        addExpenses.toLowerCase(); 
        console.log(addExpenses);
      } while (isString(addExpenses)); 
      appData.addExpenses = addExpenses.split(', ');
      appData.addExpenses = appData.addExpenses.map(item => item.toLowerCase().trim().slice(0, 1).toUpperCase() + item.slice(1));

    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {
      let question,
          cash;

      do {
        question = prompt('Введите обязательную статью расходов № ' + (+i + 1));
      } while (isString(question));
      
      
      do {
        cash = prompt(`Во сколько обойдется?`);
      } while (!isNumber(cash) || cash < 0);
        appData.expenses[question] = cash;
    }
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return appData.expensesMonth;
    },
  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    return appData.budgetMonth;
    },
  getTargetMonth: function() {
    if (appData.budgetMonth > 0) {
      appData.period = Math.ceil(appData.mission / appData.budgetMonth);
    }
    return appData.period;
    },   
  getStatusIncome:  function() {
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    if (appData.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else if (appData.budgetDay < 0) {
        return 'Что то пошло не так';
    }
  },
  getInfoDeposit: function () {
    if(appData.deposit){
      do {  
        appData.percentDeposit = prompt("Введите процентную ставку?");
      } while (!isNumber(appData.percentDeposit));
      do {  
        appData.moneyDeposit = prompt("Какой размер вклада?");
      } while (!isNumber(appData.deposit) && !isNumber(appData.moneyDeposit));
    }
  },
  calcSAvedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};
appData.asking();
appData.getBudget();
appData.getInfoDeposit();
appData.calcSAvedMoney();

console.log('Расходы за месяц: ' + appData.getExpensesMonth() + ' рублей');


console.log('Цель будет достигнута за: ' + appData.getTargetMonth() + ' месяцев(-а)');

console.log(appData.getStatusIncome());

for (let key in appData){
  console.log("Наша программа включает в себя данные: " + appData[key]);
}




