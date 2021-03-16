function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//Solving Bezier curve formula to find (x, y) coords of fireball parabola
function solveForX(time, Point0, Point1, Point2) {
    let t = Number(time);
    let p0 = Number(Point0);
    let p1 = Number(Point1);
    let p2 = Number(Point2);

    let x;

    x = (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;

    return x;
}

function solveForY(time, Point0, Point1, Point2) {
    let t = Number(time);
    let p0 = Number(Point0);
    let p1 = Number(Point1);
    let p2 = Number(Point2);

    let y;

    y = (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;

    return y;
}


export {getRandomInt, solveForX, solveForY}