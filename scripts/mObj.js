class mObj {
	constructor(position, speed, radius) {
		this.acceleration = createVector();
		this.direction = createVector();
		this.velocity = createVector();
		this.position = createVector(position.x, position.y);
		this.speed = speed;
		this.radius = radius / sw;
		this.diameter = this.radius * 2;
		this.mass = this.diameter * 100;
	}
}

mObj.prototype.applyForce = function(force) {
	this.acceleration.add(p5.Vector.div(force, this.mass));
}

mObj.prototype.directionTo = function(other) {
	let diff = p5.Vector.sub(other.position, this.position);
	return diff.normalize();
}

mObj.prototype.stop = function(other) {
	//let direction = other.directionTo(this);
	//this.acceleration.add(other)
	this.velocity.mult(0);
}

mObj.prototype.dx = function() {
	return this.direction.x;
}

mObj.prototype.dy = function() {
	return this.direction.y;
}

mObj.prototype.x = function() {
	return this.position.x;
}

mObj.prototype.y = function() {
	return this.position.y;
}

mObj.prototype.get_diameter = function() {
	return this.diameter * width;
}

mObj.prototype.get_radius = function() {
	return this.radius * width;
}

mObj.prototype.get_speed = function() {
	return this.speed;
}

mObj.prototype.isColliding = function(other) {
	return dist(this.x(), this.y(), other.x(), other.y()) <
		   this.get_radius() + other.get_radius();
}

mObj.prototype.update = function() {
	this.position.add(p5.Vector.mult(this.direction, this.get_speed()));
};

mObj.prototype.show = function() {
	throw new Error('The "show" function\'s prototype is not implemented.');
};

