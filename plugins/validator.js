'use strict';

class Validator {
	constructor({ selector, pattern = {}, method }) {
		this.form = document.querySelector(selector);
		this.pattern = pattern;
		this.method = method;
		this.elementsForm = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== `button` && item.type !== `button`);
		this.error = new Set();
	}
	init() {
		this.applyStyle();
		this.setPattern();
		this.elementsForm.forEach(elem => elem.addEventListener(`change`, this.checkIt.bind(this)));
		this.form.addEventListener(`submit`, event => {
			event.preventDefault();
			this.elementsForm.forEach(elem => this.checkIt({ target: elem }));
			if (this.error.size) {
				event.preventDefault();
			} else {
				this.elementsForm.forEach(elem => {
					elem.classList.remove(`success`);
					elem.classList.remove(`error`);
				});
			}
		});
	}
	isValid(elem) {
		const validatorMethod = {
			notEmpty(elem) {
				if (elem.value.trim() === ``) {
					return false;
				}
				return true;
			},
			pattern(elem, pattern) {
				return pattern.test(elem.value);
			}
		};
		if (this.method) {
			const method = this.method[elem.id];
			if (method) {
				return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
			}
		} else {
			console.warn(`Необходимо передать id полей ввода и методы проверки этих полей`);
		}
		return true;
	}
	checkIt(event) {
		const target = event.target;
		if (this.isValid(target)) {
			this.showSuccess(target);
			this.error.delete(target);
		} else {
			this.showError(target);
			this.error.add(target);
		}
	}
	showError(elem) {
		elem.classList.remove(`success`);
		elem.classList.add(`error`);
		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains(`validator-error`)) {
			return;
		}
		const errorDiv = document.createElement(`div`);
		errorDiv.textContent = `Ошибка в этом поле`;
		errorDiv.classList.add(`validator-error`);
		elem.insertAdjacentElement(`afterend`, errorDiv);
	}
	showSuccess(elem) {
		elem.classList.remove(`error`);
		elem.classList.add(`success`);
		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains(`validator-error`)) {
			elem.nextElementSibling.remove();
		}
	}
	applyStyle() {
		const style = document.createElement(`style`);
		style.textContent = `
			input.success {
				-webkit-box-shadow: 0px 0px 62px -39px rgba(25, 181, 254, 1) inset;
				-moz-box-shadow: 0px 0px 62px -39px rgba(25, 181, 254, 1) inset;
				box-shadow: 0px 0px 62px -39px rgba(25, 181, 254, 1) inset;
				transition: 300ms;
			}
			input.error {
				-webkit-box-shadow: 0px 0px 64px -29px rgba(255, 0, 0, 1) inset;
				-moz-box-shadow: 0px 0px 64px -29px rgba(255, 0, 0, 1) inset;
				box-shadow: 0px 0px 64px -29px rgba(255, 0, 0, 1) inset;
				transition: 300ms;
			}
			.validator-error {
				font-size: 12px;
				font-family: sans-serif;
				color: red;
				transform: translateX(50%) translateY(-2rem);
				position: absolute;
				user-select: none; 
			}
		`;
		document.head.appendChild(style);
	}
	setPattern() {
		if (!this.pattern.phone) {
			this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
		}
		if (!this.pattern.email) {
			this.pattern.email = /^\w+@\w+\.\w{2,3}$/;
		}
		if (!this.pattern.text) {
			this.pattern.text = /^[а-яёА-ЯЁ -]+/;
		}
	}
}
