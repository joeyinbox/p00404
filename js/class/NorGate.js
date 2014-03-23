/**
 * Constructor of the NorGate class
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
function NorGate(ui, type, x, y) {
	DualInputGate.apply(this, arguments);
}
NorGate.prototype = new DualInputGate();
NorGate.prototype.constructor = NorGate;


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
NorGate.getResource = function() {
	return "img/gate/nor.svg";
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
NorGate.prototype.updateOutputState = function() {
	// Assert if the state of the output has changed
	// If both inputs are combinations of either idle or underpowered
	if((this.input.state===this.input.wireStateId.indexOf('idle') || this.input.state===this.input.wireStateId.indexOf('underpowered')) 
	&& (this.input2.state===this.input.wireStateId.indexOf('idle') || this.input2.state===this.input2.wireStateId.indexOf('underpowered'))) {
		if(this.output.state!==this.output.wireStateId.indexOf('powered')) {
			this.output.setState('powered');
		}
	}
	// If both input are unknown or at least one is sure to be false, the output is unknown
	else if((this.input.state===this.input.wireStateId.indexOf('unknown') 
			&& (this.input2.state===this.input2.wireStateId.indexOf('unknown') 
				|| this.input2.state===this.input2.wireStateId.indexOf('idle') 
				|| this.input2.state===this.input2.wireStateId.indexOf('underpowered'))) 
		|| ((this.input.state===this.input.wireStateId.indexOf('unknown') 
			|| this.input.state===this.input.wireStateId.indexOf('idle') 
			|| this.input.state===this.input.wireStateId.indexOf('underpowered')) 
				&& this.input2.state===this.input2.wireStateId.indexOf('unknown'))) {
		if(this.output.state!==this.output.wireStateId.indexOf('unknown')) {
			this.output.setState('unknown');
		}
	}
	else if(this.output.state!==this.output.wireStateId.indexOf('idle')) {
		this.output.setState('idle');
	}
}