'use strict';

let money;

// Функция проверки вводимого значения
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
// Функция проверка строки
let isString = function(n) {
  return !isNaN(n);
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
        cashIncome = +prompt("Сколько вы там зарабатываете?");
      } while (!isNumber(cashIncome) || cashIncome < 0);
        appData.income[itemIncome] = cashIncome;
    }   
    let addExpenses;
      do {
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');    
      } while (isString(addExpenses)); 
      appData.addExpenses = addExpenses.split(', ');
      
      for (let i = 0; i < appData.addExpenses.length; i++){
        appData.addExpenses[i] = appData.addExpenses[i].charAt(0).toUpperCase() + appData.addExpenses[i].substring(1);
      }    

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
  getInfoDeposit: function () {
    if(appData.deposit){
      do {  
        appData.percentDeposit = +prompt("Введите процентную ставку?");
        appData.moneyDeposit = +prompt("Какой размер вклада?");
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




