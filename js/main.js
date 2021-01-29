"use strict";

const num = 266219;


function multDigits() {
    let n = 1;
    for (let i = num.toString().length - 1; i >= 0; --i) {
        n = n * num.toString()[i];
    }
    console.log(n);
    n = n ** 3;
    console.log(n.toString().substring(0,2));
}

console.log(multDigits());