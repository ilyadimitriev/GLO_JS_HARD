'use strict';

function DomElement(selector, height, width, bg, fontSize){
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.create = function(){
    let elem;
    if (this.selector[0] === '#') {
        elem = document.createElement('p');
        elem.id = this.selector.slice(1);

    }
    else if (this.selector[0] === '.') {
        elem = document.createElement('div');
        elem.classList = this.selector.slice(1);
    }
    else {
        return;
    }
    elem.style.cssText = 'height:' + this.height + ';width:' + this.width + ';background:' + this.bg + ';font-size:' + this.fontSize + ';';
    elem.textContent = 'В Швеции, например, начали эксперимент «одноминутный город» — власти страны хотят узнать, что происходит, когда машины исчезают с улиц';
    document.querySelector('body').prepend(elem);
};

const elem = new DomElement('#elem-div', '50px', '700px', '#b7f2ba', '20px');
elem.create();