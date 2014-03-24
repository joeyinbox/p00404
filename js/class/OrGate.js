/**
 * Constructor of the OrGate class which inherits from the DualInputGate class
 * 
 * @param	ui(UserInterface)	Instance of the current user interface which coordinates everything
 * @param	type(int)			General identifier of the type of the current gate
 * @param	x(int)				X position of the gate within the graphical interface
 * @param	y(int)				Y position of the gate within the graphical interface
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.1.0	Chris		03-19-2014	First release		Requirements
 */
function OrGate(ui, type, x, y) {
	// Call the parent class constructor
	DualInputGate.apply(this, arguments);
}
// Declare the inheritence-like pattern and override the constructor method
OrGate.prototype = new DualInputGate();
OrGate.prototype.constructor = OrGate;


/**
 * Get the resource path of the graphical representation of this gate
 * 
 * @param	none
 * @return	(string)	The resource path
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.1.1	Chris		03-19-2014	First release		Requirements
 */
OrGate.getResource = function() {
	return "img/gate/or.svg";
}


/**
 * Update the status of the current gate's output wire
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change						Reason
 * 0.4.1	Chris		03-22-2014	First release				Requirements
 * 0.5.4	Joey		03-23-2014	Handle underpowered state	Ethnological refinement
 */
OrGate.prototype.updateOutputState = function() {
	// If at least one of the inputs is true, so do the ouput
	if(this.input.state===this.input.wireStateId.indexOf('powered') || this.input2.state===this.input2.wireStateId.indexOf('powered')) {
		// Update the state only if it change to prevent unnecessary bubbling
		if(this.output.state!==this.output.wireStateId.indexOf('powered')) {
			this.output.setState('powered');
		}
	}
	// If both inputs are unknown or at least one is sure to be false, the output is unknown
	else if((this.input.state===this.input.wireStateId.indexOf('unknown') 
			&& (this.input2.state===this.input2.wireStateId.indexOf('unknown') 
				|| this.input2.state===this.input2.wireStateId.indexOf('idle') 
				|| this.input2.state===this.input2.wireStateId.indexOf('underpowered'))) 
		|| ((this.input.state===this.input.wireStateId.indexOf('idle') 
			|| this.input.state===this.input.wireStateId.indexOf('underpowered')) 
				&& this.input2.state===this.input2.wireStateId.indexOf('unknown'))) {
		
		// Update the state only if it change to prevent unnecessary bubbling
		if(this.output.state!==this.output.wireStateId.indexOf('unknown')) {
			this.output.setState('unknown');
		}
	}
	else if(this.output.state!==this.output.wireStateId.indexOf('idle')) {
		this.output.setState('idle');
	}
}