function SingleInputGate(ui, type, x, y) {
	LogicGate.apply(this, arguments);
	
	this.input = new InputWire(ui, this, 1);
}
SingleInputGate.prototype = new LogicGate();
SingleInputGate.prototype.parent = LogicGate.prototype;
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


/**
 * Update the status of the current gate
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Joey		20-03-2014	First release	Requirements
 */
SingleInputGate.prototype.update = function() {
	// Assert if the pointer is interacting with the current gate
	this.parent.update.call(this);
	
	// Assert if the pointer is interacting with the wires
	if(!this.ui.pointer.isBusy() && this.ui.pointer.isHovering(this.input) && this.ui.pointer.pressed===true && this.ui.pointer.dragging===false) {
		this.input.pointerInteraction();
	}
}