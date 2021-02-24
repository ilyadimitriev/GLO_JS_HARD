/* eslint-disable indent */
`use strict`;

window.addEventListener(`DOMContentLoaded`, () => {

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

const deadline = new Date().getTime() + 52342000;
countTimer(deadline);

const toggleMenu = () => {
	const menu = document.querySelector(`menu`);

	document.addEventListener(`click`, event => {
		let target = event.target.closest(`.active-menu`);
		if (menu.classList.contains(`active-menu`)) {
			if (!target || event.target.matches(`.active-menu a`)) {
				menu.classList.toggle(`active-menu`);
			}
		} else {
			target = event.target.closest(`.menu`);
			if (target) {
				menu.classList.toggle(`active-menu`);
			}
		}
	});
};

toggleMenu();

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

});
