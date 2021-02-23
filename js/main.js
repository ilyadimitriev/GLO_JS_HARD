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
		console.log(timer.timeRemaining);
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

const deadline = new Date().getTime() + 5000;
countTimer(deadline);

});
