'use strict';
const calc = document.getElementById('start');
const plusAddIncome = document.getElementsByTagName('button')[0];
const plusAddExpenses = document.getElementsByTagName('button')[1];
const checkbox = document.querySelector('#deposit-check');
const addIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const addIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const budgetMonthValue = document.querySelector('.budget_month-value');
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('input.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('input.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
const addExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');

function isNumber(num) {
    num.value = num.value.replace(/[^\d]/g, '');
}

function isRussian(str) {
    str.value = str.value.replace(/[^а-яА-ЯёЁ !?.,:;"']/g, '');
}

let appData = {
    income: {},
    addIncome: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    target: 0,
    mission: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    period: 0,
    start: function() {
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getExpensesMonth();
        appData.getIncome();
        appData.getIncomeMonth();
        appData.getAddIncome();
        appData.getAddExpenses();
        appData.getIncome();
        appData.getBudget();
        appData.getBudgetDay();
        appData.getTargetMonth();
        appData.period = +periodSelect.value;
        appData.showResult();

    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        addExpensesValue.value = appData.addExpenses.map(function(word){
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(', ');
        addIncomeValue.value = appData.addIncome.map(function(word){
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(', ');
        targetMonthValue.value = appData.target;
        incomePeriodValue.value = appData.calcSavedMoney();
        periodSelect.addEventListener('input', function(){
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    },
    getAddExpenses: function(){
        appData.addExpenses = [];
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        appData.addIncome = [];
        addIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        plusAddExpenses.before(cloneExpensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3){
            plusAddExpenses.remove();
        }
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        plusAddIncome.before(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3){
            plusAddIncome.remove();
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = +cashIncome;
            }
        });
    },
    getIncomeMonth: function(){
        let sum = 0;
        for (let key in appData.income) {
            sum += +appData.income[key];
            appData.incomeMonth = sum;
        }
    },
    getExpensesMonth: function(){
        let sum = 0;
        for (let key in appData.expenses) {
            sum += appData.expenses[key];
        }
        appData.expensesMonth = sum;
    },
    getBudget: function(){
        appData.budgetMonth = +appData.budget + appData.incomeMonth - appData.expensesMonth;
    },
    getBudgetDay: function(){
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
        if (Math.ceil(+targetAmount.value / appData.budgetMonth) < 0 || appData.budgetMonth === 0) {
            appData.target = 'Цель не будет достигнута';
        }
        else {
            appData.target =  Math.ceil(+targetAmount.value / appData.budgetMonth);
        }
    },
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200) {
                return 'У вас высокий уровень дохода';
            }
        else if (appData.budgetDay >= 600) {
            return'У вас средний уровень дохода';
        }
        else if (appData.budgetDay >= 0 ) {
            return'К сожалению у вас уровень дохода ниже среднего';
        }
        else {
            return'Что то пошло не так';
        }
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            let percent;
            let cash;
            do {
                percent = prompt('Какой годовой процент?', 8);
            } while (!isNumber(percent));
            appData.percentDeposit = percent;
            do {
                cash = prompt('Какая сумма заложена?', 12000);
            } while (!isNumber(cash));
            appData.moneyDeposit = cash;
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

calc.addEventListener('click', function(){
    if (salaryAmount.value === '') {
        alert('Поле "Месячный доход" должно быть заполнено!');
        return;
    }
    appData.start();
});

plusAddExpenses.addEventListener('click', appData.addExpensesBlock);
plusAddIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function(){
    appData.period = +periodSelect.value;
    document.querySelector('.period-amount').textContent = periodSelect.value;
});
document.querySelector('.data').querySelectorAll('input').forEach(function(item){
    if (item.getAttribute('placeholder') === 'Сумма') {
        item.addEventListener('keyup', function(){
            isNumber(item);
        });
    }
    if (item.getAttribute('placeholder') === 'Наименование') {
        item.addEventListener('keyup', function(){
            isRussian(item);
        });
    }
});