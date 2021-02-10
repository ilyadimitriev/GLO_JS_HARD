'use strict';

let dateObj = {
    date: {},
    hourValue: 0,
    minValue: 0,
    secValue: 0,
    hourText: '',
    minText: '',
    secText: '',
    // Текст для первой строки
    content1: '',
    // Текст для второй строки
    content2: '',
    allMonths: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    dayOfTheWeek: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    // Получаем корректное название времени
    setText: function(){
        dateObj.hourText =
            (dateObj.hourValue === 1 || dateObj.hourValue === 21) ? 'час':
                (dateObj.hourValue === 2 || dateObj.hourValue === 3 || dateObj.hourValue === 4 || dateObj.hourValue === 22 || dateObj.hourValue === 23) ? 'часа' : 'часов';
        
        if (dateObj.minValue <= 4 || dateObj.minValue >= 21) {
            dateObj.minText =
                ((dateObj.minValue % 10) === 2 || (dateObj.minValue % 10) === 3 || (dateObj.minValue % 10) === 4) ? 'минуты':
                    ((dateObj.minValue % 10) === 1) ? 'минута': 'минут';
        }
        else {
            dateObj.minText = 'минут';
        }
        if (dateObj.secValue <= 4 || dateObj.secValue >= 21) {
            dateObj.secText =
                ((dateObj.secValue % 10) === 2 || (dateObj.secValue % 10) === 3 || (dateObj.secValue % 10) === 4) ? 'секунды':
                    ((dateObj.secValue % 10) === 1) ? 'секунда': 'секунд';
        }
        else {
            dateObj.secText = 'секунд';
        }
    },
    // Получаем значения свойств
    getContent: function(){
        dateObj.date = new Date();
        dateObj.hourValue = dateObj.date.getHours();
        dateObj.minValue = dateObj.date.getMinutes();
        dateObj.secValue = dateObj.date.getSeconds();
        dateObj.setText();

        let textCore = 'Сегодня ' + dateObj.dayOfTheWeek[dateObj.date.getDay()] + ', ' + dateObj.date.getDate() + ' ' + dateObj.allMonths[dateObj.date.getMonth()] + ' ' + dateObj.date.getFullYear() + ' года, ' + dateObj.hourValue + ' ' + dateObj.hourText;
        let textMinutes = ' ' + dateObj.minValue +' ' + dateObj.minText;
        let textSeconds = ' ' + dateObj.secValue + ' ' + dateObj.secText;
        dateObj.content1 = textCore;
        if (dateObj.minValue !== 0) {
            dateObj.content1 += textMinutes;
        }
        if (dateObj.secValue !== 0) {
            dateObj.content1 += textSeconds;
        }

        // Добавляем ноль перед числом при необходимости
        function addZero(num){
            return (num >= 0 && num <=9) ? '0' + num : num;
        }
        dateObj.content2 = addZero(dateObj.date.getDay()) + '.' + addZero(dateObj.date.getMonth()) + '.' + dateObj.date.getFullYear() + ' - ' + addZero(dateObj.hourValue) + ':' + addZero(dateObj.minValue) + ':' + addZero(dateObj.secValue);

    },
    // Добавляем строки на страницу
    create: function(){
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        dateObj.getContent();
        p1.innerHTML = dateObj.content1;
        p2.innerHTML = dateObj.content2;
        document.body.append(p1);
        document.body.append(p2);
    }
};

dateObj.create();
let start = setInterval(function(){
    // Получаем актуальное время
    dateObj.getContent();
    // Обновляем содержимое строк
    document.getElementsByTagName('p')[0].innerText = dateObj.content1;
    document.getElementsByTagName('p')[1].innerText = dateObj.content2;
}, 1000);
