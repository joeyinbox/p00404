/**
 * Constructor of the NotGate class
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
function NotGate(ui, type, x, y) {
	SingleInputGate.apply(this, arguments);
}
NotGate.prototype = new SingleInputGate();
NotGate.prototype.constructor = NotGate;


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
NotGate.getResource = function() {
	return "img/gate/not.svg";
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
NotGate.prototype.updateOutputState = function() {
	// Assert if the state of the output has changed
	if(this.input.state===this.input.wireStateId.indexOf('powered')) {
		if(this.output.state!==this.output.wireStateId.indexOf('idle')) {
			this.output.setState('idle');
		}
	}
	else if(this.input.state===this.input.wireStateId.indexOf('unknown')) {
		if(this.output.state!==this.output.wireStateId.indexOf('unknown')) {
			this.output.setState('unknown');
		}
	}
	else if(this.output.state!==this.output.wireStateId.indexOf('powered')) {
		this.output.setState('powered');
	}
}