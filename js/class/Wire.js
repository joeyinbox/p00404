function Wire(ui, gate) {
	this.wireStateId = [];
	this.wireStateId['idle'] = 0;
	this.wireStateId['powered'] = 1;
	this.wireStateId['unknown'] = 2;
	this.wireStateId['underpowered'] = 3;
	
	this.state = this.wireStateId.idle;
	this.belongsTo = gate;
	this.ui = ui;
	this.height = 30;
	this.width = 6;
}


/**
 * Draw this wire
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
Wire.prototype.drawWire = function() {
	var from = this.getPosition();
	
	this.ui.context.lineWidth = this.width;
	this.ui.context.beginPath();
	this.ui.context.moveTo(from.x, from.y);
	this.ui.context.lineTo(from.x, from.y+this.height);
	this.ui.context.strokeStyle = this.ui.color[this.state];
	this.ui.context.stroke();
};


/**
 * Set the state of the wire
 * 
 * @param	state(int)	Identifier of the state that will be set to the current wire
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
Wire.prototype.setState = function(state) {
	if(wireStateId.indexOf(state)!==-1) {
		this.state = state;
	}
};