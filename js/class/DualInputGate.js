function DualInputGate(ui, type, x, y) {
	LogicGate.apply(this, arguments);
	
	this.input = new InputWire(ui, this, 0);
	this.input2 = new InputWire(ui, this, 2);
}

DualInputGate.prototype = new LogicGate();
DualInputGate.prototype.parent = LogicGate.prototype;
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
DualInputGate.prototype.update = function() {
	// Assert if the pointer is interacting with the current gate
	this.parent.update.call(this);
	
	// Assert if the pointer is interacting with the wires
	if(!this.ui.pointer.isBusy()) {
		if(this.ui.pointer.isHovering(this.input) && this.ui.pointer.pressed===true && this.ui.pointer.dragging===false) {
			this.input.pointerInteraction();
		}
		else if(this.ui.pointer.isHovering(this.input2) && this.ui.pointer.pressed===true && this.ui.pointer.dragging===false) {
			this.input2.pointerInteraction();
		}
	}
}