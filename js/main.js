'use strict';

let currencyValues;
const currency1 = document.getElementById(`currency1`);
const currency2 = document.getElementById(`currency2`);
const input1 = document.querySelector(`.input-value1`);
const input2 = document.querySelector(`.input-value2`);

const getData = () =>
	fetch(`https://api.exchangeratesapi.io/latest`)
		.then(response => {
			if (response.status !== 200) {
				throw new Error(`Возникла ошибка при получении данных`);
			}
			return response.json();
		})
		.then(data => {
			currencyValues = JSON.parse(JSON.stringify(data));
		})
		.catch(error => {
			console.error(error);
		});

const swap = () => {
	const rememberCurrency = currency1.value;
	currency1.value = currency2.value;
	currency2.value = rememberCurrency;
	const rememberValue = input1.value;
	input1.value = input2.value;
	input2.value = rememberValue;
};

const convert = () => {
	const currencyName1 = currency1.value;
	const currencyName2 = currency2.value;
	const value = input1.value;
	if (currencyName1 === `EUR`) {
		if (currencyName2 === `EUR`) {
			input2.value = value;
		} else {
			input2.value = (value * currencyValues.rates[currencyName2]).toFixed(2);
		}
	} else {
		if (currencyName2 === `EUR`) {
			input2.value = (value / currencyValues.rates[currencyName1]).toFixed(2);
		} else {
			input2.value = (value * (+currencyValues.rates[currencyName2] / +currencyValues.rates[currencyName1])).toFixed(2);
		}
	}

};

getData();

document.querySelector(`.swap`).addEventListener(`click`, () => {
	swap();
});

document.querySelector(`.convert`).addEventListener(`click`, () => {
	convert();
});
