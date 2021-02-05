'use strict';
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money,
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1e6,
    period = 12;

let start = function() {
  money = prompt('Ваш месячный доход?');

  while(!isNumber(money)){
    money = prompt('Ваш месячный доход?');
  }
};
start();

console.log(addExpenses.length);
console.log(addExpenses.split());
console.log('Цель заработать: ' + mission + ' рублей');
console.log('Период равен ' + period + ' месяцев' );
console.log(addExpenses.toLowerCase());
let expenses1 = prompt('Введите обязательную статью расходов №1?');
let expenses2 = prompt('Введите обязательную статью расходов №2?');
let amount1 = +prompt(`Во сколько  обойдется(-утся) ${expenses1}?`);
let amount2 = +prompt(`Во сколько это обойдется(-утся) ${expenses2}?`);

// Функция возвращает расходы за месяц
function getExpensesMonth() {
   while(!isNumber(amount1, amount2)){
    amount1 = +prompt(`Во сколько это обойдется(-утся) ${expenses1}?`);
    amount2 = +prompt(`Во сколько это обойдется(-утся) ${expenses2}?`);
  }
  return amount1 + amount2;
}
console.log(getExpensesMonth(amount1, amount2));

// Функция возвращает накопления на месяц
function getAccumulatedMonth() {
  let budgetMonth = money - (amount1 + amount2);
  return budgetMonth;
}
let accumulatedMonth = getAccumulatedMonth();
console.log('Бюджет на месяц: ' + accumulatedMonth);

// Функция возвращает за какой период будет достигнута цель
function getTargetMonth() {
  let monthToMission = 0;
  if (accumulatedMonth > 0) {
     monthToMission = Math.ceil(mission / accumulatedMonth);
  }
  return monthToMission;
}
let targetMonth = getTargetMonth();
if(targetMonth > 0){
  console.log('Цель будет достигнута за: ' + targetMonth + ' месяцев(-а)');
} else {
   console.log('Цель не будет достигнута');
}


let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ' + budgetDay + ' рублей');

// Функция возвращает тип переменной
function showTypeOf(whatType) {
  return typeof(whatType);
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// Функция возвращает уровень дохода
function getStatusIncome() {
  if (budgetDay >= 1200) {
    return 'У вас высокий уровень дохода';
} else if (budgetDay >= 600 && budgetDay < 1200) {
    return 'У вас средний уровень дохода';
} else if (budgetDay >= 0 && budgetDay < 600) {
    return 'К сожалению у вас уровень дохода ниже среднего';
} else if (budgetDay < 0) {
    return 'Что то пошло не так';
  }
}
getStatusIncome();