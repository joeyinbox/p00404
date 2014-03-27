/**
 * Constructor of the NotGate class which inherits from the SingleInputGate class
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
function NotGate(ui, type, x, y) {
	// Call the parent class constructor
	SingleInputGate.apply(this, arguments);
}
// Declare the inheritence-like pattern and override the constructor method
NotGate.prototype = new SingleInputGate();
NotGate.prototype.constructor = NotGate;


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
NotGate.getResource = function() {
	return "img/gate/not.svg";
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
 * 0.4.1	Usman		03-22-2014	First release							Requirements
 * 0.7.0    Chris		03-26-2014  Split the logic into a smaller module   Requirements
 */
NotGate.prototype.getOutput = function(input1) {
	// This gate invert the state of its input. As a result, if the input is true, the output is false
	if(input1===this.input.wireStateId.indexOf('powered')) {
		return 'idle';
	}
	// If the input is true and false (unknown), so do the output
	else if(input1===this.input.wireStateId.indexOf('unknown')) {
		return 'unknown';
	}
	return 'powered';
}