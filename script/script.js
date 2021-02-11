'use strict';

let money;

// Функция проверки вводимого значения
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Функция возвращает введенным пользователем ежемесячный доход
let start = function() {
  do {
    money = +prompt('Ваш месячный доход?');
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
  mission: 1e6,
  period: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.split(' , ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {
      let question = prompt('Введите обязательную статью расходов № ' + (+i + 1));
      let cash;

      do {
        cash = +prompt(`Во сколько обойдется?`);
      } while (!isNumber(cash) || cash < 0);
        appData.expenses[question] = cash;
    }
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
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
};
appData.asking();
appData.getBudget();
console.log(appData);

 console.log('Расходы за месяц: ' + appData.getExpensesMonth() + ' рублей');
 appData.getTargetMonth();
 if(appData.getTargetMonth() > 0){
   console.log('Цель будет достигнута за: ' + appData.getTargetMonth() + ' месяцев(-а)');
 } else {
    console.log('Цель не будет достигнута');
 }
console.log('Бюджет на месяц: ' + appData.getBudget());
console.log(appData.getStatusIncome());
console.log('Бюджет на день: ' + appData.budgetDay + ' рублей');






