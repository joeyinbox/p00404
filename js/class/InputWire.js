function InputWire(ui, gate, shift) {
	Wire.apply(this, arguments);
	
	this.linkedTo = null;
	this.shift = shift;
}
InputWire.prototype = new Wire();
InputWire.prototype.constructor = InputWire;


/**
 * Attempts to link this input wire to an output wire of another gate
 * 
 * @param	output(OutputWire)	The output wire to be linked to
 * @return	boolean		To assert if the operation went well to get rid of the global linking flag
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
InputWire.prototype.link = function(output) {
	if(this.linkedTo===null && output.constructor.name==="OutputWire" && this.belongsTo!==output.belongsTo) {
		this.linkedTo = output;
		this.state = output.state;
		
		return true;
	}
	return false;
};


/**
 * Returns the position coordinates of an input wire
 * 
 * @param	none
 * @return	{x,y}(object)	Coordinates of the wire
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
InputWire.prototype.getPosition = function() {
	
	var parentPosition = this.belongsTo.getPosition();
	
	return {
		"x": parentPosition.x+((this.belongsTo.width/4)*(1+this.shift)),
		"y": parentPosition.y-this.height+8
	}
};


/**
 * Remove an eventual link made between this input wire and an output of another gate
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
InputWire.prototype.unlink = function() {
	if(this.linkedTo!==null) {
		// The target wire is an output
		var index = this.linkedTo.linkedTo.indexOf(this);
		this.linkedTo.linkedTo.splice(index, 1);
		this.linkedTo = null;
	}
};


/**
 * Handle the interaction with the pointer
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Joey		03-22-2014	First release	Requirements
 */
InputWire.prototype.pointerInteraction = function() {
	this.ui.pointer.setBusyWith(this);
	
	// Get available options for this wire
	var options = [];
	
	if(this.linkedTo===null) {
		options.push({
			id: this.ui.optionId.indexOf('toggleState'),
			text: 'Toggle the state'
		});
		options.push({
			id: this.ui.optionId.indexOf('link'),
			text: 'Link this wire'
		});
	}
	else {
		options.push({
			id: this.ui.optionId.indexOf('unlink'),
			text: 'Unlink this wire'
		});
	}
	
	this.ui.displayMenu(options);
};