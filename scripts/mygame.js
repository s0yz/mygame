let win;
let game;
const sw = 960;
const sh = 540;

function preload() {

}

function setup() {
    frameRate(120);
    win = createCanvas(sw, sh, /*WEBGL*/);
    win.style('display', 'block');
    centerCanvas();
    game = new Game();
    colorMode(HSB);
    textSize(32);
}

function windowResized() {
    resizeScreen(game.fscrn);
}

function centerCanvas() {
    win.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

function resizeScreen(full) {
    if (!full) resizeCanvas(sw, sh);
    else resizeCanvas(windowWidth * .99, windowHeight * .98);
    centerCanvas();
}

function keyPressed() {
    game.keyPressed(keyCode);
}

function keyReleased() {
    game.keyReleased(keyCode);
}

function mousePressed() {
    game.mousePressed(mouseButton);
}

function mouseReleased() {
    game.mouseReleased(mouseButton);
}

function draw() {
    //background(25);
    //translate(-width / 2, -height / 2, 0);
    game.update();
    noFill();
    stroke(0);
    strokeWeight(8);
    rect(0, 0, width, height);
    //orb();
}

let s = 100;
let up = false;

function orb() {
    //ellipse(40, 315, 20);
    stroke(0);
    fill(0, s, 100);
    strokeWeight(2);
    ellipse(40, 315, 20);
    noStroke();
    if (up) s += 2;
    else s -= 2;
    if (s >= 100) up = false;
    else if (s <= 25) up = true;

}
