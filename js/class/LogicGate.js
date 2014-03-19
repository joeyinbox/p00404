/**
 * Creates a Logic Gate Object used as a basis for sub classes
 * 
 * @param	UI(object)
 * @param	type(object)
 * @param	x(int)
 * @param	y(int) 
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Chris		19-03-2014	First release	Requirements
 */
function LogicGate(ui, type, x, y) {
	this.ui = ui;
	this.gateType = type;	
	var img = this.ui.getResource(this.gateType);
	this.width = 80;
	this.height = img.height*(this.width/img.width);
	this.input = new InputWire(shift);
	this.output = new OutputWire();
	this.position = { 
		"x": x, 
		"y": y	
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
 * 0.1		Chris		19-03-2014	First release	Requirements
 */
LogicGate.prototype.drawGate = function() {
	this.ui.context.drawImage(this.ui.getResource(this.gateType),this.position.x,this.position.y, this.width, this.height);

}

/**
 * Sets the position of the gate
 * 
 * @param 	x(int)
 * @param 	y(int)
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
 * @return	{x, y}(object)
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Chris		19-03-2014	First release	Requirements
 */
LogicGate.prototype.getPosition = function() {
	return this.position;
}