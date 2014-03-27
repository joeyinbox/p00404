/**
 * Constructor of the XorGate class which inherits from the DualInputGate class
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
function XorGate(ui, type, x, y) {
	// Call the parent class constructor
	DualInputGate.apply(this, arguments);
}
// Declare the inheritence-like pattern and override the constructor method
XorGate.prototype = new DualInputGate();
XorGate.prototype.constructor = XorGate;


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
XorGate.getResource = function() {
	return "img/gate/xor.svg";
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
XorGate.prototype.getOutput = function(input1, input2) {
	// If at least one of the inputs is unknown, so do the output
	if(input1===this.input.wireStateId.indexOf('unknown') || input2===this.input2.wireStateId.indexOf('unknown')) {
		return 'unknown';
	}
	// If one input is sure to be true and the other one is either idle or underpowered
	else if(((input1===this.input.wireStateId.indexOf('idle') 
			|| input1===this.input.wireStateId.indexOf('underpowered')) 
				&& input2===this.input2.wireStateId.indexOf('powered')) 
		|| (input1===this.input.wireStateId.indexOf('powered') 
			&& (input2===this.input2.wireStateId.indexOf('idle') 
				|| input2===this.input2.wireStateId.indexOf('underpowered')))) {
		
		return 'powered';
	}
	return 'idle';
}