'use strict';

let btnStart = document.getElementById('start');
let btnPlus = document.getElementsByTagName('button');
let btnPlusIncome = btnPlus[0];
let btnPlusExpenses = btnPlus[1];
let btnCancel = document.getElementById('cancel');

let inputAll = document.getElementsByTagName('input');

let checkbox = document.querySelector('#deposit-check');


let inputValue = document.querySelectorAll('.additional_income-item');


// доход за месяц
let inputValueBudgetMonth = document.getElementsByClassName('budget_month-value')[0];


// дневной бюджет
let inputValueBudgetDay = document.getElementsByClassName('budget_day-value')[0];

// расход за месяц
let inputValueExpensesMonth = document.getElementsByClassName('expenses_month-value')[0];
let expensesItems = document.querySelectorAll('.expenses-items');

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
  reset: function(){
    for (let i = 0; i < inputAll.length; i++) {
      inputAll[i].value = '';
      
    }
  },
  start: function() {
    if (inputValueSalaryAmount.value.trim() === '') {
      alert('Поле "Месячный доход" должно быть заполнено');
      return;
    }
    this.budget = inputValueSalaryAmount.value;

  // вызов функции с затратами
    this.getExpenses(); 
  // вызов функции с доходами 
    this.getIncome();
  // затраты на месяц
    this.getExpensesMonth();
  // бюджет
    this.getBudget();
    this.getStatusIncome();
    this.getAddExpenses();
    this.getAddIncome();
    this.getTargetMonth();
    this.showResult();
  },
  showResult: function() {
    inputValueBudgetMonth.value = this.budgetMonth;
    inputValueBudgetDay.value = this.budgetDay;
    inputValueExpensesMonth.value = this.expensesMonth;
    inputValueAdditionalExpenses.value = this.addExpenses.join(' , ');
    inputValueAdditionalIncome.value = this.addIncome.join(' , ');
    inputValueTargetMonth.value = this.period;
    inputValueIncomePeriod.value = this.calcSAvedMoney();
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
    let sumPlaceHolder = document.querySelectorAll('[placeholder = "Сумма"]');
    let namePlaceHolder = document.querySelectorAll('[placeholder = "Наименование"]');
    sumPlaceHolder.forEach(function(item){
      item.addEventListener('input', function(){
        item.value = item.value.replace(/[^0-9\.]/g, '');
      });
    });
    namePlaceHolder.forEach(function(item){
      item.addEventListener('input', function(){
        item.value = item.value.replace(/[^а-я]/,'');
      });
    });
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
    let expensesSumPlaceHolder = document.querySelectorAll('[placeholder = "Сумма"]');
    let expensesNamePlaceHolder = document.querySelectorAll('[placeholder = "Наименование"]');
    expensesSumPlaceHolder.forEach(function(item){
      item.addEventListener('input', function(){
        item.value = item.value.replace(/[^0-9\.]/g, '');
      });
    });
    expensesNamePlaceHolder.forEach(function(item){
      item.addEventListener('input', function(){
        item.value = item.value.replace(/[^а-я]/,'');
      });
    });
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
      let itemIncome = item.querySelector('.income-title').value;
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
        this.income[itemIncome] = cashIncome;
    }   
    let addExpenses;
      do {
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');   
        addExpenses.toLowerCase(); 
        console.log(addExpenses);
      } while (isString(addExpenses)); 
      this.addExpenses = addExpenses.split(', ');
      this.addExpenses = this.addExpenses.map(item => item.toLowerCase().trim().slice(0, 1).toUpperCase() + item.slice(1));

    this.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {
      let question,
          cash;

      do {
        question = prompt('Введите обязательную статью расходов № ' + (+i + 1));
      } while (isString(question));
      
      
      do {
        cash = prompt(`Во сколько обойдется?`);
      } while (!isNumber(cash) || cash < 0);
        this.expenses[question] = cash;
    }
  },

  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
    },
  getBudget: function() {
    this.budgetMonth = this.budget - this.expensesMonth;
    return this.budgetMonth;
    },
  getTargetMonth: function() {
    if (this.budgetMonth > 0) {
      this.period = Math.ceil(targetAmount.value / this.budgetMonth);
    }
    return this.period;
    },   
  getStatusIncome:  function() {
    this.budgetDay = Math.floor(this.budgetMonth / 30);
    if (this.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else if (this.budgetDay < 0) {
        return 'Что то пошло не так';
    }
  },
  getInfoDeposit: function () {
    if(this.deposit){
      do {  
        this.percentDeposit = prompt("Введите процентную ставку?");
      } while (!isNumber(this.percentDeposit));
      do {  
        this.moneyDeposit = prompt("Какой размер вклада?");
      } while (!isNumber(this.deposit) && !isNumber(this.moneyDeposit));
    }
  },
  calcSAvedMoney: function () {
    return this.budgetMonth * periodSelect.value;
  }
};
 btnStart.disabled = true;
inputValueSalaryAmount.addEventListener('input', function(){
  if(inputValueSalaryAmount.value.trim() !== ''){
    btnStart.disabled = false;
  }
  return btnStart;
});



for (let i = 0; i < inputAll.length; i++) {
  if(inputAll[i].placeholder === 'Наименование'){
    inputAll[i].addEventListener('input', function(){
    inputAll[i].value = inputAll[i].value.replace(/[^а-я]/,'');
    });
}
}

for (let i = 0; i < inputAll.length; i++) {
  if(inputAll[i].placeholder === 'Сумма'){
    inputAll[i].addEventListener('input', function(){
    inputAll[i].value = inputAll[i].value.replace(/[^0-9\.]/g, '');
    });
}
}


btnStart.addEventListener('click', function(){
    appData.start();
    disableInput();
    btnStart.hidden = true;
    btnCancel.style.display = 'block';
});

btnCancel.addEventListener('click', function(){
  btnStart.hidden = false;
  btnCancel.style.display = 'none';
  appData.reset();
  activeInput();
});

btnPlusExpenses.addEventListener('click', function(){
    appData.addExpensesBlock();
});

btnPlusIncome.addEventListener('click', function(){
    appData.addIncomeBlock();
});

periodSelect.addEventListener('input', function(){
  paragraph.innerHTML = periodSelect.value;
  inputValueIncomePeriod.value = appData.calcSAvedMoney();
});

let disableInput = function(){
  for (let i = 0; i < inputAll.length; i++) {
  if(inputAll[i].type === 'text'){
    inputAll[i].disabled = true;
  }
}
};

let activeInput = function(){
  for (let i = 0; i < inputAll.length; i++){
    if(inputAll[i].disabled){
      inputAll[i].disabled = false;
    }
  }
};




