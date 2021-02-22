/* eslint-disable indent */
'use strict';

window.addEventListener('DOMContentLoaded', () => {

const input = document.querySelector('input'),
	p = document.querySelector('p');

const debounce = (func, delay) => {
	// Сюда будем сохранять setTimeout функцию
	let funcDelay;
	return function() {
		// Если уже существует функция ожидающая выполнения, то отменяем ее
		clearTimeout(funcDelay);
		// Задаем задержку перед выполнением функции printText
		funcDelay = setTimeout(func, delay);
	};
};

function printText() {
	p.textContent = input.value;
}

input.addEventListener(`keyup`, debounce(printText, 300));

});
