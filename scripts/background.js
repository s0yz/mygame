class Background {
	constructor() {
		this.pos = createVector();
		this.xnumber = 32;
		this.ynumber = 18;
		this.xratio = (sw/this.xnumber)/sw;
		this.yratio = (sh/this.ynumber)/sh;
	}
}

Background.prototype.show = function() {
	stroke(0);
	strokeWeight(2);
	let tileW = width * this.xratio;
	let tileH = height * this.yratio;
	for (let i = 0; i < this.xnumber; i++) {
		for (let j = 0; j < this.ynumber; j++) {
			if(i % 2 == 0 ? j % 2 == 0 : j % 2 != 0) fill(120, 15, 45);
			else fill(120, 15, 55);
			rect(this.pos.x + i * tileW, this.pos.y + j * tileH, tileW, tileH);
		}
	}
}