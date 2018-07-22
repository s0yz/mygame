class Bar {
	constructor(x, y, player, att, max, hue) {
		this.att = att;
		this.max = max;
		this.player = player;
		this.hue = hue;
		this.x = x;
		this.y = y;
		this.width = 200;
		this.height = 20;
	}
}

Bar.prototype.show = function() {
	let att = map(this.player[this.att], 0, this.player[this.max], 0, this.width);
	noStroke();
	fill(this.hue, 100, 75/*, 0.3333*/);
	rect(this.x, this.y, att, this.height);
	//stroke(0);
	//strokeWeight(4);
	noFill();
	rect(this.x, this.y, this.width, this.height);
}