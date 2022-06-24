const MODE_OUTWARD = 0, MODE_CORNER = 1, MODE_MIX = 2;
let mode = 0;
let show_area = true;

class Vec2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	get length() {
		return sqrt(this.x * this.x + this.y * this.y);
	}

	add(p) {
		return new Vec2(this.x + p.x, this.y + p.y);
	}

	mul(p) {
		if (p instanceof Vec2) {
			return this.dot(p);
		} else {
			return new Vec2(this.x * p, this.y * p);
		}
	}

	dot(p) {
		return this.x * p.x + this.y * p.y;
	}

	div(p) {
		return new Vec2(this.x / p, this.y / p);
	}

	normalize() {
		return this.div(this.length);
	}

	distance(v) {
		return sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
	}
	distance(x, y) {
		return sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y));
	}
}

class mLine {
	// point = o + t * v
	constructor(o, v) {
		this.o = o;
		this.v = v;
	}

	point(t) {
		return this.o.add(this.v.mul(t));
	}

	intersect(line) {
		try {
			let mline;
			if (line instanceof Line) mline = line.mline;
			if (line instanceof mLine) mline = line;
			
			let t2 = (this.v.x * (mline.o.y - this.o.y) + this.v.y * (this.o.x - mline.o.x)) / (mline.v.x * this.v.y - mline.v.y * this.v.x);
			if (t2 <= 0) return -1;
			let t1 = (mline.v.x * (this.o.y - mline.o.y) + mline.v.y * (mline.o.x - this.o.x)) / (this.v.x * mline.v.y - this.v.y * mline.v.x);
			if (t1 <= 0) return -1;
			return [[this, t1], [mline, t2]];
		} catch (e) {
			console.log(e);
			return -1;
		}
	}
}

class MainPerson {
	constructor(x, y, num_ray) {
		this.x = x;
		this.y = y;
		this.num_ray = num_ray;
	}

	draw() {
		stroke('rgba(0,255,0,0.2)');
		if (mode == MODE_OUTWARD || mode == MODE_MIX) {
			let first_pt = -1;
			let prev_pt = -1;
			for (let i = 0; i < this.num_ray; i++) {
				let angle = 2 * Math.PI * i / this.num_ray;
				let mline = new mLine(new Vec2(this.x, this.y), new Vec2(Math.cos(angle), Math.sin(angle)));
				let min_t = -1;
				lines.forEach(function (item, index) {
					let intersect = mline.intersect(item);
					if (intersect == -1) return;
					let t1 = intersect[0][1];
					let mline2 = intersect[1][0];
					let t2 = intersect[1][1];
					if (item.length < mline2.v.mul(t2).length) return;
					if (min_t == -1 || t1 < min_t) min_t = t1;
				});
				let end_point;
				if (min_t == -1) {
					end_point = new Vec2(mline.o.x + mline.v.x * canvas_width, mline.o.y + mline.v.y * canvas_height);
				} else {
					end_point = new Vec2(mline.o.x + mline.v.x * min_t, mline.o.y + mline.v.y * min_t);
				}
				line(this.x, this.y, end_point.x, end_point.y);
				if (show_area) {
					if (i == 0) first_pt = end_point;
					if (prev_pt != -1) {
						triangle(this.x, this.y, prev_pt.x, prev_pt.y, end_point.x, end_point.y);
					}
					if (i == this.num_ray - 1) {
						triangle(this.x, this.y, first_pt.x, first_pt.y, end_point.x, end_point.y);
					}
					prev_pt = end_point;
				}				
			}
		}
		stroke('yellow');
		if (mode == MODE_CORNER || mode == MODE_MIX) {
			for (let i = 0; i < lines.length; i++) {
				let l = lines[i];			
				let corners = [new Vec2(l.x1, l.y1), new Vec2(l.x2, l.y2)];
				let intersections = [];
				for (let c = 0; c < corners.length; c++) {
					let corner = corners[c];
					let mline = new mLine(new Vec2(this.x, this.y), new Vec2(corner.x - this.x, corner.y - this.y));
					let seeable = true;
					let min_t = -1;
					for (let k = 0; k < lines.length; k++) {
						if (k == i) continue;
						let intersect = mline.intersect(lines[k]);
						if (intersect == -1) continue;
						let t1 = intersect[0][1];
						let mline2 = intersect[1][0];
						let t2 = intersect[1][1];
						if (lines[k].length < mline2.v.mul(t2).length) continue;
						if (t1 > 1) {
							min_t = t1;
							continue;
						}
						seeable = false;
						break;
					}
					if (seeable) {
						let end_point;
						if (min_t == -1) {
							end_point = new Vec2(mline.o.x + mline.v.x * canvas_width, mline.o.y + mline.v.y * canvas_height);
						} else {
							end_point = new Vec2(mline.o.x + mline.v.x * min_t, mline.o.y + mline.v.y * min_t);
						}
						line(this.x, this.y, end_point.x, end_point.y);
						intersections.push(end_point);
					} else {
						intersections.push(null);
					}
				};
				//TODO
			};
		}		
		stroke(0);
		circle(this.x, this.y, 5);
	}
}

class Line {
	constructor(x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}

	get length() {
		return sqrt((this.x1 - this.x2) * (this.x1 - this.x2) + (this.y1 - this.y2) * (this.y1 - this.y2));
	}

	draw() {
		line(this.x1, this.y1, this.x2, this.y2);
	}

	get mline() {
		return new mLine(new Vec2(this.x1, this.y1), (new Vec2(this.x2-this.x1, this.y2-this.y1)).normalize());
	}	
}


const canvas_height = 400, canvas_width = 400;

let mainPerson = new MainPerson(canvas_width/2, canvas_height/2, 300);
let lines = [];

function setup() {
	createCanvas(canvas_width, canvas_height);
	lines.push(new Line(100, 100, 180, 380), new Line(300, 100, 20, 50));
}

function draw(){
	background(220);

	if (keyIsDown(UP_ARROW)) mainPerson.y -= 1;
	if (keyIsDown(DOWN_ARROW)) mainPerson.y += 1;
	if (keyIsDown(LEFT_ARROW)) mainPerson.x -= 1;
	if (keyIsDown(RIGHT_ARROW))	mainPerson.x += 1;

	lines.forEach(function (item, index) {
		item.draw();
	});
	mainPerson.draw();
}

let p1 = new Vec2(-1, -1), p2 = new Vec2(-1, -1);
let first_clicked = false;
function mouseClicked() {
	if (!first_clicked) {
		p1.x = mouseX;
		p1.y = mouseY;
		first_clicked = true;
	} else {
		p2.x = mouseX;
		p2.y = mouseY;
		lines.push(new Line(p1.x, p1.y, p2.x, p2.y));
		first_clicked = false;
	}
}

function keyPressed() {
	if (keyCode === 49 || keyCode === 97) mode = MODE_OUTWARD;
	if (keyCode === 50 || keyCode === 98) mode = MODE_CORNER;
	if (keyCode === 51 || keyCode === 99) mode = MODE_MIX;
	if (keyCode === DELETE) lines = [];
	if (keyCode === 65) show_area = !show_area;
}