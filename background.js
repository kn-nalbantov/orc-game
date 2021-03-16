import {ctx, width, height, isDestroyed, elfArray, elfFrame, isAlive, tankArray, tankFrame} from './main.js';


//Adding and preloading background assets
let dirtroad = new Image();
dirtroad.src = './images/dirtroad.png';

dirtroad.onload = function () {
    ctx.drawImage(dirtroad, 0, 0, 10, 10);
    ctx.clearRect(dirtroad, 0, 0, 10, 10);
}

let dirtroad2 = new Image();
dirtroad2.src = './images/dirtroad2.png';

dirtroad2.onload = function () {
    ctx.drawImage(dirtroad2, 0, 0, 10, 10);
    ctx.clearRect(0, 0, 10, 10);
}

let river = new Image();
river.src = './images/river.png';

river.onload = function () {
    ctx.drawImage(river, 0, 0, 10, 10);
    ctx.clearRect(0, 0, 10, 10);
}


let bridge = new Image();
bridge.src = './images/bridge.png';

bridge.onload = function () {
    ctx.drawImage(bridge, 0, 0, 10, 10);
    ctx.clearRect(0, 0, 10, 10);
}

let castle = new Image();
castle.src = './images/castle.png';

castle.onload = function () {
    ctx.drawImage(castle, 0, 0, 10, 10);
    ctx.clearRect(0, 0, 10, 10);
}


let destroyedCastle = new Image();
destroyedCastle.src = './images/death.png';
destroyedCastle.onload = function () {
    ctx.drawImage(destroyedCastle, 10, 10, 10, 10);
    ctx.clearRect(0, 0, 10, 10);
}

let deadTank = new Image();
deadTank.src = './images/deadTank.png';
deadTank.onload = function () {
    ctx.drawImage(deadTank, 10, 10, 10, 10);
    ctx.clearRect(0, 0, 10, 10);
}


function loadBackground() {
    ctx.drawImage(dirtroad, 50, height / 4, width / 2 - 50, 300);
    ctx.drawImage(dirtroad2, width / 2 + 50, height / 4, width / 2 - 50, 250);
    ctx.drawImage(river, width / 2 - 125, 0, 250, height);
    ctx.drawImage(bridge, width / 2 - 100, height / 4 + 70);
    if (isDestroyed) {
        ctx.drawImage(destroyedCastle, width - 300, height / 20, 250, 250);
    } else {
        ctx.drawImage(castle, width - 300, height / 20, 250, 250);
        ctx.drawImage(elfArray[elfFrame], width - 300, height / 20, 150, 150);
    }
    if (isAlive) {
        ctx.drawImage(tankArray[tankFrame], width / 2 - 100, height / 4 - 75, 250, 250);
    } else {
        ctx.drawImage(deadTank, width / 2 - 100, height / 4 - 75, 250, 250);
    }
}


let fireball = new Image();
fireball.src = './images/fireball2.png';

fireball.onload = function () {
    ctx.drawImage(fireball, 10, 10, 10, 10);
    ctx.clearRect(0, 0, 10, 10);
}


export {loadBackground, fireball, deadTank};