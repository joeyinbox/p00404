function DualInputGate(ui, type, x, y) {
	LogicGate.apply(this, arguments);
	
	this.input = new InputWire(ui, this, 0);
	this.input2 = new InputWire(ui, this, 2);
}
DualInputGate.prototype = new LogicGate();
DualInputGate.prototype.constructor = DualInputGate;

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
DualInputGate.prototype.unlinkAllWire = function() {
	this.input.unlink();
	this.input2.unlink();
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
DualInputGate.prototype.drawWires = function() {
	this.input.drawWire();
	this.input2.drawWire();
	this.output.drawWire();
};