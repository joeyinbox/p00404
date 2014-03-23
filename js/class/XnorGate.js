/**
 * Constructor of the XnorGate class
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
function XnorGate(ui, type, x, y) {
	DualInputGate.apply(this, arguments);
}
XnorGate.prototype = new DualInputGate();
XnorGate.prototype.constructor = XnorGate;


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
 * Version	Modifier	Date		Change			Reason
 * 0.1		Joey		23-03-2014	First release	Requirements
 */
XnorGate.prototype.updateOutputState = function() {
	// If at least one of the inputs is unknown, so do the output
	if(this.input.state===this.input.wireStateId.indexOf('unknown') || this.input2.state===this.input2.wireStateId.indexOf('unknown')) {
		if(this.output.state!==this.output.wireStateId.indexOf('unknown')) {
			this.output.setState('unknown');
		}
	}
	// If both inputs are either idle or underpowered; or if both inputs are true
	else if(((this.input.state===this.input.wireStateId.indexOf('idle') || this.input.state===this.input.wireStateId.indexOf('underpowered')) 
			&& (this.input2.state===this.input2.wireStateId.indexOf('idle') || this.input2.state===this.input2.wireStateId.indexOf('underpowered')))
		|| (this.input.state===this.input.wireStateId.indexOf('powered') && this.input2.state===this.input2.wireStateId.indexOf('powered'))) {
		if(this.output.state!==this.output.wireStateId.indexOf('powered')) {
			this.output.setState('powered');
		}
	}
	else if(this.output.state!==this.output.wireStateId.indexOf('idle')) {
		this.output.setState('idle');
	}
}