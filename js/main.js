/* eslint-disable indent */
`use strict`;

window.addEventListener(`DOMContentLoaded`, () => {

	// Таймер
function countTimer(deadline) {

	const timerHours = document.querySelector(`#timer-hours`),
		timerMinutes = document.querySelector(`#timer-minutes`),
		timerSeconds = document.querySelector(`#timer-seconds`);
	let timer = getTimeRemaining();
	let idInterval;

	function addZeros(num) {
		num = num.toString();
		return (num.length <= 1) ? `0` + num : num;
	}

	function getTimeRemaining() {
		const dateStop = new Date(deadline).getTime(),
			dateNow = new Date().getTime(),
			timeRemaining = Math.ceil((dateStop - dateNow) / 1000),
			seconds = addZeros(Math.floor(timeRemaining % 60)),
			minutes = addZeros(Math.floor((timeRemaining / 60) % 60)),
			hours = addZeros(Math.floor(timeRemaining / 60 / 60));
		return { timeRemaining, hours, minutes, seconds };
	}

	function updateClock() {
		timer = getTimeRemaining();
		timerHours.textContent = timer.hours;
		timerMinutes.textContent = timer.minutes;
		timerSeconds.textContent = timer.seconds;
		if (timer.timeRemaining <= 0) {
			clearInterval(idInterval);
		}
	}
	if (timer.timeRemaining > 0) {
		updateClock();
		idInterval = setInterval(updateClock, 1000);
	} else {
		timerHours.textContent = `00`;
		timerMinutes.textContent = `00`;
		timerSeconds.textContent = `00`;
	}
}
countTimer(new Date().getTime() + 52342000);

	// Плавная прокрутка
const smoothScroll = event => {
	event.preventDefault();
	const target = event.target.closest(`a`),
		destination = target.getAttribute(`href`);
	document.querySelector(destination).scrollIntoView({
		behavior: 'smooth',
		block: 'start'
	});
};

	// Управление меню
const toggleMenu = () => {
	const menu = document.querySelector(`menu`);

	const handlerMenu  = () => {
		menu.classList.toggle(`active-menu`);
	};

	document.querySelector(`body`).addEventListener(`click`, event => {
		let target;
		if (menu.classList.contains(`active-menu`)) {
			target = event.target.closest(`.active-menu`);
			if (!target || event.target.matches(`.active-menu a`)) {
				if (event.target.matches(`.active-menu>ul>li>a`)) {
					smoothScroll(event);
				}
				handlerMenu();
			}
		} else {
			target = event.target.closest(`.menu`);
			if (target) {
				handlerMenu();
			}
		}
	});
};
toggleMenu();

	// Всплывающее окно
const togglePopUp = () => {
	const popup = document.querySelector(`.popup`),
		popupBtn = document.querySelectorAll(`.popup-btn`),
		popupContent = document.querySelector(`.popup-content`);
	let animation,
	countY = -50,
	countOpacity = 0;

	const animatePopUp = () => {
		animation = requestAnimationFrame(animatePopUp);
		if (countY < 20 || countOpacity < 1) {
			if (countY < 20) {
				countY += 2;
				popupContent.style.top = countY + `%`;
			}
			if (countOpacity < 1) {
				countOpacity += 0.05;
				popup.style.opacity = countOpacity;
			}
		} else {
			countY = -50;
			countOpacity = 0;
			cancelAnimationFrame(animation);
		}
	};

	popupBtn.forEach(elem => {
		elem.addEventListener(`click`, () => {
			popup.style.display = `block`;
			if (screen.width >= 768) {
			animation = requestAnimationFrame(animatePopUp);
			}
		});
	});

	popup.addEventListener(`click`, event => {
		if (event.target === popup || event.target.matches(`.popup-close`)) {
			popup.style.display = `none`;
		}
	});
};
togglePopUp();

	// Переключение табов Наши услуги
const tabs = () => {
	const tabHeader = document.querySelector(`.service-header`),
		tab = tabHeader.querySelectorAll(`.service-header-tab`),
		tabContent = document.querySelectorAll(`.service-tab`);

	const toggleTabContent = index => {
		for (let i = 0; i < tabContent.length; i++) {
			if (index === i) {
				tab[i].classList.add(`active`);
				tabContent[i].classList.remove(`d-none`);
			} else {
				tab[i].classList.remove(`active`);
				tabContent[i].classList.add(`d-none`);
			}
		}
	};
	tabHeader.addEventListener(`click`, event => {
		let target = event.target;
		target = target.closest(`.service-header-tab`);
		if (target) {
			tab.forEach((item, i) => {
				if (item === target) {
					toggleTabContent(i);
				}
			});
		}
	});
};
tabs();

	// Переход по кнопке в первом блоке
document.querySelector(`main>a`).addEventListener(`click`, event => {
	smoothScroll(event);
});

	// Слайдер
const  slider = () => {
	const slide = document.querySelectorAll(`.portfolio-item`),
		slider = document.querySelector(`.portfolio-content`);

	let currentSlide = 0,
		interval,
		dot;

		// Добавить точки по числу слайдов
	const addDots = () => {
		let amount = slide.length;
		const newDot = document.createElement(`li`),
			portfolioDots = document.querySelector(`.portfolio-dots`);

		newDot.classList.add(`dot`);
		do {
			portfolioDots.insertAdjacentElement("beforeend", newDot.cloneNode());
			amount--;
		} while (amount > 0);
		dot = document.querySelectorAll(`.dot`);
		dot[0].classList.add(`dot-active`);
	};
	addDots();

	const prevSlide = (elem, index, strClass) => {
		elem[index].classList.remove(strClass);
	};
	const nextSlide = (elem, index, strClass) => {
		elem[index].classList.add(strClass);
	};
	const autoPlaySide = () => {
		prevSlide(slide, currentSlide, `portfolio-item-active`);
		prevSlide(dot, currentSlide, `dot-active`);
		currentSlide++;
		if (currentSlide >= slide.length) {
			currentSlide = 0;
		}
		nextSlide(slide, currentSlide, `portfolio-item-active`);
		nextSlide(dot, currentSlide, `dot-active`);
	};
	const startSlide = (time = 3000) => {
		interval = setInterval(autoPlaySide, time);
	};
	const stopSlide = () => {
		clearInterval(interval);
	};
	slider.addEventListener(`click`, event => {
		event.preventDefault();
		const target = event.target;
		if (!target.matches(`.portfolio-btn, .dot`)) {
			return;
		}
		prevSlide(slide, currentSlide, `portfolio-item-active`);
		prevSlide(dot, currentSlide, `dot-active`);

		if (target.matches(`#arrow-right`)) {
			currentSlide++;
		} else if (target.matches(`#arrow-left`)) {
			currentSlide--;
		} else if (target.matches(`.dot`)) {
			dot.forEach((elem, index) => {
				if (elem === target) {
					currentSlide = index;
				}
			});
		}

		if (currentSlide >= slide.length) {
			currentSlide = 0;
		}
		if (currentSlide < 0) {
			currentSlide = slide.length - 1;
		}
		nextSlide(slide, currentSlide, `portfolio-item-active`);
		nextSlide(dot, currentSlide, `dot-active`);
	});
	slider.addEventListener(`mouseover`, event => {
		if (event.target.matches(`.portfolio-btn`) || event.target.matches(`.dot`)) {
			stopSlide();
		}
	});
	slider.addEventListener(`mouseout`, event => {
		if (event.target.matches(`.portfolio-btn`) || event.target.matches(`.dot`)) {
			startSlide(1500);
		}
	});
	startSlide(1500);
};
slider();

	// Наведение на фото команды
const changeCommandPhoto = () => {
	const command = document.querySelectorAll(`.command__photo`);
	const togglePhoto = event => {
			const altImgSrc = event.target.getAttribute(`src`);
			event.target.setAttribute(`src`, event.target.dataset.img);
			event.target.dataset.img = altImgSrc;
	};
	command.forEach(commandMember => {
		commandMember.addEventListener(`mouseenter`, togglePhoto);
		commandMember.addEventListener(`mouseleave`, togglePhoto);
	});
};
changeCommandPhoto();

	// Ограничение на ввод символов в полях ввода имени, сообщения, телефона, эл. почты и данных калькулятора
const restrictInput = () => {
	document.addEventListener(`input`, event => {
		const target = event.target.closest(`input`);
		if (target) {
			if (target.classList.contains(`calc-item`)) {
				target.value = target.value.replace(/[^\d]/g, ``);
				return;
			}
			switch (target.getAttribute(`name`)) {
				case `user_name`:
				case `user_message`:
					target.value = target.value.replace(/[^а-яё -]/gi, ``);
					break;
				case `user_email`:
					target.value = target.value.replace(/[^\w'*~!.@-]/gi, ``);
					break;
				case 'user_phone':
					target.value = target.value.replace(/[^\d()-]/gi, ``);
					break;
			}
		}
	});
};
restrictInput();

	// Проверка и приведение введенных данных на валидность
const checkInputData = () => {
	const check = event => {
		const target = event.target;
			if (target.getAttribute(`name`).match(/^user_(name|message|email|phone)$/) && target.value !== ``) {
				target.value = target.value.replace(/^(-| ){1,}|(-| ){1,}$/g, ``);
				target.value = target.value.replace(/-{2,}/g, `-`);
				target.value = target.value.replace(/ {2,}/g, ` `);
			}
			if (target.getAttribute(`name`) === `user_name` && target.value !== ``) {
				// Создаем массив из отдельных слов
				const words = target.value.match(/[^ |-]{1,}/g);
				words.forEach((word, index) => {
					let regWord;
					// capitalize полученные слова
					word = word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
					if (index === 0) {
						regWord = new RegExp(word, `i`);
					} else if (index === words.length - 1) {
						regWord = new RegExp(word + `$`, `i`);
					} else {
						regWord = new RegExp(`[^а-яё]` + word + `[^а-яё]`, `ig`);
						const newWord = target.value.match(regWord)[0];
						word = newWord.slice(0, 2).toUpperCase() + newWord.slice(2).toLowerCase();
					}
					target.value = target.value.replace(regWord, word);
				});
			}
	};
	const allRequiredInputs = document.querySelectorAll(`input[name="user_name"], input[name="user_message"], input[name="user_email"], input[name="user_phone"]`);

	allRequiredInputs.forEach(elem => {
		elem.addEventListener(`blur`, check);
	});
};
checkInputData();
});
