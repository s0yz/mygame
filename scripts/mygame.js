let win;
let game;
const sw = 960;
const sh = 640;
var sound;

function preload() {
	
}

function setup() {
	frameRate(120);
	win = createCanvas(sw, sh);
	win.style('display', 'block');
	centerCanvas();
	game = new Game();
	colorMode(HSB);
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
    game.update();
    noFill();
    strokeWeight(5);
    rect(1, 1, width - 1, height - 1);
}