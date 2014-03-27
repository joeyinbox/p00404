/**
 * Creates a Logic Gate Object used as a basis for sub classes
 * 
 * @param	ui(UserInterface)	Instance of the current user interface which coordinates everything
 * @param	type(int)			General identifier of the type of the current gate
 * @param	x(int)				X position of the gate within the graphical interface
 * @param	y(int)				Y position of the gate within the graphical interface
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1.0	Chris		19-03-2014	First release	Requirements
 */
function LogicGate(ui, type, x, y) {
	if(ui===undefined) {
		return 0;
	}
	
	this.ui = ui;
	this.gateType = type;
	
	var size = this.ui.getResourceSize(this.gateType);
	this.ratio = size.height/size.width;
	
	this.width = 80;
	this.height = this.width*this.ratio;
	
	this.img = this.ui.getResource(this.gateType);
	this.output = new OutputWire(this.ui, this);
	
	this.x = x;
	this.y = y;
	
	this.updateOutputState();
}


/**
 * Draws LogicGate on canvas element
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1.0	Chris		19-03-2014	First release	Requirements
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
 * 0.1.0	Chris		19-03-2014	First release	Requirements
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
 * 0.1.0	Chris		19-03-2014	First release	Requirements
 */
LogicGate.prototype.getPosition = function() {
	return {
		'x':this.x, 
		'y':this.y
	};
}


/**
 * Update the status of the current gate
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change						Reason
 * 0.1.0	Joey		20-03-2014	First release				Requirements
 * 0.7.0	Chris		26-03-2014	Truth table function call	Requirements
 */
LogicGate.prototype.update = function() {
	// Assert if the pointer is interacting with the current gate
	if(this.ui.pointer.isBusyWith(this)) {
		// The gate is currently handled by the pointer
		var distance = this.ui.pointer.getDistance();
		this.setPosition(this.x+distance.x, this.y+distance.y);
	}
	else if(!this.ui.pointer.isBusy() && this.ui.pointer.isHovering(this) && this.ui.pointer.pressed===true && this.ui.pointer.dragging===false) {
		// The gate is hovered while clicking
		this.ui.pointer.dragging = true;
		this.ui.pointer.setBusyWith(this);
		this.truthTable();
	}
	
	// Assert if the pointer is interacting with the output wire
	if(!this.ui.pointer.isBusy()) {
		if(this.ui.pointer.isHovering(this.output) && this.ui.pointer.pressed===true && this.ui.pointer.dragging===false) {
			this.output.pointerInteraction();
		}
	}
}