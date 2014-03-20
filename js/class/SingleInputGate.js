function SingleInputGate(ui, type, x, y) {
	LogicGate.apply(this, arguments);
	
	this.input = new InputWire(ui, this, 1);
}
SingleInputGate.prototype = new LogicGate();
SingleInputGate.prototype.constructor = SingleInputGate;


/**
 * Remove all links made between the wires of this gate and the other ones
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
SingleInputGate.prototype.unlinkAllWire = function() {
	this.input.unlink();
	this.output.unlinkAll();
};


/**
 * Draw wires of this gate
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
SingleInputGate.prototype.drawWires = function() {
	this.input.drawWire();
	this.output.drawWire();
};