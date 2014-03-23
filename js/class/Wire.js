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