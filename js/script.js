'use strict';

class Todo {
	constructor(form, input, todoList, todoCompleted) {
		this.form = document.querySelector(form);
		this.input = document.querySelector(input);
		this.todoList = document.querySelector(todoList);
		this.todoCompleted = document.querySelector(todoCompleted);
		this.todoData = new Map(JSON.parse(localStorage.getItem(`todoList`)));
	}
	addToStorage() {
		localStorage.setItem(`todoList`, JSON.stringify([...this.todoData]));
	}
	render() {
		this.todoList.textContent = ``;
		this.todoCompleted.textContent = ``;
		this.todoData.forEach(this.createItem, this);
		this.addToStorage();
	}
	createItem(todo) {
		const li = document.createElement(`li`);
		li.classList.add(`todo-item`);
		li.key = todo.key;
		li.insertAdjacentHTML(`beforeend`, `
		<span class="text-todo">${todo.value}</span>
		<div class="todo-buttons">
			<button class="todo-edit"></button>
			<button class="todo-remove"></button>
			<button class="todo-complete"></button>
		</div>`
		);
		if (todo.completed) {
			this.todoCompleted.append(li);
		} else {
			this.todoList.append(li);
		}
	}
	addTodo(event) {
		event.preventDefault();
		if (this.input.value.trim()) {
			this.removeAlert();
			const newTodo = {
				value: this.input.value,
				completed: false,
				key: this.generateKey(),
			};
			this.todoData.set(newTodo.key, newTodo);
			this.render();
			this.input.value = ``;
			this.input.focus();
		} else {
			this.showAlert();
		}
	}
	showAlert() {
		this.input.classList.add(`alert`);
		this.input.setAttribute(`placeholder`, `Поле не может быть пустым, введите текст`);
	}
	removeAlert() {
		this.input.classList.remove(`alert`);
		this.input.setAttribute(`placeholder`, `Какие планы?`);
	}
	handler(event) {
		if (event.target.matches(`.todo-buttons>button`)) {
			let target = event.target.closest(`.todo-remove`);
			if (target) {
				this.deleteItem.call(this, event);
				return;
			}
			target = event.target.closest(`.todo-complete`);
			if (target) {
				this.completedItem.call(this, event);
				return;
			}
			target = event.target.closest(`.todo-edit`);
			if (target) {
				this.editItem.call(this, event);
				return;
			}
		}
	}
	deleteItem(event) {
		const task = event.target.closest(`.todo-item`);
		this.todoData.forEach((elem, index) => {
			if (elem.key === task.key) {
				this.todoData.delete(index);
				// Анимируем удаление
				task.classList.add(`animate-delete`);
				// По окончании анимации запускаем рендер
				setTimeout(this.render.bind(this), 300);
			}
		});
	}
	completedItem(event) {
		const task = event.target.closest(`.todo-item`);
		this.todoData.forEach(elem => {
			if (elem.key === task.key) {
				elem.completed = !elem.completed;
				// Анимируем смену статуса задачи
				this.animateSelected(event, elem);
				// По окончании анимации запускаем рендер
				setTimeout(this.render.bind(this), 300);
			}
		});
	}
	editItem(event) {
		const task = event.target.closest(`.todo-item`);
		const _this = this;
		this.todoData.forEach(elem => {
			if (elem.key === task.key) {
				const span = task.querySelector(`span`);
				task.style.transition = `300ms`;
				if (span.getAttribute(`contenteditable`) === `true`) {
					span.setAttribute(`contenteditable`, false);
					task.classList.toggle(`animate-todo-item_blue`);
					elem.value = span.textContent;
				} else {
					span.setAttribute(`contenteditable`, true);
					task.classList.toggle(`animate-todo-item_blue`);
					span.focus();
					// Все что до следующего комментария - для установки курсора в конец строки при редактировании
					const range = document.createRange();
					range.selectNodeContents(span);
					range.collapse(false);
					const sel = window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
					// Отключаем редактирование, при снятии фокуса с поля редактора
					span.addEventListener(`blur`, event => {
						_this.editItem(event);
						// Запоминаем изменения
						setTimeout(this.render.bind(this), 300);
					}, {
						once: true
					});
				}
			}
		});
	}
	generateKey() {
		return Math.random().toString(16).substring(2, 15) + Math.random().toString(16).substring(2, 15);
	}
	init() {
		this.form.addEventListener(`submit`, this.addTodo.bind(this));
		this.input.addEventListener(`focus`, this.removeAlert.bind(this));
		document.querySelector(`.todo-container`).addEventListener(`click`, event => {
			this.handler.call(this, event);
		});
		this.render();
	}
	// Анимация смены статуса задачи
	animateSelected(event, elem) {
		// Сюда сохраняется id анимации, чтоб потом ее удалить
		let animationId,
			// Определяет, исчезла ли задача из изначального списка (выполненных или не выполненных)
			disappeared = false;
		// Узнаем, статус какой задачи был изменен
		const task = event.target.closest(`.todo-item`),
			// Узнаем, какой теперь статус у задачи
			completed = elem.completed;

		function animate() {
			animation();
			start();
		}
		function start() {
			// Пока не удалим анимацию, она будет стартовать
			if (animationId !== false) {
				animationId = requestAnimationFrame(animate);
			}
		}
		// Запускаем анимацию
		start();
		// Описание самой анимации
		function animation() {
			// Если задача еще не исчезла из изначального списка
			if (!disappeared) {
				task.classList.add(`animate-complete-fade_blue`);
				disappeared = !disappeared;
			}
			// Если задача уже перенесена в новый список
			if (task.parentNode === null) {
				// Список, в котором будем искать задачу после ее перемещения
				let container,
					// Сюда запишем задачу, когда обнаружем ее в другом списке
					taskCompleted = false;
				// Определяем в каком списке искать задачу
				if (completed) {
					container = document.querySelectorAll(`#completed .todo-item`);
				} else {
					container = document.querySelectorAll(`#todo .todo-item`);
				}
				// Ищем задачу, сохраняем в taskCompleted
				for (let i = 0; i < container.length; i++) {
					if (container[i].key === task.key) {
						taskCompleted = container[i];
						break;
					}
				}
				// Если задача обнаружилась,
				if (taskCompleted) {
					// Анимируем ее появление
					taskCompleted.classList.add(`animate-complete-fade_white`);
					// Удаляем анимацию, чтоб больше не запускалась
					animationId = false;
					// По окончании анимации приводим классы задачи к стандартному виду
					setTimeout(() => {
						taskCompleted.classList = `todo-item`;
					}, 300);
				}
			}
		}
	}
}

const todo = new Todo(`.todo-control`, `.header-input`, `.todo-list`, `.todo-completed`);
todo.init();
