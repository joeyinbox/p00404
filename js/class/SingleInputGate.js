/**
 * Constructor of the SingleInput class which inherits from the LogicGate class
 * 
 * @param	ui(UserInterface)	Instance of the current user interface which coordinates everything
 * @param	type(int)			General identifier of the type of the current gate
 * @param	x(int)				X position of the gate within the graphical interface
 * @param	y(int)				Y position of the gate within the graphical interface
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change							Reason
 * 0.1.0	Joey		03-19-2014	First release					Requirements
 * 0.2.0	Chris		03-20-2014	Add input creation				Requirements
 * 0.2.3	Joey		03-21-2014	Add the shifted position		UX refinement
 */
function SingleInputGate(ui, type, x, y) {
	// Call the parent class constructor
	LogicGate.apply(this, arguments);
	
	this.input = new InputWire(ui, this, 1);
}
// Declare the inheritence-like pattern and override the constructor method
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
 * Version	Modifier	Date		Change					Reason
 * 0.1.2	Usman		03-19-2014	First release			To include in the gate removing process
 * 0.5.2	Chris		03-23-2014	Actual implementation	Requirements
 */
SingleInputGate.prototype.unlinkAllWire = function() {
	// Forwards the action to the input and output
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
 * 0.2.0	Joey		03-20-2014	First release	Requirements
 */
SingleInputGate.prototype.drawWires = function() {
	// Forwards the action to the input and output
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
 * Version	Modifier	Date		Change				Reason
 * 0.3.2	Joey		03-21-2014	First release		Requirements
 * 0.4.0	Usman		03-23-2014	Call parent update	Requirements
 */
SingleInputGate.prototype.update = function() {
	// Assert if the pointer is interacting with the current gate
	this.parent.update.call(this);
	
	// Assert if the pointer is interacting with the input wire
	if(!this.ui.pointer.isBusy() && this.ui.pointer.isHovering(this.input) && this.ui.pointer.pressed===true && this.ui.pointer.dragging===false) {
		this.input.pointerInteraction();
	}
}