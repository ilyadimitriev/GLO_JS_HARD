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
    return elem;
};

DomElement.prototype.fixPosition = function(){
    document.querySelector(this.selector).style.position = 'absolute';
    document.querySelector(this.selector).style.top = 0;
    document.querySelector(this.selector).style.left = 0;
};

DomElement.prototype.moveElem = function(event) {
    let top = document.querySelector(this.selector).style.top;
    let left = document.querySelector(this.selector).style.left;
    if (event.key === 'ArrowUp') {
        document.querySelector(this.selector).style.top = (+top.replace(/px/g, '') - 10).toString() + 'px';
    }
    else if (event.key === 'ArrowDown') {
        document.querySelector(this.selector).style.top = (+top.replace(/px/g, '') + 10).toString() + 'px';
    }
    else if (event.key === 'ArrowLeft') {
        document.querySelector(this.selector).style.left = (+left.replace(/px/g, '') - 10).toString() + 'px';
    }
    else if (event.key === 'ArrowRight') {
        document.querySelector(this.selector).style.left = (+left.replace(/px/g, '') + 10).toString() + 'px';
    }
    else {
        return;
    }
};

const elem = new DomElement('#elem-div', '100px', '100px', 'red', '0', 'absolute');

document.addEventListener('DOMContentLoaded', function(){
    elem.create();
    elem.fixPosition();
    document.addEventListener('keydown', function(event){
        elem.moveElem(event);
    });
});