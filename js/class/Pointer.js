function Pointer(canvas) {
	this.x = 0;
	this.y = 0;
	this.canvas = canvas;
	this.pressed = false;
	this.dragging = false;
	
	// Add event listener for regular mouse events
	this.canvas.addEventListener('mousemove', this.onMove.bind(this), false);
	this.canvas.addEventListener('mousedown', this.onStart.bind(this), false);
	this.canvas.addEventListener('mouseup', this.onEnd.bind(this), false);
	this.canvas.addEventListener('mouseout', this.onEnd.bind(this), false);
	
	// Add event listener for touch events
	this.canvas.addEventListener('touchmove', this.onMove.bind(this), false);
	this.canvas.addEventListener('ontouchstart', this.onStart.bind(this), false);
	this.canvas.addEventListener('ontouchend', this.onEnd.bind(this), false);
}

Pointer.prototype.onStart = function(e) {
	e.preventDefault();
	this.pressed = true;
	
	return false;
}

Pointer.prototype.onMove = function(e) {
	e.preventDefault();
	this.x = e.offsetX;
	this.y = e.offsetY;
	
	// If the user is currently pressing on the canvas, then he is dragging
	this.dragging = this.pressed;
	
	return false;
}

Pointer.prototype.onEnd = function(e) {
	e.preventDefault();
	this.pressed = false;
	this.dragging = false;
	
	return false;
}

Pointer.prototype.getPosition = function() {
	return {
		x: this.x,
		y: this.y
	}
}