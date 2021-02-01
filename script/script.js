let money = +prompt('Ваш месячный доход?', 0);
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1e6;
let period = 12;
console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log(addExpenses.split());
console.log('Цель заработать: ' + mission + ' рублей');
console.log('Период равен ' + period + ' месяцев' );
console.log(addExpenses.toLowerCase());
let budgetDay = Math.floor(money / 30);
let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let amount2 = +prompt('Во сколько это обойдется?');
let budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц: ' + budgetMonth);
let monthToMission = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута за: ' + monthToMission + ' месяцев(-а)');
budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день: ' + budgetDay + 'рублей');
if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
  console.log('Что то пошло не так');
}