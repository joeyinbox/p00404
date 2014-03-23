/**
 * Constructor of the OrGate class
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
function OrGate(ui, type, x, y) {
	DualInputGate.apply(this, arguments);
}
OrGate.prototype = new DualInputGate();
OrGate.prototype.constructor = OrGate;


/**
 * Get the resource path of the graphical representation of this gate
 * 
 * @param	none
 * @return	(string)	The resource path
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
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
 * Version	Modifier	Date		Change			Reason
 * 0.1		Joey		23-03-2014	First release	Requirements
 */
OrGate.prototype.updateOutputState = function() {
	// Assert if the state of the output has changed
	if(this.input.state===this.input.wireStateId.indexOf('powered') || this.input2.state===this.input2.wireStateId.indexOf('powered')) {
		if(this.output.state!==this.output.wireStateId.indexOf('powered')) {
			this.output.setState('powered');
		}
	}
	else if(this.output.state!==this.output.wireStateId.indexOf('idle')) {
		this.output.setState('idle');
	}
}