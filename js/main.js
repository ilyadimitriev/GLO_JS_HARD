'use strict';
const calc = document.getElementById(`start`);
const cancel = document.getElementById(`cancel`);
let plusAddIncome = document.querySelector(`.income_add`);
let plusAddExpenses = document.querySelector(`.expenses_add`);
const depositCheck = document.querySelector(`#deposit-check`);
const depositBank = document.querySelector(`.deposit-bank`);
const depositAmount = document.querySelector(`.deposit-amount`);
const depositPercent = document.querySelector(`.deposit-percent`);
const addIncomeItem = document.querySelectorAll(`.additional_income-item`);
const budgetDayValue = document.getElementsByClassName(`budget_day-value`)[0];
const expensesMonthValue = document.getElementsByClassName(`expenses_month-value`)[0];
const addIncomeValue = document.getElementsByClassName(`additional_income-value`)[0];
const addExpensesValue = document.getElementsByClassName(`additional_expenses-value`)[0];
const incomePeriodValue = document.getElementsByClassName(`income_period-value`)[0];
const targetMonthValue = document.getElementsByClassName(`target_month-value`)[0];
const budgetMonthValue = document.querySelector(`.budget_month-value`);
const salaryAmount = document.querySelector(`.salary-amount`);
const incomeTitle = document.querySelector(`input.income-title`);
const incomeAmount = document.querySelector(`.income-amount`);
const expensesTitle = document.querySelector(`input.expenses-title`);
const expensesAmount = document.querySelector(`.expenses-amount`);
const addExpensesItem = document.querySelector(`.additional_expenses-item`);
const targetAmount = document.querySelector(`.target-amount`);
const periodSelect = document.querySelector(`.period-select`);
let expensesItems = document.querySelectorAll(`.expenses-items`);
let incomeItems = document.querySelectorAll(`.income-items`);

class AppData {
    constructor(){
        this.income = {};
        this.addIncome = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.target = 0;
        this.mission = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
        this.expenses = {};
        this.addExpenses = [];
        this.period = 0;
    }
    forbit(item, type) {
        if (type === `text`) {
            item.value = item.value.replace(/[^а-яА-ЯёЁ !?.,:;"'`]/g, ``);
        }
        if (type=== `num`) {
            item.value = item.value.replace(/[^\d]/g, ``);
        }
    }
    eventListeners(){
        calc.addEventListener(`click`, this.start.bind(this));
        cancel.addEventListener(`click`, this.reset.bind(this));
        plusAddExpenses.addEventListener(`click`, event =>{
            this.addBlock.call(this, event);
        });
        plusAddIncome.addEventListener(`click`, event =>{
            this.addBlock.call(this, event);
        });
        periodSelect.addEventListener(`input`, () => {
            this.period = +periodSelect.value;
            document.querySelector(`.period-amount`).textContent = periodSelect.value;
        });
        this.inputEventListener(document);
        depositCheck.addEventListener(`change`, this.depositHandler.bind(this));
    }
    inputEventListener(place){
        place.querySelectorAll(`input`).forEach((item) => {
            if (item.getAttribute(`placeholder`) === `Сумма` || item.getAttribute(`placeholder`) === `Процент`) {
                item.addEventListener(`keyup`, () => {
                    this.forbit(item, `num`);
                });
            }
            if (item.getAttribute(`placeholder`) === `Наименование`) {
                item.addEventListener(`keyup`, () => {
                    this.forbit(item, `text`);
                });
            }
        });
    }
    start() {
        if (salaryAmount.value === ``) {
            alert(`Поле "Месячный доход" должно быть заполнено!`);
            return;
        }
        if (+depositPercent.value > 100) {
            alert(`Введите корректное значение в поле "Процент"`);
            return;
        }
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getMonthSum();
        this.getAddExpInc();
        this.getInfoDeposit();
        this.getBudget();
        this.getTargetMonth();
        this.period = +periodSelect.value;
        this.saveProgram();
        this.showResult();
    }
    reset() {
        localStorage.clear(`data`);
        for (let item in this) {
            if ( this.getCookie(item) !== undefined){
                this.deleteCookie(item);
            }
        }
        this.deleteCookie(`isLoad`);
        document.querySelectorAll(`.data input`).forEach(function(item){
            if(item.getAttribute(`type`) === `text`) {
                item.disabled = false;
            }
        });
        calc.style.display = `block`;
        cancel.style.display = `none`;
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
    }
    showResult(){
        document.querySelectorAll(`.data input`).forEach(function(item){
            if(item.getAttribute(`type`) === `text`) {
                item.disabled = true;
            }
        });
        calc.style.display = `none`;
        cancel.style.display = `block`;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.map(function(word){
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(`, `);
        addIncomeValue.value = this.addIncome.map(function(word){
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(`, `);
        targetMonthValue.value = this.target;
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener(`input`, () => incomePeriodValue.value = this.calcSavedMoney());
    }
    resetResult(){
        document.querySelectorAll(`input[type=text]`).forEach(function(input){
            input.value = ``;
        });
        periodSelect.value = 1;
        document.querySelector(`.period-amount`).textContent = periodSelect.value;
        expensesItems = document.querySelectorAll(`.expenses-items`);
        incomeItems = document.querySelectorAll(`.income-items`);
        if (expensesItems.length === 3) {
           document.querySelector(`.expenses`).insertAdjacentHTML(`beforeend`, `<button class="btn_plus expenses_add">+</button>`);
            plusAddExpenses = document.querySelector(`.expenses_add`);
           plusAddExpenses.addEventListener(`click`, event =>{
            this.addBlock.call(this, event);
        });
        }
        for (let i = expensesItems.length; i > 1; i--) {
            document.querySelector(`.expenses-items`).remove();
        }
        if (incomeItems.length === 3) {
            document.querySelector(`.income`).insertAdjacentHTML(`beforeend`, `<button class="btn_plus income_add">+</button>`);
            plusAddIncome = document.querySelector(`.income_add`);
            plusAddIncome.addEventListener(`click`, event =>{
            this.addBlock.call(this, event);
        });
        }
        for (let i = incomeItems.length; i > 1; i--) {
            document.querySelector(`.income-items`).remove();
        }
        depositCheck.checked = false;
        depositBank.style.display = `none`;
        depositBank.querySelector(`option`).setAttribute(`selected`, `selected`);
        depositAmount.style.display = `none`;
        depositPercent.style.display = `none`;
    }
    saveProgram(){
        const progData = JSON.stringify(this);
        localStorage.setItem(`data`, progData);
        for(let item in this) {
            const itemValue = this[item];
            const jsonItem = JSON.stringify(itemValue);
            document.cookie = encodeURIComponent(item) + `=` + encodeURIComponent(jsonItem) + `; max-age=180000`;
        }
    }
    loadProgram(){
        const progData = JSON.parse(localStorage.getItem(`data`));
        let status = true;
        for (let item in progData) {
            if (JSON.stringify(progData[item]) !== this.getCookie(item)) {
                console.log(`Не совпало`);
                document.cookie = `isLoad = false; max-age=180000`;
                status = false;
                alert(`При загрузке данных прошлой сессии произошла ошибка. Данные будут удалены`);
                break;
            }
        }
        if (status) {
            document.cookie = `isLoad = true; max-age=180000`;
        }
        if (this.getCookie(`isLoad`) === 'true') {
            for (let item in progData) {
                this[item] = progData[item];
            }
            this.showResult();
        } else {
            this.reset();
        }
    }
    getAddExpInc(){
        const getAdd = type => {
            const addType = `add` + (type.charAt(0).toUpperCase() + type.slice(1));
            this[addType] = [];
            const addTypeItem = document.querySelectorAll(`.additional_${type}-item`);
            if (addTypeItem.length > 1) {
                addTypeItem.forEach((item) => {
                    const itemValue = item.value.trim();
                    if (itemValue !== ``){
                        this[addType].push(itemValue);
                    }
                });
            }
            else {
                const addExpenses = addTypeItem[0].value.split(`,`); 
                addExpenses.forEach((item) => {
                    item = item.trim();
                    if (item !== ``){
                        this[addType].push(item);
                    }
                });
            }
        };
        getAdd(`income`);
        getAdd(`expenses`);
    }
    addBlock(event){
        const type = event.target.className.split(` `)[1].replace(/_add/g, ``);
        let typeItems = document.querySelectorAll(`.${type}-items`);
        const plusAddType = document.querySelector(`.${type}_add`);
        const cloneItem = typeItems[0].cloneNode(true);
        cloneItem.querySelectorAll(`input`).forEach(item => {
            item.value = ``;
        });
        plusAddType.before(cloneItem);
        typeItems = document.querySelectorAll(`.${type}-items`);
        if (typeItems.length === 3){
            plusAddType.remove();
        }
        this.inputEventListener(typeItems[typeItems.length - 1]);
    }
    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemhAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== `` && itemhAmount !== ``){
                this[startStr][itemTitle] = +itemhAmount;
            }
        };
        expensesItems = document.querySelectorAll(`.expenses-items`);
        incomeItems = document.querySelectorAll(`.income-items`);
        incomeItems.forEach(count);
        expensesItems.forEach(count);    
    }
    getMonthSum(){
        const sum = category => {
            const name = category + `Month`;
            for (let key in this[category]) {
                this[name] += +this[category][key];
            }
        };
        sum('income');
        sum('expenses');
    }
    getBudget(){
        const monthDeposit =  Math.floor(this.moneyDeposit * (this.percentDeposit / 100));
        this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth(){
        if (Math.ceil(+targetAmount.value / this.budgetMonth) < 0 || this.budgetMonth === 0) {
            this.target = `Цель не будет достигнута`;
        }
        else {
            this.target =  Math.ceil(+targetAmount.value / this.budgetMonth);
        }
    }
    getStatusIncome(){
        if (this.budgetDay >= 1200) {
                return `У вас высокий уровень дохода`;
            }
        else if (this.budgetDay >= 600) {
            return`У вас средний уровень дохода`;
        }
        else if (this.budgetDay >= 0 ) {
            return`К сожалению у вас уровень дохода ниже среднего`;
        }
        else {
            return`Что то пошло не так`;
        }
    }
    depositHandler(){
        if(depositCheck.checked) {
            depositBank.style.display = `inline-block`;
            depositAmount.style.display = `inline-block`;
            this.deposit = true;
            depositBank.addEventListener(`change`, this.changePercent);
        }
        else{
            depositBank.style.display = `none`;
            depositAmount.style.display = `none`;
            depositBank.style.display = ``;
            depositAmount.style.display = ``;
            this.deposit = false;
            depositBank.removeEventListener(`change`, this.changePercent);
        }
    }
    changePercent(){
        const valueSelect = this.value;
        if(valueSelect === `other`) {
            depositPercent.value = '';
            depositPercent.style.display = `inline-block`;
        }
        else {
            depositPercent.style.display = ``;
            depositPercent.value = valueSelect;
        }

    }
    getInfoDeposit(){
        if(this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    calcSavedMoney(){
        return this.budgetMonth * this.period;
    }
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    setCookie(name, value, options = {}) {
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }
        
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
            }
        }
        document.cookie = updatedCookie;
    }
    deleteCookie(name) {
        this.setCookie(name, "", {
          'max-age': -1
        });
    }
}





const appData = new AppData();
appData.eventListeners();
if(localStorage.getItem('data') !== null) {
    appData.loadProgram();
}