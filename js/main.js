'use strict';
let money;
const calc = document.getElementById('start');
const plusBtn1 = document.getElementsByTagName('button')[0];
const plusBtn2 = document.getElementsByTagName('button')[1];
const checkbox = document.querySelector('#deposit-check');
const possibleIncome = document.querySelectorAll('.additional_income-item');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const budgetMonthValue = document.querySelector('.budget_month-value');
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('input.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('input.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');

function isNumber(num) {
    return !isNaN(num) && !isNaN(parseFloat(num)) && (isFinite(num));
}

function isString(str) {
    return (isNaN(Number(str))) ? true : false;
}

do {
    money = prompt('Ваш месячный доход?', 65000);
} while (!isNumber(money));

let appData = {
    income: {},
    addIncome: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    target: 0,
    mission: 3e5,
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    expenses: {},
    addExpenses: [],
    period: 4,
    getExpensesMonth: function(){
        let sum = 0;
        for (let key in appData.expenses) {
            sum += appData.expenses[key];
        }
        appData.expensesMonth = sum;
    },
    getBudget: function(){
        appData.budgetMonth = +appData.budget - appData.expensesMonth;
    },
    getTargetMonth: function(){
        if (Math.ceil(appData.mission / appData.budgetMonth) < 0 || appData.budgetMonth === 0) {
            appData.target = 'Цель не будет достигнута';
        }
        else {
            appData.target =  Math.ceil(appData.mission / appData.budgetMonth);
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
    asking: function(){
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome;
            let cashIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
            } while (!isString(itemIncome));
            do {
                cashIncome = prompt('Сколько вы на этом зарабатываете?', 12000);
            } while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses;
        do {
            addExpenses =  prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, Подписки, Такси, Психолог, Донаты');
        } while (!isString(addExpenses));
        addExpenses = addExpenses.toLowerCase().split(',');
        appData.addExpenses = addExpenses.map(function(word){
            return word.trim();
        });
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let obj = {};
        for (let i = 0, cost, expense; i < 2; i++) {
            do {
                expense = prompt('Введите обязательную статью расходов (' + (i + 1) + ' из 2)');
            } while (!isString(expense));
            do {
                cost = prompt('Во сколько это обойдется?', 8000);
            } while (!isNumber(cost));
            obj[expense] = +cost;
        }
        appData.expenses = obj;
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

function start(){
    appData.asking();
    appData.getInfoDeposit();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    console.log('Расходы за месяц: ' + appData.expensesMonth);
    appData.getTargetMonth();
    console.log('Cрок достижения цели в месяцах: ' + appData.target);
    console.log(appData.getStatusIncome());
    console.log('Наша программа включает в себя данные:');
    for (let key in appData) {
        if (typeof(appData[key]) === 'object') {
            console.log('%s',key + ': ', appData[key]);
        }
        else if (typeof(appData[key]) !== 'function') {
            console.log(key + ': ' + appData[key]);
        }
        else {
            continue;
        }
    }
}

start();

console.log(appData.addExpenses.map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}).join(', '));

console.log(calc);
console.log(plusBtn1);
console.log(plusBtn2);
console.log(checkbox);
console.log(possibleIncome);
console.log(budgetDayValue);
console.log(expensesMonthValue);
console.log(additionalIncomeValue);
console.log(additionalExpensesValue);
console.log(incomePeriodValue);
console.log(targetMonthValue);
console.log(budgetMonthValue);
console.log(salaryAmount);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(additionalExpensesItem);
console.log(targetAmount);
console.log(periodSelect);