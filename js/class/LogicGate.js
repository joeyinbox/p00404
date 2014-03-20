/**
 * Creates a Logic Gate Object used as a basis for sub classes
 * 
 * @param	UI(object)	UserInterface instance
 * @param	type(object)	LogicGate type
 * @param	x(int)	coordinate
 * @param	y(int)	coordinate 
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Chris		19-03-2014	First release	Requirements
 */
function LogicGate(ui, type, x, y) {
	if(ui===undefined) {
		return 0;
	}
	
	this.ui = ui;
	this.gateType = type;
	
	var size = this.ui.getResourceSize(this.gateType);
	this.width = 80;
	this.height = size.height*(this.width/size.width);
	
	this.img = this.ui.getResource(this.gateType);
	this.output = new OutputWire(this.ui, this);
	
	this.x = x;
	this.y = y;
}



/**
 * Draws LogicGate on canvas element
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Chris		19-03-2014	First release	Requirements
 */
LogicGate.prototype.drawGate = function() {
	this.ui.context.drawImage(this.ui.getResource(this.gateType), this.x, this.y, this.width, this.height);
}

/**
 * Sets the position of the gate
 * 
 * @param 	x(int)	coordinate
 * @param 	y(int)	coordinate
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Chris		19-03-2014	First release	Requirements
 */
LogicGate.prototype.setPosition = function(x, y) {
	this.x = x;
	this.y = y;
}

/**
 * Gets the position of the gate
 * 
 * @param	none
 * @return	{x, y}(object)	position
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Chris		19-03-2014	First release	Requirements
 */
LogicGate.prototype.getPosition = function() {
	return {
		'x':this.x, 
		'y':this.y
	};
}


/**
 * Determine is the pointer is hover the actual gate
 * 
 * @param	none
 * @return	true if the pointer is hovering it, otherwise false
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Joey		20-03-2014	First release	Requirements
 */
LogicGate.prototype.isHovered = function() {
	var left = this.x;
	var right = this.x + this.width;
	var top = this.y;
	var bottom = this.y + this.height;
	
	var pointer = this.ui.pointer.getPosition();
	
	if(!drag) {
		startX = pointer.x - this.x;
		startY = pointer.y - this.y;
	}
	// Does the user click on the core to drag it?
	if(pointer.x<right && pointer.x>left && pointer.y<bottom && pointer.y>top) {
		return true;
	}
	return false;
}