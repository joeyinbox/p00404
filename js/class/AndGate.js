/**
 * Constructor of the AndGate class which inherits from the DualInputGate class
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
function AndGate(ui, type, x, y) {
	// Call the parent class constructor
	DualInputGate.apply(this, arguments);
}
// Declare the inheritence-like pattern and override the constructor method
AndGate.prototype = new DualInputGate();
AndGate.prototype.constructor = AndGate;


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
AndGate.getResource = function() {
	return "img/gate/and.svg";
}


/**
 * Update the status of the current gate's output wire
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change									Reason
 * 0.4.1	Joey		03-22-2014	First release							Requirements
 * 0.7.0    Chris		03-26-2014  Split the logic into a smaller module   Requirements
 */
AndGate.prototype.updateOutputState = function() {
	var state = this.getOutput(this.input.state, this.input2.state);
	
	if(this.output.state!==this.output.wireStateId.indexOf(state)) {
		this.output.setState(state);
	}
}


/**
 * Get the potential output state given two inputs
 * 
 * @param	input1(int)		State of the first input
 * @param	input2(int)		State of the second input
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change									Reason
 * 0.4.1	Joey		03-22-2014	First release							Requirements
 * 0.7.0    Chris		03-26-2014  Split the logic into a smaller module   Requirements
 */
AndGate.prototype.getOutput = function(input1, input2) {
	// Both inputs needs to be true to have a true output
	if(input1===this.input.wireStateId.indexOf('powered') && input2===this.input2.wireStateId.indexOf('powered')) {
		return 'powered';
	}
	// If both inputs are unknown or at least one is sure to be true, the output is unknown
	else if((input1.state===this.input.wireStateId.indexOf('unknown') && input2.state===this.input2.wireStateId.indexOf('unknown'))
		 || (input1.state===this.input.wireStateId.indexOf('unknown') && input2.state===this.input2.wireStateId.indexOf('powered')) 
		 || (input1.state===this.input.wireStateId.indexOf('powered') && input2.state===this.input2.wireStateId.indexOf('unknown'))) {
		return 'unknown';
	}
	else if(this.output.state!==this.output.wireStateId.indexOf('idle')) {
		this.output.setState('idle');
	}
	return 'idle';
}