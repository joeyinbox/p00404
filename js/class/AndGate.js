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
 * Version	Modifier	Date		Change			Reason
 * 0.4.1	Joey		03-22-2014	First release	Requirements
 * 0.4.2    Chris		26-03-2014  First release   Requirements
 */
AndGate.prototype.updateOutputState = function() {
	// Both inputs needs to be true to have a true output
	if(this.input.state===this.input.wireStateId.indexOf('powered') && this.input2.state===this.input2.wireStateId.indexOf('powered')) {
		// Update the state only if it change to prevent unnecessary bubbling
		if(this.output.state!==this.output.wireStateId.indexOf('powered')) {
			this.output.setState('powered');

			//First attempt at changing output table data in build-your-own.html (not tested)
			var x=document.getElementById("current");
			x.childNodes[0].innerHTML="1";
			x.childNodes[3].innerHTML="1";

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