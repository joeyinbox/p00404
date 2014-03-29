/**
 * Constructor of the Pointer class
 * 
 * @param	canvas(Canvas object)	Reference to the current UI canvas used
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.2.0	Joey		03-21-2014	First release		Requirements
 */
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


/**
 * Callback triggered when the user starts interacting with the interface by either clicking or touching the screen
 * 
 * @param	e(event)	The event fired by the listener
 * @return	boolean		Returns false to prevent default behavior for legacy browser support
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.3.0	Joey		03-21-2014	First release	Requirements
 */
Pointer.prototype.onStart = function(e) {
	// Override the device default behavior and set the pressed flag that will be used within gates' update method
	e.preventDefault();
	this.pressed = true;
	
	return false;
}


/**
 * Callback triggered when the user move within the interface with a mouse of its finger
 * 
 * @param	e(event)	The event fired by the listener
 * @return	boolean		Returns false to prevent default behavior for legacy browser support
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.3.0	Joey		03-21-2014	First release	Requirements
 */
Pointer.prototype.onMove = function(e) {
	// Override the device default behavior
	// For example, a touch device would start scrolling the interface by default instead of dragging elements
	e.preventDefault();
	
	// Get the position of the cursor or the finger in case of touch device
	var x = (e.hasOwnProperty('offsetX')?e.offsetX:(e.hasOwnProperty('pageX')?e.pageX:0));
	var y = (e.hasOwnProperty('offsetY')?e.offsetY:(e.hasOwnProperty('pageY')?e.pageY:0));
	
	// Keep records of the distance traveled since last ui update
	if(this.dragging) {
		this.distance.x += x-this.x;
		this.distance.y += y-this.y;
	}
	
	this.x = x;
	this.y = y;
	
	return false;
}


/**
 * Callback triggered when the user stops interacting with the interface by either releasing the mouse click or stop touching the screen
 * 
 * @param	e(event)	The event fired by the listener
 * @return	boolean		Returns false to prevent default behavior for legacy browser support
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.3.0	Joey		03-21-2014	First release	Requirements
 */
Pointer.prototype.onEnd = function(e) {
	// Override the device default behavior
	e.preventDefault();
	
	// Re-initialise all flags
	this.pressed = false;
	this.dragging = false;
	
	// The pointer is not busy anymore with objects
	this.busy = null;
	
	// Reset the distance and the position because touch device can induct hops that could be interpreted as drag events instead of simple clicks
	this.distance.x = 0;
	this.distance.y = 0;
	this.x = 0;
	this.y = 0;
	
	return false;
}


/**
 * Return the position of the current pointer
 * 
 * @param	none
 * @return	{x,y}(object)	Coordinates of the pointer
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.3.1	Joey		03-21-2014	First release	Requirements
 */
Pointer.prototype.getPosition = function() {
	return {
		x: this.x,
		y: this.y
	}
}


/**
 * Return the distance traveled by the pointer since last ui update
 * 
 * @param	none
 * @return	{x,y}(object)	Distance in pixel of X and Y coordinates
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.3.3	Chris		03-22-2014	First release	Requirements
 */
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


/**
 * Assert if an object is currently hovered by the pointer
 * 
 * @param	object(Object)	The object to be tested on
 * @return	boolean			Returns true if the pointer hovers the object, otherwise false
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.3.1	Chris		03-21-2014	First release	Requirements
 */
Pointer.prototype.isHovering = function(object) {
	var position = object.getPosition();
	
	var left = position.x;
	var right = position.x+object.width;
	var top = position.y;
	var bottom = position.y+object.height;
	
	// Does the pointer hovers the core of this object?
	if(this.x<right && this.x>left && this.y<bottom && this.y>top) {
		return true;
	}
	return false;
}


/**
 * Holds the object with whom the pointer is busy with
 * 
 * @param	object(Object)	The object to be tested on
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.3.4	Usman		03-23-2014	First release	Requirements
 */
Pointer.prototype.setBusyWith = function(object) {
	this.busy = object;
}


/**
 * Asserts if the object is the one with whom the pointer is busy with
 * 
 * @param	object(Object)	The object to be tested on
 * @return	boolean			Return true if both objects are the same, otherwise false
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.3.1	Chris		03-21-2014	First release	Requirements
 */
Pointer.prototype.isBusyWith = function(object) {
	return (object===this.busy);
}


/**
 * Indicate if the pointer is currently busy with an object
 * 
 * @param	none
 * @return	boolean			Return true if the pointer is busy, otherwise false
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.3.3	Usman		03-22-2014	First release	Requirements
 */
Pointer.prototype.isBusy = function() {
	return (this.busy!==null);
}


/**
 * Holds the source which triggered the current contextual menu
 * 
 * @param	object(Object)	The object which originated the contextual menu call
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.3.4	Chris		03-23-2014	First release	Requirements
 */
Pointer.prototype.setContextualMenuSource = function(object) {
	this.contextualMenuSource = object;
}