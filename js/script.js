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
				this.deleteItem.call(this, event.target.closest(`.todo-item`));
				return;
			}
			target = event.target.closest(`.todo-complete`);
			if (target) {
				this.completedItem.call(this, event.target.closest(`.todo-item`));
				return;
			}
		}
	}
	deleteItem(task) {
		this.todoData.forEach((elem, index) => {
			if (elem.key === task.key) {
				this.todoData.delete(index);
				this.render();
			}
		});
	}
	completedItem(task) {
		this.todoData.forEach(elem => {
			if (elem.key === task.key) {
				elem.completed = !elem.completed;
				this.render();
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
}

const todo = new Todo(`.todo-control`, `.header-input`, `.todo-list`, `.todo-completed`);
todo.init();
