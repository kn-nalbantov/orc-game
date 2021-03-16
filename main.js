import { loadBackground, fireball, deadTank} from './background.js';
import { healthCheck } from './health.js';
import { getRandomInt, solveForX, solveForY } from './help-functions.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//scaling for 15' displays
let height = canvas.height = 680;
let width = canvas.width = 1300;

//Loading backgrond assets
//Optimal delay intended for loading images
setTimeout(loadBackground, 200);

//Defining our orc character and attributes
let posX = 50;
let posY = 50;
let orcSrc = 0;
let health = 100;

let orc = new Image();
orc.src = `./Running/0_Orc_Running_000.png`;

orc.onload = function () {
    ctx.drawImage(orc, posX, posY, 150, 250);
}


//Adding event listeners and controls
window.addEventListener('keydown', moveAttack);

function moveAttack(e) {
    if (e.code === 'KeyD') {
        runRight();
    }
    if (e.code === 'KeyA') {
        runLeft();
    }
    if (e.code === 'KeyW') {
        runUp();
    }
    if (e.code === 'KeyS') {
        runDown();
    }
    if (e.code === 'KeyR') {
        attackAnimation();
    }
}

window.addEventListener('click', attack);

function attack() {
    attackAnimation();
}

function runRight() {
    orcSrc++;
    //CACTUS BUMPS
    if (posX > width - 100) {
        posX = width - 150;
        health -= 25;
        if (health < 0) {
            death();
        }
    } else {
        posX += 10;
    }
    //RIVER BUMPS
    if (posY < 70 && posX > 450 && posX < 600) {
        posX = 450;
    } else if (posY > 140 && posX > 500 && posX < 600) {
        posX = 500;
    }
    //TANK BUMPS
    if (isAlive) {
        if (posX > 520) {
            posX = 520;
        }
    }
    ctx.clearRect(0, 0, width, height);
    loadBackground();
    healthCheck();
    fireballCheck();
    tankCheck();
    ctx.drawImage(orc, 0 + posX, 0 + posY, 150, 250);
    if (orcSrc <= 9) {
        orc.src = `./Running/0_Orc_Running_00${orcSrc}.png`;
    } else if (orcSrc > 9 && orcSrc <= 11) {
        orc.src = `./Running/0_Orc_Running_0${orcSrc}.png`;
    } else if (orcSrc === 12) {
        orc.src = `./Running/0_Orc_Running_000.png`;
        orcSrc = 0;
    }
}

function runLeft() {
    orcSrc--;
    //CACTUS BUMP
    if (posX < 0) {
        posX = 50;
        health -= 25;
        if (health < 0) {
            death();
        }
    } else {
        posX -= 10;
    }
    //RIVER BUMPS
    if (posY < 70 && posX < 610 && posX > 500) {
        posX = 610;
    } else if (posY > 140 && posX < 700 && posX > 520) {
        posX = 700;
    }

    ctx.clearRect(0, 0, width, height);
    loadBackground();
    healthCheck();
    fireballCheck();
    tankCheck();
    ctx.drawImage(orc, 0 + posX, 0 + posY, 150, 250);
    if (orcSrc < 0) {
        orc.src = `./Running/0_Orc_Running_011.png`;
        orcSrc = 11;
    } else if (orcSrc <= 11 && orcSrc > 9) {
        orc.src = `./Running/0_Orc_Running_0${orcSrc}.png`;
    } else if (orcSrc <= 9) {
        orc.src = `./Running/0_Orc_Running_00${orcSrc}.png`;
    }
}

function runUp() {
    orcSrc++;
    //BUMP OFF EDGE OF MAP
    if (posY < -110) {
        posY = -90;
    } else {
        posY -= 10;
    }
    //BRIDGE BUMPS
    if (posX > 500 && posX < 610 && posY < 70) {
        posY = 70;
    }
    ctx.clearRect(0, 0, width, height);
    loadBackground();
    healthCheck();
    fireballCheck();
    tankCheck();
    ctx.drawImage(orc, 0 + posX, 0 + posY, 150, 250);
    if (orcSrc <= 9) {
        orc.src = `./Running/0_Orc_Running_00${orcSrc}.png`;
    } else if (orcSrc > 9 && orcSrc <= 11) {
        orc.src = `./Running/0_Orc_Running_0${orcSrc}.png`;
    } else if (orcSrc === 12) {
        orc.src = `./Running/0_Orc_Running_000.png`;
        orcSrc = 0;
    }
}

function runDown() {
    orcSrc--;
    //BUMP OFF EDGE OF MAP
    if (posY > 480) {
        posY = 450;
    } else {
        posY += 10;
    }
    //BRIDGE BUMPS
    if (posX > 510 && posX < 700 && posY > 140) {
        posY = 140;
    }
    ctx.clearRect(0, 0, width, height);
    loadBackground();
    healthCheck();
    fireballCheck();
    tankCheck();
    ctx.drawImage(orc, 0 + posX, 0 + posY, 150, 250);
    if (orcSrc < 0) {
        orc.src = `./Running/0_Orc_Running_011.png`;
        orcSrc = 11;
    } else if (orcSrc <= 11 && orcSrc > 9) {
        orc.src = `./Running/0_Orc_Running_0${orcSrc}.png`;
    } else if (orcSrc <= 9) {
        orc.src = `./Running/0_Orc_Running_00${orcSrc}.png`;
    }
}

//Setting up orc attack frames
let orcArray = [];
for (let i = 0; i <= 9; i++) {
    let atkOrc = new Image();
    atkOrc.src = `./Slashing/0_Orc_Slashing_00${i}.png`;
    orcArray.push(atkOrc);
}

let atkorc10 = new Image();
atkorc10.src = `./Slashing/0_Orc_Slashing_010.png`;

let atkorc11 = new Image();
atkorc11.src = `./Slashing/0_Orc_Slashing_011.png`;

orcArray.push(atkorc10);
orcArray.push(atkorc11);

let loop;
let orcFrame = 0;
let x = 0;

function  attackAnimation() {
    window.removeEventListener('click', attack);
    window.removeEventListener('keydown', moveAttack);
    x++;

    if (x % 5 === 0) {
        if (orcFrame === 11) {
            //Putting damage on tank
            if (posX >= 500 && posY >= 70 && posY <= 140) {
                tankHp -= 25;
                if (tankHp === 0) {
                    isAlive = false;
                }
            }
            //Putting damage on castle
            if (posX >= 880 && posY >= -90 && posY <= 140) {
                castleHp -= 20;
                if (castleHp === 0) {
                    isDestroyed = true;
                    win();
                }
            }
            orcFrame = 0;
        } else {
            orcFrame++;
        }
    }

    ctx.clearRect(0, 0, width, height);
    loadBackground();
    healthCheck();
    fireballCheck();
    tankCheck();
    ctx.drawImage(orcArray[orcFrame], 0 + posX, 0 + posY, 150, 250);

    loop = window.requestAnimationFrame(attackAnimation);
    if (x === 60) {
        window.cancelAnimationFrame(loop);
        window.addEventListener('click', attack);
        window.addEventListener('keydown', moveAttack);
        x = 0;
    }
}

//Defining enemy characters
let elfFrame = 0;
let isDestroyed = false;
let castleHp = 100;

let elfArray = [];
for (let i = 0; i < 20; i++) {
    let elfAtk = new Image();
    if (i < 10) {
        elfAtk.src = `./elfAtk/4_animation_attack_00${i}.png`;
    } else {
        elfAtk.src = `./elfAtk/4_animation_attack_0${i}.png`;
    }
    elfArray.push(elfAtk);
}

let tankFrame = 0;
let isAlive = true;

let tankArray = [];
for (let i = 0; i < 20; i++) {
    let tankAtk = new Image();
    if (i < 10) {
        tankAtk.src = `./Tankatk/6_animation_attack_00${i}.png`;
    } else {
        tankAtk.src = `./Tankatk/6_animation_attack_0${i}.png`;
    }
    tankArray.push(tankAtk);
}


//defining fireball params
let isActive = false;
let fireballX = 1000;
let fireballY = 150;
let point2X = 400;
let point2Y = 200;

//activating fireballs
setInterval(function () {
    point2X = getRandomInt(60, 550);
    point2Y = getRandomInt(75, 550);
    if (!isActive) {
        isActive = true;
        fireballAnimation();
    } else {
        isActive = false;
    }
}, 2500);


let fireballLoop;
let x1 = 0;
let time = 0;

function fireballAnimation() {
    ctx.clearRect(0, 0, width, height);
    loadBackground();
    healthCheck();
    tankCheck();
    ctx.drawImage(orc, posX, posY, 150, 250);
    //draw elf
    if (!isDestroyed) {
        ctx.drawImage(elfArray[elfFrame], width - 300, height / 20, 150, 150);
        if (x1 % 6 === 0) {
            if (elfFrame === 19) {
                elfFrame = 0;
            } else {
                elfFrame++;
            }
        }
        //draw fireball
        ctx.drawImage(fireball, fireballX, fireballY, 50, 50);
        ctx.strokeStyle = 'red';
        //draw warning ellipse
        ctx.beginPath();
        ctx.lineWidth = 5;
        let targetX = solveForX(1, 1000, 950, point2X);
        let targetY = solveForY(1, 150, -150, point2Y);
        ctx.ellipse(targetX, targetY, 25, 45, Math.PI / 2, 0, 2 * Math.PI);
        ctx.stroke();
        time += 0.008333333333333333;
        fireballX = solveForX(time, 1000, 950, point2X) - 25;
        fireballY = solveForY(time, 150, -150, point2Y) - 20;
        if (time === 0.9999999999999989) {
            if ((targetX >= posX && targetX <= posX + 150) && (targetY >= posY && targetY <= posY + 250)) {
                health -= 25;
                if (health < 0) {
                    death();
                }
            }
        }
    }
    x1++;
    fireballLoop = window.requestAnimationFrame(fireballAnimation);
    if (x1 === 120) {
        window.cancelAnimationFrame(fireballLoop);
        x1 = 0;
        fireballX = 1000;
        fireballY = 150;
        time = 0;
        isActive = false;
        elfFrame = 0;
    }
}

function fireballCheck() {
    if (!isDestroyed) {
        if (isActive) {
            ctx.drawImage(fireball, fireballX, fireballY, 50, 50);
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.ellipse(solveForX(1, 1000, 950, point2X), solveForY(1, 150, -150, point2Y), 25, 45, Math.PI / 2, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
}

//defining tank params
let isAttacking = false;
let tankHp = 100;
let tankLoop;
let x2 = 0;

//activating tank attacks
setInterval(function () {
    if (!isAttacking) {
        isAttacking = true;
        tankAnimation();
    } else {
        isAttacking = false;
    }
}, getRandomInt(4000, 8001));

function tankAnimation() {
    ctx.clearRect(0, 0, width, height);
    loadBackground();
    healthCheck();
    fireballCheck();
    ctx.drawImage(orc, posX, posY, 150, 250);

    if (isAlive) {
        //draw warning ellipse
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.ellipse(width / 2 + 50, height / 2 - 50, 45, 95, Math.PI / 2, 0, 2 * Math.PI);
        ctx.stroke();
        //draw tank
        ctx.drawImage(tankArray[tankFrame], width / 2 - 100, height / 4 - 75, 250, 250);
        if (x2 === 119) {
            if (posX >= 500 && posY >= 70 && posY <= 140) {
                health -= 25;
                if (health < 0) {
                    death();
                }
            }
        }
    } else {
        ctx.drawImage(deadTank, width / 2 - 100, height / 4 - 75, 250, 250);
    }

    if (x2 > 120) {
        if (x2 % 3 === 0) {
            if (tankFrame === 19) {
                tankFrame = 0;
            } else {
                tankFrame++;
            }
        }
    }
    ctx.drawImage(orc, posX, posY, 150, 250);
    x2++;
    tankLoop = requestAnimationFrame(tankAnimation);

    if (x2 === 180) {
        window.cancelAnimationFrame(tankLoop);
        x2 = 0;
        tankFrame = 0;
        isAttacking = false;
        ctx.clearRect(0, 0, width, height);
        loadBackground();
        healthCheck();
        fireballCheck();
        if (isAlive) {
            ctx.drawImage(tankArray[tankFrame], width / 2 - 100, height / 4 - 75, 250, 250);
        }
        ctx.drawImage(orc, posX, posY, 150, 250);
    }
}

function tankCheck() {
    if (isAlive) {
        if (isAttacking) {
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 5;
            ctx.ellipse(width / 2 + 50, height / 2 - 50, 45, 95, Math.PI / 2, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.drawImage(tankArray[tankFrame], width / 2 - 100, height / 4 - 75, 250, 250);
        } else {
            ctx.drawImage(tankArray[tankFrame], width / 2 - 100, height / 4 - 75, 250, 250);
        }
    } else {
        ctx.drawImage(deadTank, width / 2 - 100, height / 4 - 75, 250, 250);
    }
}


function death() {
    setTimeout(function () {
        let result = window.confirm('You died. Reset game?');
        if (result) {
            window.location.reload();
        }
    }, 500);
}

function win() {
    setTimeout(function () {
        let result = window.confirm('Congratulations you won! Reset game?');
        if (result) {
            window.location.reload();
        }
    }, 500);
}


export {ctx, width, height, health, posX, posY, isDestroyed, elfArray, elfFrame, isAlive, tankArray, tankFrame};    