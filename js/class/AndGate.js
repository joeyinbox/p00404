/**
 * Constructor of the AndGate class
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
function AndGate(ui, type, x, y) {
	DualInputGate.apply(this, arguments);
}
AndGate.prototype = new DualInputGate();
AndGate.prototype.constructor = AndGate;


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
 * 0.1		Joey		23-03-2014	First release	Requirements
 */
AndGate.prototype.updateOutputState = function() {
	// Assert if the state of the output has changed
	if(this.input.state===this.input.wireStateId.indexOf('powered') && this.input2.state===this.input2.wireStateId.indexOf('powered')) {
		if(this.output.state!==this.output.wireStateId.indexOf('powered')) {
			this.output.setState('powered');
		}
	}
	// If both input are unknown or at least one is sure to be true, the output is unknown
	else if((this.input.state===this.input.wireStateId.indexOf('unknown') && this.input2.state===this.input2.wireStateId.indexOf('unknown'))
		 || (this.input.state===this.input.wireStateId.indexOf('unknown') && this.input2.state===this.input2.wireStateId.indexOf('powered')) 
		 || (this.input.state===this.input.wireStateId.indexOf('powered') && this.input2.state===this.input2.wireStateId.indexOf('unknown'))) {
		if(this.output.state!==this.output.wireStateId.indexOf('unknown')) {
			this.output.setState('unknown');
		}
	}
	else if(this.output.state!==this.output.wireStateId.indexOf('idle')) {
		this.output.setState('idle');
	}
}