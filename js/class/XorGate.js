/**
 * Constructor of the XorGate class
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
function XorGate(ui, type, x, y) {
	DualInputGate.apply(this, arguments);
}
XorGate.prototype = new DualInputGate();
XorGate.prototype.constructor = XorGate;


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
XorGate.getResource = function() {
	return "img/gate/xor.svg";
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
XorGate.prototype.updateOutputState = function() {
	// Assert if the state of the output has changed
	// If at least one of the inputs is unknown, so do the output
	if(this.input.state===this.input.wireStateId.indexOf('unknown') || this.input2.state===this.input2.wireStateId.indexOf('unknown')) {
		if(this.output.state!==this.output.wireStateId.indexOf('unknown')) {
			this.output.setState('unknown');
		}
	}
	// If one input is sure to be true and the other one is either idle or underpowered
	else if(((this.input.state===this.input.wireStateId.indexOf('idle') || this.input.state===this.input.wireStateId.indexOf('underpowered')) && this.input2.state===this.input2.wireStateId.indexOf('powered')) 
		|| (this.input.state===this.input.wireStateId.indexOf('powered') && (this.input2.state===this.input2.wireStateId.indexOf('idle') || this.input2.state===this.input2.wireStateId.indexOf('underpowered')))) {
		if(this.output.state!==this.output.wireStateId.indexOf('powered')) {
			this.output.setState('powered');
		}
	}
	else if(this.output.state!==this.output.wireStateId.indexOf('idle')) {
		this.output.setState('idle');
	}
}