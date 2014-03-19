/**
 * Creates a Logic Gate Object used as a basis for sub classes
 * 
 * @param	none
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
		"x": x;
		"y": y;
	};
}


/**
 * Draws the core of the gate
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
 * Draws the core of the gate
 * 
 * @param	none
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
 * Returns the position coordinates of a gate
 * 
 * @param	none
 * @return	{x,y}(object)	Coordinates of the gate
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
LogicGate.prototype.getPosition = function() {
	


}