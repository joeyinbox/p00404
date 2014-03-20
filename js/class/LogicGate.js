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
 * Draws LogicGate on canvas element
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Joey		20-03-2014	First release	Requirements
 */
LogicGate.prototype.update = function() {
	if(this.ui.pointer.isBusyWith(this)) {
		// The gate is currently handled by the pointer
		var distance = this.ui.pointer.getDistance();
		this.setPosition(this.x+distance.x, this.y+distance.y);
	}
	else if(this.ui.pointer.isHovering(this) && this.ui.pointer.pressed===true && this.ui.pointer.dragging===false) {
		// The gate is hovered
		this.ui.pointer.dragging = true;
		this.ui.pointer.setBusyWith(this);
	}
}