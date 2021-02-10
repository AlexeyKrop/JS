'use strict';

let money;

// Функция проверки вводимого значения
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
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
  mission: 1e6,
  period: 12,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.split();
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  getExpensesMonth: function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      appData.expenses = prompt('Введите обязательную статью расходов № ' + (+i + 1));
      sum += +prompt(`Во сколько обойдется ${appData.expenses.toLowerCase()}?`);
    }
    return sum;
    },
  getAccumulatedMonth: function() {
    let budgetMonth = money - expensesAmount;
    return budgetMonth;
    },
  getTargetMonth: function() {
    let monthToMission = 0;
    if (accumulatedMonth > 0) {
      monthToMission = Math.ceil(appData.mission / accumulatedMonth);
    }
    return monthToMission;
    },   
  getStatusIncome:  function() {
    appData.budgetDay = Math.floor(accumulatedMonth / 30);
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

let expensesAmount = appData.getExpensesMonth();
console.log(expensesAmount);

let accumulatedMonth = appData.getAccumulatedMonth();
console.log('Бюджет на месяц: ' + accumulatedMonth);

let targetMonth = appData.getTargetMonth();
if(targetMonth > 0){
  console.log('Цель будет достигнута за: ' + targetMonth + ' месяцев(-а)');
} else {
   console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());


console.log('Бюджет на день: ' + appData.budgetDay + ' рублей');




console.log(typeof(appData.budget));
console.log(typeof(appData.income));
console.log(typeof(appData.deposit));


console.log('Цель заработать: ' + appData.mission + ' рублей');
console.log('Период равен ' + appData.period + ' месяцев' );












