/**
 * Constructor of the XnorGate class which inherits from the DualInputGate class
 * 
 * @param	ui(UserInterface)	Instance of the current user interface which coordinates everything
 * @param	type(int)			General identifier of the type of the current gate
 * @param	x(int)				X position of the gate within the graphical interface
 * @param	y(int)				Y position of the gate within the graphical interface
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.1.0	Usman		03-19-2014	First release		Requirements
 */
function XnorGate(ui, type, x, y) {
	// Call the parent class constructor
	DualInputGate.apply(this, arguments);
}
// Declare the inheritence-like pattern and override the constructor method
XnorGate.prototype = new DualInputGate();
XnorGate.prototype.constructor = XnorGate;


/**
 * Get the resource path of the graphical representation of this gate
 * 
 * @param	none
 * @return	(string)	The resource path
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.1.1	Usman		03-19-2014	First release		Requirements
 */
XnorGate.getResource = function() {
	return "img/gate/xnor.svg";
}


/**
 * Update the status of the current gate's output wire
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change						Reason
 * 0.4.1	Usman		03-22-2014	First release				Requirements
 * 0.5.4	Joey		03-23-2014	Handle underpowered state	Ethnological refinement
 */
XnorGate.prototype.updateOutputState = function() {
	// If at least one of the inputs is unknown, so do the output
	if(this.input.state===this.input.wireStateId.indexOf('unknown') || this.input2.state===this.input2.wireStateId.indexOf('unknown')) {
		// Update the state only if it change to prevent unnecessary bubbling
		if(this.output.state!==this.output.wireStateId.indexOf('unknown')) {
			this.output.setState('unknown');
		}
	}
	// If both inputs are either idle or underpowered; or if both inputs are true
	else if(((this.input.state===this.input.wireStateId.indexOf('idle') 
				|| this.input.state===this.input.wireStateId.indexOf('underpowered')) 
			&& (this.input2.state===this.input2.wireStateId.indexOf('idle') 
				|| this.input2.state===this.input2.wireStateId.indexOf('underpowered')))
		|| (this.input.state===this.input.wireStateId.indexOf('powered') 
			&& this.input2.state===this.input2.wireStateId.indexOf('powered'))) {
				
		// Update the state only if it change to prevent unnecessary bubbling
		if(this.output.state!==this.output.wireStateId.indexOf('powered')) {
			this.output.setState('powered');
		}
	}
	else if(this.output.state!==this.output.wireStateId.indexOf('idle')) {
		this.output.setState('idle');
	}
}