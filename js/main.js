'use strict';

const lang = 'en';
const weekArr = {'ru':['Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье'], 'en': ['Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday']};

const namePerson = 'Илья';
let status = (namePerson === 'Артем') ? 'директор' :
    (namePerson === 'Максим') ? 'преподаватель': 'студент';


if (lang === 'ru') {
    console.log('Через if: ' + 'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
}
else if (lang === 'en') {
    console.log('Через if: ' + 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
}

switch (lang) {
    case 'ru':
        console.log('Через switch: ' + 'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
        break;
    case 'en': 
        console.log('Через switch: ' + 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
        break;
}

console.log('Через массив: ' + weekArr[lang]);
console.log(namePerson + ': ' + status);