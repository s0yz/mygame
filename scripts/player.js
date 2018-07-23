class Player extends mObj {
	constructor(game, pos, rad) {
		super(pos, 2.5, rad);
		this.ammunition = 100;
		this.dash_dmg = 3;
		this.dashing = false;
		this.game = game;
		this.hp = 100;
		this.level = 1;
		this.loader = 15; 		// weapon
		this.location = createVector();
		this.max_hp = 100;
		this.max_load = 15; 	// weapon
		this.max_stamina = 25;
		this.max_vel = 'arbitrary number';
		this.max_xp = 20;
		this.reloading = false;
		this.reload_time = 150;	// weapon
		this.shooting = false;
		this.stamina = 25;
		this.xp = 0;
	}
}

//canvas x
Player.prototype.cx = function() {
	return this.x() - this.offx();
}

//canvas y
Player.prototype.cy = function() {
	return this.y() - this.offy();
}


Player.prototype.offx = function() {
	return this.lx() * width;
}

Player.prototype.offy = function() {
	return this.ly() * height;
}

Player.prototype.dash = function(state) {
	this.dashing = this.stamina > 3 && state;
	this.updateSpeed();
}

Player.prototype.is_dashing = function() {
	return this.dashing && this.is_moving();
}

//Player.prototype.is_moving = function() {
//	return this.velocity.x != 0 || this.velocity.y != 0;
//}

Player.prototype.is_moving = function() {
	return this.dx() != 0 || this.dy() != 0;
}

Player.prototype.is_reloading = function() {
	return this.reloading &= this.ammunition > 0 && this.loader < this.max_load;
}

// location x (canvas[x,y])
Player.prototype.lx = function() {
	return this.location.x;
}

// location y (canvas[x,y])
Player.prototype.ly = function() {
	return this.location.y;
}

Player.prototype.reload = function() {
	if (this.is_reloading()) {
		this.loader++;
		this.ammunition--;
		if (this.is_reloading()) {
			setTimeout(Player.prototype.reload.bind(this), this.reload_time);
		}
	}
}

Player.prototype.shoot = function() {
	if (this.loader > 0 && this.shooting) {
		if (!this.reloading) {
			if (true) this.shooting = false; //semi-auto or auto
			this.loader--;
			this.game.bullets.push(new bullet(this.position, this.toMouse(), this.velocity));
		}
		else this.reloading = false;
	}
};

Player.prototype.show = function() {
	fill(0, 0, 100);
	ellipse(this.cx(), this.cy(), this.get_diameter());
	if (this.loader > 0) {
		stroke(0);
		strokeWeight(2);
		noFill();
		let stop = map(this.loader, 0, this.max_load, 0, TAU);
		arc(this.cx(), this.cy(), this.get_diameter(), this.get_diameter(), 0, stop);
	}
};

Player.prototype.toMouse = function() {
	return (p5.Vector.sub(createVector(mouseX + this.offx(), mouseY + this.offy()), this.position)).normalize();
}

Player.prototype.update = function() {
	let scalar = 1;
	let dir;
	if (this.is_dashing()) {
		this.dashing = (--this.stamina > 0);
		scalar = 3;
		dir = this.toMouse();
	}
	this.applyForce(p5.Vector.mult(this.direction, this.speed * scalar));
	this.applyForce(this.game.get_friction(this.velocity));
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
	this.acceleration.mult(0);
	if (this.stamina < this.max_stamina) this.stamina += 0.025;
	this.updateLevel();
	this.updateEdge();
};

Player.prototype.updateEdge = function() {
	if (this.cx() > width) this.location.x++;
	else if (this.cx() < 0) this.location.x--;
	if (this.cy() > height) this.location.y++;
	else if (this.cy()< 0) this.location.y--;
	
	//if (this.x() > width) translate(-width, 0);
	//else if (this.x() < 0) translate(width, 0);
	//if (this.y() > height) translate(0, -height);
	//else if (this.y() < 0) translate(0, height);
}

Player.prototype.updateLevel = function() {
	if (this.xp >= this.max_xp) {
		this.xp = this.max_xp - this.xp;
		this.level++;
		this.max_xp += floor(this.max_xp * 0.25);
	}
}

Player.prototype.updateSpeed = function() {
	if (this.dx() != 0 && this.dy() != 0)
		this.speed = 1.726775;
	else
		this.speed = 2.5;
}




//BloodDrop {
	class BloodDrop {
		constructor(position, diameter, color) {
			this.p = createVector(position.x, position.y);
			this.a = random(.49,.75);
			this.c = color;
			this.d = diameter;
			this.diameter = random(3, 26);
		}
	}
	
	BloodDrop.prototype.show = function() {
		noStroke();
		fill(this.c);
		ellipse(game.player.cx() + this.p.x,
				game.player.cy() + this.p.y,
				this.diameter);
	}
	
	BloodDrop.prototype.update = function() {
		this.a -= .001;
		this.c.setAlpha(this.a);
	}
//}