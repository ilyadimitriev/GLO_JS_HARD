'use strict';

function doJS(glo){
    if (typeof glo !== 'string') {
        return 'Внимание! Переданный функции doJS() аргумент не является сторокой.';
    }
    else {
        glo = glo.trim();
        if (glo.length > 30) {
            return glo.substring(0, 3) + '...';
        }
        else {
            return glo;
        }
    }
}

alert(doJS(prompt('Введите любой текст:', '   Самое частое нарушение среди пешеходов – переход проезжей части вне установленных мест (69% случаев). ')));
