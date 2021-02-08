'use strict';

// Задаем массив дней недели
let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
// Получаем данные о дате и времени
let date = new Date();

function getDayOfWeek(today){
    // Приводим в соответствие российский порядок дней в неделе с используемым в js
    today = (today === 0) ? 6 : today - 1;
    // Перебор дней в неделе
    for (let day in week) {
        let p = document.createElement('p');
        p.innerHTML = week[day];        
        // Если выходной, то
        if (+day === 5 || +day === 6) {
            p.className = 'weekend';
            // Если сегодня один из выходных
            if (+day === today) {
                p.classList.add('this-day');
                document.body.append(p);

            }
            // Если выходной не сегодня
            else {
                document.body.append(p);
            }
        }
        // Если будний день
        else {
            // Если сегодня будний день
            if (+day === today) {
                p.classList.add('this-day');
                document.body.append(p);
            }
            // Если будний день не сегодня
            else {
                document.body.append(p);
            }
        }
    }
}

getDayOfWeek(date.getDay());