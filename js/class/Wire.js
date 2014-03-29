/**
 * Constructor of the Wire class
 * 
 * @param	ui(UserInterface)	Instance of the current user interface which coordinates everything
 * @param	gate(Wire)			Instance of the wire to whom belongs this input wire
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change								Reason
 * 0.2.0	Joey		03-20-2014	First release						Requirements
 * 0.2.5	Joey		03-22-2014	Add unknown state					Issue #1 raised
 * 0.7.0	Joey		03-27-2014	Add depth and presentation mode		Refinement
 */
function Wire(ui, gate) {
	this.wireStateId = [];
	this.wireStateId.push('idle');
	this.wireStateId.push('powered');
	this.wireStateId.push('unknown');
	this.wireStateId.push('underpowered');
	
	this.state = this.wireStateId.indexOf('idle');
	this.belongsTo = gate;
	this.ui = ui;
	this.height = 30;
	this.width = 6;
	this.depth = 0;
	
	this.presentationMode = false;
}


/**
 * Draw this wire on the ui canvas
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.2.1	Joey		03-20-2014	First release	Requirements
 */
Wire.prototype.drawWire = function() {
	var from = this.getPosition();
	
	this.ui.context.lineWidth = this.width;
	this.ui.context.beginPath();
	this.ui.context.moveTo(from.x, from.y+this.depth);
	this.ui.context.lineTo(from.x, from.y+this.height+this.depth);
	this.ui.context.strokeStyle = this.ui.color[this.state];
	this.ui.context.stroke();
};


/**
 * Adjust the Wire size and position
 * 
 * @param	height(int)		The new height value to set
 * @param	width(int)		The new width value to set
 * @param	depth(int)		The new depth value to set
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.7.3	Joey		03-20-2014	First release	Requirements
 */
Wire.prototype.setSize = function(height, width, depth) {
	this.height = height;
	this.width = width;
	this.depth = depth;
};