class Bar {
	constructor(x, y, player, att, max, hue) {
		this.att = att;
		this.max = max;
		this.player = player;
		this.hue = hue;
		this.x = x;
		this.y = y;
		this.w = 200;
		this.h = 20;
	}
}

Bar.prototype.show = function() {
	let att = map(this.player[this.att], 0, this.player[this.max], 0, this.w);
	stroke(0);
	strokeWeight(2);
	fill(this.hue, 10, 33, 0.6666);
	rect(this.x, this.y, this.w, this.h);
	fill(this.hue, 100, 75, 0.6666);
	rect(this.x, this.y, att, this.h);
}