function Pointer(canvas) {
	this.x = 0;
	this.y = 0;
	this.distance = {x:0, y:0};
	this.canvas = canvas;
	this.pressed = false;
	this.dragging = false;
	this.busy = null;
	
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
	
	if(this.dragging) {
		this.distance.x += e.offsetX-this.x;
		this.distance.y += e.offsetY-this.y;
	}
	
	this.x = e.offsetX;
	this.y = e.offsetY;
	
	// If the user is currently pressing on the canvas, then he is dragging
	//this.dragging = this.pressed;
	
	return false;
}

Pointer.prototype.onEnd = function(e) {
	e.preventDefault();
	this.pressed = false;
	this.dragging = false;
	this.busy = null;
	
	this.distance.x = 0;
	this.distance.y = 0;
	
	return false;
}

Pointer.prototype.getPosition = function() {
	return {
		x: this.x,
		y: this.y
	}
}

Pointer.prototype.getDistance = function() {
	// Get the difference
	var result = {
		x: this.distance.x,
		y: this.distance.y
	}
	
	// Reset the value
	this.distance.x = 0;
	this.distance.y = 0;
	
	return result;
}

Pointer.prototype.isHovering = function(object) {
	var position = object.getPosition();
	
	var left = position.x;
	var right = position.x + object.width;
	var top = position.y;
	var bottom = position.y + object.height;
	
	// Does the user click on the core to drag it?
	if(this.x<right && this.x>left && this.y<bottom && this.y>top) {
		return true;
	}
	return false;
}

Pointer.prototype.setBusyWith = function(object) {
	this.busy = object;
}

Pointer.prototype.isBusyWith = function(object) {
	return (object===this.busy);
}