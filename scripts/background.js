class Background {
	constructor() {
		this.pos = createVector();
		this.ratio = 0.03125;
		this.xnumber = 32;
		this.tileW = width * this.ratio;
	}
}

Background.prototype.show = function() {
	noStroke();
	//stroke(0, 0, 10, 5);
	//strokeWeight(1);
	this.tileW = width * this.ratio;
	let ynumber = ceil(height / this.tileW);
	for (let i = 0; i < this.xnumber; i++) {
		for (let j = 0; j < ynumber; j++) {
			let dark = i % 2 == 0 ? j % 2 == 0 : j % 2 != 0;
			if(dark) fill(120, 15, 35);
			else fill(120, 15, 40);
			rect(this.pos.x + i * this.tileW,
				 this.pos.y + j * this.tileW,
				 this.tileW, this.tileW);
		}
	}
}