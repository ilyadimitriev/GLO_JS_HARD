'use strict';

// Задаем массив дней недели
let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
// Получаем данные о дате и времени
let date = new Date();

function getDayOfWeek(today){
    // Приводим в соответствие российский порядок дней в неделе с используемым в js
    if (today === 0) {
        today = 6;
    }
    else {
        today -= 1;
    }
    // Перебор дней в неделе
    for (let day in week) {
        // Если выходной, то
        if (+day === 5 || +day === 6) {
            // Если сегодня один из выходных
            if (+day === today) {
                console.log('%c%s', 'font-style: italic; font-weight: bold;', week[day]);
            }
            // Если выходной не сегодня
            else {
                console.log('%c%s', 'font-style: italic;', week[day]);
            }
        }
        // Если будний день
        else {
            // Если сегодня будний день
            if (+day === today) {
                console.log('%c%s', 'font-weight: bold;', week[day]);
            }
            // Если будний день не сегодня
            else {
                console.log(week[day]);
            }
        }
    }
}

getDayOfWeek(date.getDay());