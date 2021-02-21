'use strict';

let btnStart = document.getElementById('start');
let btnPlus = document.getElementsByTagName('button');
let btnPlusIncome = btnPlus[0];
let btnPlusExpenses = btnPlus[1];


let checkbox = document.querySelector('#deposit-check');


let inputValue = document.querySelectorAll('.additional_income-item');


// доход за месяц
let inputValueBudgetMonth = document.getElementsByClassName('budget_month-value')[0];


// дневной бюджет
let inputValueBudgetDay = document.getElementsByClassName('budget_day-value')[0];

// расход за месяц
let inputValueExpensesMonth = document.getElementsByClassName('expenses_month-value')[0];
let expensesItems = document.querySelectorAll('.expenses-items');
console.log(expensesItems[0]);
// возможные доходы
let inputValueAdditionalIncome = document.getElementsByClassName('additional_income-value')[0];
let incomeItems = document.querySelectorAll('.income-items');

// возможные расходы
let inputValueAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];

// накопления за период
let inputValueIncomePeriod = document.getElementsByClassName('income_period-value')[0];

// срок достижения цели
let inputValueTargetMonth = document.getElementsByClassName('target_month-value')[0];


// месячны доход 
let inputValueSalaryAmount = document.querySelector('.salary-amount');


// дополнительный доход
let inputValueIncomeTitle = document.querySelector('.income-title');


let inputValueIncomAmount = document.querySelector('.income-amount');

// возможный доход
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');


// обязательные расходы
// let inputValueExpensesTitle = document.querySelector('.expenses-title');

// let inputValueExpensesAmount = document.querySelector('.expenses-amount');

// возможные расходы
let additionalExpensesItem = document.querySelector('.additional_expenses-item');

// цель
let targetAmount = document.querySelector('.target-amount');

// ползунок
let periodSelect = document.querySelector('.period-select');
let paragraph = document.querySelector('.period-amount');
let money;

// Функция проверки вводимого значения
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n) ;
};
// Функция проверка строки
let isString = function(n) {
  return !isNaN(n);
};



// Создан объект
let appData = {
  budget: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  period: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function() {
    if (inputValueSalaryAmount.value.trim() === '') {
      alert('Поле "Месячный доход" должно быть заполнено');
      return;
    }
    appData.budget = inputValueSalaryAmount.value;
  //  appData.asking();
  //  appData.getInfoDeposit();
  // вызов функции с затратами
    appData.getExpenses(); 
  // вызов функции с доходами 
    appData.getIncome();
  // затраты на месяц
    appData.getExpensesMonth();
  // бюджет
    appData.getBudget();
    appData.getStatusIncome();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getTargetMonth();
    appData.showResult();
  },
  showResult: function() {
    inputValueBudgetMonth.value = appData.budgetMonth;
    inputValueBudgetDay.value = appData.budgetDay;
    inputValueExpensesMonth.value = appData.expensesMonth;
    inputValueAdditionalExpenses.value = appData.addExpenses.join(' , ');
    inputValueAdditionalIncome.value = appData.addIncome.join(' , ');
    inputValueTargetMonth.value = appData.period;
    inputValueIncomePeriod.value = appData.calcSAvedMoney();
  },
  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
      btnPlusIncome.style.display ='none';
    }
  },
  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnPlusExpenses.style.display = 'none';
    }
  },
  getExpenses: function() {
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(' ,');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== '') {
            appData.addExpenses.push(item);
          }
    });
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },
  getIncome: function() {
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title');
      itemIncome.addEventListener('input', function(){
        itemIncome.value = itemIncome.value.replace(/[^а-я]/,'');
      });
      let cashItem = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashItem !== ''){
        appData.income[itemIncome] = cashItem;
      }
    });
  },

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
      appData.period = Math.ceil(targetAmount.value / appData.budgetMonth);
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
    return appData.budgetMonth * periodSelect.value;
  }
};
 btnStart.disabled = true;
inputValueSalaryAmount.addEventListener('input', function(){
  if(inputValueSalaryAmount.value.trim() !== ''){
    btnStart.disabled = false;
  }
  return btnStart;
});


// incomeItems.forEach(function(item){
//   let itemIncome = item.querySelector('.income-title');
//   let sumIncome = item.querySelector('.income-amount');
//   sumIncome.addEventListener('input', function(){
//     sumIncome.value = sumIncome.value.replace(/[^0-9\.]/g, '');
//   });
//   itemIncome.addEventListener('input', function(){
//     itemIncome.value = itemIncome.value.replace(/[^а-я]/,'');
//   });      
// });

// for(let i = 0; i < 2; i++){
//   additionalIncomeItem[i].addEventListener('input', function(){
//   additionalIncomeItem[i].value = additionalIncomeItem[i].value.replace(/[^а-я]/,'');
//   });
// }
 
// expensesItems.forEach(function(item){
//   let itemExpenses = item.querySelector('.expenses-title');
//   let sumExpenses = item.querySelector('.expenses-amount');
//   sumExpenses.addEventListener('input', function(){
//     sumExpenses.value = sumExpenses.value.replace(/[^0-9\.]/g, '');
//   });
//   itemExpenses.addEventListener('input', function(){
//   itemExpenses.value = itemExpenses.value.replace(/[^f-z]/,'');
//   });      
// });

//  targetAmount.addEventListener('input', function(){
//     targetAmount.value = targetAmount.value.replace(/[^0-9\.]/g, '');
//   });

let inputAll = document.getElementsByTagName('input');

for (let i = 0; i < inputAll.length; i++) {
  if(inputAll[i].placeholder === 'Наименование'){
    console.log(inputAll[i]);
    inputAll[i].addEventListener('input', function(){
    inputAll[i].value = inputAll[i].value.replace(/[^а-я]/,'');
    });
}
}

for (let i = 0; i < inputAll.length; i++) {
  if(inputAll[i].placeholder === 'Сумма'){
    console.log(inputAll[i]);
    inputAll[i].addEventListener('input', function(){
    inputAll[i].value = inputAll[i].value.replace(/[^0-9\.]/g, '');
    });
}
}


btnStart.addEventListener('click', appData.start);

btnPlusExpenses.addEventListener('click', appData.addExpensesBlock);

btnPlusIncome.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function(){
  paragraph.innerHTML = periodSelect.value;
  inputValueIncomePeriod.value = appData.calcSAvedMoney();
});




// for (let key in appData){
  // console.log("Наша программа включает в себя данные: " + appData[key]);
// }




