class Game {
	constructor() {
		this.blood = [];
		this.bullets = [];
		this.ennemies = [];
		this.fscrn =  false;
		this.player = new Player(this, createVector(width*.5, height*.5), 20);
		this.bars = [new Bar(30, 460, this.player, 'hp', 'max_hp', 0),
					 new Bar(30, 490, this.player, 'stamina', 'max_stamina', 100)]
		this.ennemies.push(new Ennemy(this, createVector()));
		this.bground = new Background();
	}
}

Game.prototype.keyPressed = function(key) {
	switch (key) {
		case 32:
		// Spacebar
			this.player.dash(true);
			break;
		case 65:
		// A
			this.player.direction.x = -1;
			break;
		case 68:
		// D
			this.player.direction.x = 1;
			break;
		case 80:
		//P
			//this.fscrn = !this.fscrn
			resizeScreen(this.fscrn = !this.fscrn);
			break;
		case 82:
		// R
			if (!this.player.reloading) {
				this.player.reloading = true;
				//setTimeout(this.player.reload.bind(this.player), 500);
				this.player.reload();
			}
			break;
		case 83:
		// S
			this.player.direction.y = 1;
			break;
		case 87:
		// W
			this.player.direction.y = -1;
			break;
	}
	this.player.updateSpeed();
}

Game.prototype.keyReleased = function(keyCode) {
	switch (keyCode) {
		case 32: // spacebar
			this.player.dash(false);
			break;
		case 65:
			if (keyIsDown(68))
				this.player.direction.x = 1;
			else this.player.direction.x = 0;
			break;
		case 68:
			if (keyIsDown(65))
				this.player.direction.x = -1;
			else this.player.direction.x = 0;
			break;
		case 83:
			if (keyIsDown(87))
				this.player.direction.y = -1;
			else this.player.direction.y = 0;
			break;
		case 87:
			if (keyIsDown(83))
				this.player.direction.y = 1;
			else this.player.direction.y = 0;
			break;
	}
	this.player.updateSpeed();
}

Game.prototype.get_friction = function(v) {
	let friction = createVector(v.x, v.y);
	//friction.normalize();
	return friction.mult(-.275);
}

Game.prototype.mousePressed = function(mouseButton) {
	if (mouseButton == LEFT) {
		this.player.shooting = true;
	}
}

Game.prototype.mouseReleased = function(mouseButton) {
	if (mouseButton == LEFT)
		this.player.shooting = false;
}

Game.prototype.showBullets = function() {
	stroke(0);
	strokeWeight(2);
	fill(50, 100, 100, 0.6666);
	for (let i = 1; i <= this.player.max_load; i++) {
		if (i > this.player.loader) fill(40, 10, 33);
		rect(width - i * 13 - 20, 490, 7, 20);
	}
}

Game.prototype.update = function() {
	this.bground.show();
	this.player.update();
	this.player.shoot();
	this.updateBlood();
	this.updateBullets();
	this.updateEnnemies();
	if (this.ennemies.length == 0) {
		this.ennemies.push(new Ennemy(this, new p5.Vector(random(width), random(height))));
	}
	this.player.show();
	this.showBullets();
	for (let i = 0; i < this.bars.length; i++) this.bars[i].show();
}

Game.prototype.updateBlood = function() {
	for (let i = this.blood.length - 1; i >= 0; i--) {
		this.blood[i].update();
		this.blood[i].show();
		if (this.blood[i].a <= 0) {
			this.blood.splice(i, 1);
		}
	}
}

Game.prototype.updateBullets = function() {
	for (let i = this.bullets.length - 1; i >= 0; i--) {
    	this.bullets[i].update();
    	this.bullets[i].show();
    	for (let j = 0; j < this.ennemies.length; j++) {
    		if (this.bullets[i].isColliding(this.ennemies[j])) {
    			this.ennemies[j].bleed(this.bullets[i]);
    			this.bullets[i].dmg *= .5;
    		}
    	}
    	if (this.bullets[i].is_out())
    		this.bullets.splice(i, 1);
    }
}

Game.prototype.updateEnnemies = function() {
    for (let i = this.ennemies.length; --i >= 0;) {
		this.ennemies[i].update();
		this.ennemies[i].show();
		if (!this.ennemies[i].alive)
			this.ennemies.splice(i, 1);
	}
}