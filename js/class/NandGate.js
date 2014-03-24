/**
 * Constructor of the NandGate class which inherits from the DualInputGate class
 * 
 * @param	ui(UserInterface)	Instance of the current user interface which coordinates everything
 * @param	type(int)			General identifier of the type of the current gate
 * @param	x(int)				X position of the gate within the graphical interface
 * @param	y(int)				Y position of the gate within the graphical interface
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.1.0	Joey		03-19-2014	First release		Requirements
 */
function NandGate(ui, type, x, y) {
	// Call the parent class constructor
	DualInputGate.apply(this, arguments);
}
// Declare the inheritence-like pattern and override the constructor method
NandGate.prototype = new DualInputGate();
NandGate.prototype.constructor = NandGate;


/**
 * Get the resource path of the graphical representation of this gate
 * 
 * @param	none
 * @return	(string)	The resource path
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.1.1	Joey		03-19-2014	First release		Requirements
 */
NandGate.getResource = function() {
	return "img/gate/nand.svg";
}


/**
 * Update the status of the current gate's output wire
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change						Reason
 * 0.4.1	Joey		03-22-2014	First release				Requirements
 * 0.5.4	Joey		03-23-2014	Handle underpowered state	Ethnological refinement
 */
NandGate.prototype.updateOutputState = function() {
	// If at least one input is false (idle or underpowered), the output is true
	if(this.input.state===this.input.wireStateId.indexOf('idle') || this.input.state===this.input.wireStateId.indexOf('underpowered') 
	|| this.input2.state===this.input2.wireStateId.indexOf('idle') || this.input2.state===this.input.wireStateId.indexOf('underpowered')) {
		// Update the state only if it change to prevent unnecessary bubbling
		if(this.output.state!==this.output.wireStateId.indexOf('powered')) {
			this.output.setState('powered');
		}
	}
	// If both inputs are unknown or at least one is sure to be true, the output is unknown
	else if((this.input.state===this.input.wireStateId.indexOf('unknown') && this.input2.state===this.input2.wireStateId.indexOf('unknown'))
		 || (this.input.state===this.input.wireStateId.indexOf('unknown') && this.input2.state===this.input2.wireStateId.indexOf('powered')) 
		 || (this.input.state===this.input.wireStateId.indexOf('powered') && this.input2.state===this.input2.wireStateId.indexOf('unknown'))) {
		// Update the state only if it change to prevent unnecessary bubbling
		if(this.output.state!==this.output.wireStateId.indexOf('unknown')) {
			this.output.setState('unknown');
		}
	}
	else if(this.output.state!==this.output.wireStateId.indexOf('idle')) {
		this.output.setState('idle');
	}
}