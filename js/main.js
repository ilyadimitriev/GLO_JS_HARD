'use strict';

const startBtnActive = document.querySelector(`.active-round`),
	reset = document.querySelector(`.reset`),
	round = document.querySelector(`.round`);

class Data  {
	constructor() {
		this.animationId = false;
		this.reverse = false;
		this.pause = true;
		this.count = 0;
		this.width = 100 + 'px';
		this.height = 100 + 'px';
		this.color = `#000000`;
		this.object = undefined;
	}
	addZero(num) {
		return (num.length === 1) ? '0' + num : num;
	}
	getColor() {
		let color = '';
		for (let i = 0; i < 3; i++) {
			color += this.addZero(Math.floor(Math.random() * 255).toString(16));
		}
		return `#` + color;
	}
	animate() {
		this.animationId = false;
		this.animation();
		this.start();
	}
	stop() {
		if (this.animationId) {
			cancelAnimationFrame(this.animationId);
			this.animationId = false;
		}
	}
	start() {
		if (!this.animationId) {
			this.animationId = requestAnimationFrame(this.animate.bind(this));
		}
	}
	reset() {
		const reset = new Data();
		this.animationId = reset.animationId;
		this.reverse = reset.reverse;
		this.pause = reset.pause;
		this.count = reset.count;
		this.width = reset.width;
		this.height = reset.height;
		this.color = reset.color;
		this.object.style.width = this.width;
		this.object.style.height = this.height;
		this.object.style.background = this.color;
	}
	animation() {
		this.object.style.width = this.width;
		this.object.style.height = this.height;
		this.object.style.background = this.color;
		if (this.reverse) {
			if (this.count !== 0) {
				this.count--;
				this.width = (+this.object.style.width.split('px')[0] - 3) + 'px';
				this.height = (+this.object.style.height.split('px')[0] - 3) + 'px';
			} else {
				this.color = this.getColor();
				this.reverse = false;
			}
		} else {
			if (this.count !== 10) {
				this.count++;
				this.width = (+this.object.style.width.split('px')[0] + 3) + 'px';
				this.height = (+this.object.style.height.split('px')[0] + 3) + 'px';
			} else {
				this.color = this.getColor();
				this.reverse = true;
			}
		}
	}
}

const program = new Data();
program.object = round;

startBtnActive.addEventListener(`click`, () => {
	program.pause = !program.pause;
	if (program.pause) {
		program.stop();
		startBtnActive.textContent = `start`;
	} else {
		program.start();
		reset.style.display = `block`;
		startBtnActive.textContent = `reset`;
	}
});

reset.addEventListener(`click`, () => {
	program.pause = true;
	program.stop();
	program.reset();
	reset.style.display = `none`;
	startBtnActive.textContent = `start`;
});
