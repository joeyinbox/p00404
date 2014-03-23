function Pointer(canvas) {
	this.x = 0;
	this.y = 0;
	this.distance = {x:0, y:0};
	this.canvas = canvas;
	this.pressed = false;
	this.dragging = false;
	this.busy = null;
	this.contextualMenu = false;
	this.contextualMenuSource = null;
	
	// Add event listener for regular mouse events
	this.canvas.addEventListener('mousemove', this.onMove.bind(this), false);
	this.canvas.addEventListener('mousedown', this.onStart.bind(this), false);
	this.canvas.addEventListener('mouseup', this.onEnd.bind(this), false);
	this.canvas.addEventListener('mouseout', this.onEnd.bind(this), false);
	
	// Add event listener for touch events
	this.canvas.addEventListener('touchmove', this.onMove.bind(this), false);
	this.canvas.addEventListener('touchstart', this.onStart.bind(this), false);
	this.canvas.addEventListener('touchend', this.onEnd.bind(this), false);
	this.canvas.addEventListener('touchcancel', this.onEnd.bind(this), false);
}

Pointer.prototype.onStart = function(e) {
	e.preventDefault();
	this.pressed = true;
	
	return false;
}

Pointer.prototype.onMove = function(e) {
	e.preventDefault();
	
	var x = (e.hasOwnProperty('offsetX')?e.offsetX:(e.hasOwnProperty('pageX')?e.pageX:0));
	var y = (e.hasOwnProperty('offsetY')?e.offsetY:(e.hasOwnProperty('pageY')?e.pageY:0));
	
	if(this.dragging) {
		this.distance.x += x-this.x;
		this.distance.y += y-this.y;
	}
	
	this.x = x;
	this.y = y;
	
	return false;
}

Pointer.prototype.onEnd = function(e) {
	e.preventDefault();
	
	this.pressed = false;
	this.dragging = false;
	this.busy = null;
	
	this.distance.x = 0;
	this.distance.y = 0;
	this.x = 0;
	this.y = 0;
	
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

Pointer.prototype.isBusy = function() {
	return (this.busy!==null);
}

Pointer.prototype.setContextualMenuSource = function(object) {
	this.contextualMenuSource = object;
}