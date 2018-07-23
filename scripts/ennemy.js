class Ennemy extends mObj {
	constructor(game, position) {
		super(position, random(1, 2), random(15, 26));
		this.alive = true;
		this.game = game;
		this.food = game.player;
		this.hp = this.food.level * random(5, 11);
		this.last_bullet;
	}
}

Ennemy.prototype.bleed = function(src) {
	let dashed = src.constructor.name == 'Player';
	if (src != this.last_bullet || dashed) {
		this.last_bullet = src;
		let dmg = dashed ? this.food.dash_dmg : src.dmg;
		this.alive = ((this.hp -= dmg) > 0);
		this.applyForce(src.velocity);
		//this.position.add(p5.Vector.mult(src.direction, random(15)));
		let xOff = this.radius * src.x();
		let yOff = this.radius * src.y();
		let p = new p5.Vector(this.x() + xOff, this.y() + yOff);
		for (let i = random(14, 50); i > 0; i--) {
			let dx = src.dx() + random(-.575, .575);
			let dy = src.dy() + random(-.575, .575);
			this.game.blood.push(new Blood(p, new p5.Vector(dx, dy)));
		}
	}
}

Ennemy.prototype.die = function() {
	for (let i = random(14, 50); i > 0; i--) {
		this.game.blood.push(new Blood(this.position, p5.Vector.random2D()));
	}
}

Ennemy.prototype.show = function() {
	noStroke();
	fill(200, 25, 17);
	ellipse(this.x() - this.food.offx(),
		    this.y() - this.food.offy(),
		    this.get_diameter());
};

Ennemy.prototype.update = function() {
	//let dis = p5.Vector.sub(this.food.position, this.position);
	//this.direction = dis.normalize(this.position, this.food.position);
	this.direction = this.directionTo(this.food)
	this.applyForce(p5.Vector.mult(this.direction, this.speed));
	this.applyForce(this.game.get_friction(this.velocity));
	this.velocity.add(this.acceleration);
	if (this.isColliding(this.food)) {
		if (this.food.is_dashing())
			this.bleed(this.food);
		//else if (this.food.is_moving()) {
			//this.food.applyForce(p5.Vector.mult(this.food.velocity, -5));
			//this.velocity.add(this.food.velocity)
			//this.food.applyForce(this.velocity);
			//this.applyForce(p5.Vector.mult(this.food.direction, this.food.speed));
		//}
		//else {
			//this.food.applyForce(this.velocity);
		//}
			this.stop();
			this.food.hp--;
	}
	this.position.add(this.velocity);
	this.acceleration.mult(0);
	if (!this.alive) {
		this.die();
		this.food.xp += 1;
	}
}

//Blood {
	class Blood {
		constructor(p, d) {
			this.p = new p5.Vector(p.x, p.y);
			this.a = random(.49,.75);
			this.c = color(0, 100, 78, this.a);
			this.d = d;
			this.diameter = random(3, 26);
			this.s = random(15, 25);
			this.t = random(2, 10);
		}
	}

	Blood.prototype.show = function() {
		noStroke();
		fill(this.c);
		ellipse(this.p.x - game.player.offx(),
				this.p.y - game.player.offy(),
				this.diameter);
	}
	
	Blood.prototype.update = function() {
		if (this.t > 0) {
			this.p.add(p5.Vector.mult(this.d, this.s));
			this.diameter *= .85;
			this.t--;
		}
		this.a -= .001;
		this.c.setAlpha(this.a);
	}
//}