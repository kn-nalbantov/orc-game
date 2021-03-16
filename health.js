import { health, ctx, posX, posY } from './main.js';

//Pre-loading health bars
let hp100 = new Image();
hp100.src = './Healthbar/hp100.png';

hp100.onload = function () {
    ctx.drawImage(hp100, posX, posY + 140, 140, 190);
}

let hp75 = new Image();
hp75.src = './Healthbar/hp75.png';

hp75.onload = function () {
    ctx.drawImage(hp75, 0, 0, 10, 10);
    ctx.clearRect(0, 0, 10, 10);
}

let hp50 = new Image();
hp50.src = './Healthbar/hp50.png';

hp50.onload = function () {
    ctx.drawImage(hp50, 0, 0, 10, 10);
    ctx.clearRect(0, 0, 10, 10);
}

let hp25 = new Image();
hp25.src = './Healthbar/hp25.png';

hp25.onload = function () {
    ctx.drawImage(hp25, 0, 0, 10, 10);
    ctx.clearRect(0, 0, 10, 10);
}

let hp0 = new Image();
hp0.src = './Healthbar/hp0.png';

hp0.onload = function () {
    ctx.drawImage(hp0, 0, 0, 10, 10);
    ctx.clearRect(0, 0, 10, 10);
}

let hpDead = new Image();
hpDead.src = './Healthbar/dead.png';

hpDead.onload = function () {
    ctx.drawImage(hpDead, 0, 0, 10, 10);
    ctx.clearRect(0, 0, 10, 10);
}

function healthCheck() {
    if (health > 75) {
        loadHealthbar(hp100);
    } else if (health > 50) {
        loadHealthbar(hp75);
    } else if (health > 25) {
        loadHealthbar(hp50);
    } else if (health > 0) {
        loadHealthbar(hp25);
    } else if (health === 0) {
        loadHealthbar(hp0);
    } else {
        loadHealthbar(hpDead);
    }
}


function loadHealthbar(hp) {
    ctx.drawImage(hp, posX, posY + 140, 140, 190);
}


export {healthCheck}