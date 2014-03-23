function InputWire(ui, gate, shift) {
	Wire.apply(this, arguments);
	
	this.linkedTo = null;
	this.shift = shift;
	
	this.updateCount = 0;
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
		output.link(this);
		
		this.belongsTo.updateOutputState();
		
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
 * Set the state of the wire
 * 
 * @param	state(int)	Identifier of the state that will be set to the current wire
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
InputWire.prototype.setState = function(state) {
	// Count how many times this wire has been changed in the current action
	if(this.wireStateId.indexOf(state)!==this.state && ++this.updateCount>4) {
		// Future calls will fall into the previous statement but will fail the following one, preventing therefore the bubbling effect to continue
		if(this.state!==this.wireStateId.indexOf('unknown')) {
			this.state = this.wireStateId.indexOf('unknown');
			this.belongsTo.updateOutputState();
		}
	}
	// The treshold has not been triggered yet
	else {
		this.state = this.wireStateId.indexOf(state) || this.wireStateId.indexOf('idle');
		this.belongsTo.updateOutputState();
	}
	
	// This method is recursive. As a result, the following statement will be called only after all update bubbling is finished
	this.updateCount = 0;
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
	// Get available options for this wire
	var options = [];
	
	if(this.linkedTo===null) {
		options.push({
			id: this.ui.optionId.indexOf('toggleState'),
			text: 'Toggle the state'
		});
	}
	
	switch(this.ui.currentAction) {
		case this.ui.optionId.indexOf('select'):
			if(this.linkedTo===null) {
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
			break;
		case this.ui.optionId.indexOf('link'):
			if(this.ui.currentActionOrigin!==null) {
				if(this.ui.currentActionOrigin===this) {
					options.push({
						id: this.ui.optionId.indexOf('cancel'),
						text: 'Cancel linking'
					});
				}
				else if(this.ui.currentActionOrigin.belongsTo!=this.belongsTo && this.ui.currentActionOrigin.constructor.name==='OutputWire' && this.linkedTo===null) {
					options.push({
						id: this.ui.optionId.indexOf('link'),
						text: 'Link to this wire'
					});
				}
			}
			
			if(this.linkedTo!==null) {
				options.push({
					id: this.ui.optionId.indexOf('unlink'),
					text: 'Unlink this wire'
				});
			}
			break
		case this.ui.optionId.indexOf('unlink'):
			if(this.linkedTo===null) {
				options.push({
					id: this.ui.optionId.indexOf('link'),
					text: 'Link this wire'
				});
			}
			else if(this.ui.currentActionOrigin!==null) {
				if(this.ui.currentActionOrigin===this) {
					options.push({
						id: this.ui.optionId.indexOf('cancel'),
						text: 'Cancel unlinking'
					});
				}
				else if(this.ui.currentActionOrigin.belongsTo!=this.belongsTo && this.ui.currentActionOrigin.constructor.name==='OutputWire' && this.ui.currentActionOrigin.linkedTo.indexOf(this)!==-1) {
					options.push({
						id: this.ui.optionId.indexOf('unlink'),
						text: 'Unlink from this wire'
					});
				}
			}
			break;
	}
	
	if(options.length===0) {
		options.push({
			id: this.ui.optionId.indexOf('disabled'),
			text: 'No action available'
		});
	}
	
	if(this.ui.currentActionOrigin===null) {
		this.ui.currentActionOrigin = this;
	}
	
	this.ui.pointer.setContextualMenuSource(this);
	this.ui.displayMenu(options);
};