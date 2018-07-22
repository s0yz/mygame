class bullet extends mObj {
	constructor(position, direction, player_vel) {
		super(position, 25, 7);
		this.direction = new p5.Vector(direction.x, direction.y);
		this.velocity = p5.Vector.mult(this.direction, this.speed);
		this.velocity.add(player_vel);
		this.last_position = position;
		this.dmg = 10;
	}
}

bullet.prototype.is_out = function() {
	let distance = dist(this.position.x,
						this.position.y,
						game.player.position.x,
						game.player.position.y);
	return distance > (width * 3);
}

bullet.prototype.show = function() {
	fill(50, 100, 50, 1);
	ellipse(this.x() - game.player.offx(), this.y() - game.player.offy(), this.get_diameter());
};

bullet.prototype.update = function() {
	this.last_position = this.position;
	this.position.add(this.velocity);
};