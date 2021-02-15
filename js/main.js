'use strict';
const calc = document.getElementById('start');
const cancel = document.getElementById('cancel');
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

function addListener(place){
    place.querySelectorAll('input').forEach(function(item){
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
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getExpensesMonth();
        this.getIncome();
        this.getIncomeMonth();
        this.getAddIncome();
        this.getAddExpenses();
        this.getIncome();
        this.getBudget();
        this.getBudgetDay();
        this.getTargetMonth();
        this.period = +periodSelect.value;
        this.showResult();

    },
    reset: function() {
        this.income = {};
        this.addIncome = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.target = 0;
        this.mission = 0;
        this. budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this. incomeMonth = 0;
        this.expenses = {};
        this.addExpenses = [];
        this.period = 0;
        this.resetResult();
    },
    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.map(function(word){
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(', ');
        addIncomeValue.value = this.addIncome.map(function(word){
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(', ');
        targetMonthValue.value = this.target;
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', function(){
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    },
    resetResult: function(){
        document.querySelectorAll('input[type=text]').forEach(function(input){
            input.value = '';
        });
        periodSelect.value = 1;
        document.querySelector('.period-amount').textContent = periodSelect.value;
        if (expensesItems.length === 3) {
           document.querySelector('.expenses').insertAdjacentHTML('beforeend', '<button class="btn_plus expenses_add">+</button>');
           plusAddExpenses.addEventListener('click', this.addExpensesBlock);
        }
        for (let i = expensesItems.length; i > 1; i--) {
            document.querySelector('.expenses-items').remove();
        }
        if (incomeItems.length === 3) {
            document.querySelector('.income').insertAdjacentHTML('beforeend', '<button class="btn_plus income_add">+</button>');
            plusAddIncome.addEventListener('click', this.addIncomeBlock);
        }
        for (let i = incomeItems.length; i > 1; i--) {
            document.querySelector('.income-items').remove();
        }
    },
    getAddExpenses: function(){
        this.addExpenses = [];
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        this.addIncome = [];
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
        addListener(expensesItems[expensesItems.length - 1]);
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
        addListener(incomeItems[incomeItems.length - 1]);
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
        for (let key in this.income) {
            sum += +this.income[key];
            this.incomeMonth = sum;
        }
    },
    getExpensesMonth: function(){
        let sum = 0;
        for (let key in this.expenses) {
            sum += this.expenses[key];
        }
        this.expensesMonth = sum;
    },
    getBudget: function(){
        this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
    },
    getBudgetDay: function(){
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function(){
        if (Math.ceil(+targetAmount.value / this.budgetMonth) < 0 || this.budgetMonth === 0) {
            this.target = 'Цель не будет достигнута';
        }
        else {
            this.target =  Math.ceil(+targetAmount.value / this.budgetMonth);
        }
    },
    getStatusIncome: function(){
        if (this.budgetDay >= 1200) {
                return 'У вас высокий уровень дохода';
            }
        else if (this.budgetDay >= 600) {
            return'У вас средний уровень дохода';
        }
        else if (this.budgetDay >= 0 ) {
            return'К сожалению у вас уровень дохода ниже среднего';
        }
        else {
            return'Что то пошло не так';
        }
    },
    getInfoDeposit: function(){
        if(this.deposit){
            let percent;
            let cash;
            do {
                percent = prompt('Какой годовой процент?', 8);
            } while (!isNumber(percent));
            this.percentDeposit = percent;
            do {
                cash = prompt('Какая сумма заложена?', 12000);
            } while (!isNumber(cash));
            this.moneyDeposit = cash;
        }
    },
    calcSavedMoney: function(){
        return this.budgetMonth * this.period;
    }
};

calc.addEventListener('click', function(){
    if (salaryAmount.value === '') {
        alert('Поле "Месячный доход" должно быть заполнено!');
        return;
    }
    document.querySelectorAll('.data input').forEach(function(item){
        if(item.getAttribute('type') === 'text') {
            item.disabled = true;
        }
    });
    calc.style.display = 'none';
    cancel.style.display = 'block';
    appData.start();
});
cancel.addEventListener('click', function(){
    document.querySelectorAll('.data input').forEach(function(item){
        if(item.getAttribute('type') === 'text') {
            item.disabled = false;
        }
    });
    calc.style.display = 'block';
    cancel.style.display = 'none';
    appData.reset();
});
plusAddExpenses.addEventListener('click', appData.addExpensesBlock);
plusAddIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function(){
    appData.period = +periodSelect.value;
    document.querySelector('.period-amount').textContent = periodSelect.value;
});

 addListener(document.querySelector('.data'));