/**
 * Constructor of the InputWire class which inherits from the Wire class
 * 
 * @param	ui(UserInterface)	Instance of the current user interface which coordinates everything
 * @param	gate(Wire)			Instance of the wire to whom belongs this input wire
 * @param	shift(int)			Factor to shift the Y position: 0 for left, 1 for center and 2 for right
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change										Reason
 * 0.2.0	Joey		03-20-2014	First release								Requirements
 * 0.5.5	Joey		03-23-2014	Add updateCount to detect unknown state		Issue #1 raised
 */
function InputWire(ui, gate, shift) {
	// Call the parent class constructor
	Wire.apply(this, arguments);
	
	// An input wire can only be linked to one output wire. A simple object is therefore enough
	this.linkedTo = null;
	this.shift = shift;
	
	// This will prevent an infinite bubbling effect while updating the state of this wire
	this.updateCount = 0;
}
// Declare the inheritence-like pattern and override the constructor method
InputWire.prototype = new Wire();
InputWire.prototype.constructor = InputWire;


/**
 * Attempts to link this input wire to an output wire of another gate
 * 
 * @param	output(OutputWire)	The output wire to be linked to
 * @return	boolean				To assert if the operation went well to get rid of the global linking flag
 *
 * Modification history
 * Version	Modifier	Date		Change								Reason
 * 0.5.0	Usman		03-23-2014	First release						Requirements
 * 0.5.1	Joey		03-23-2014	Forward update to the holder class	Requirements
 */
InputWire.prototype.link = function(output) {
	// An input wire can only be linked to an external output wire
	if(this.linkedTo===null && output.constructor.name==="OutputWire" && this.belongsTo!==output.belongsTo) {
		this.linkedTo = output;
		this.state = output.state;
		
		// Notify the output wire that it has been linked
		output.link(this);
		
		// Notify the gate that the output state may have changed
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
 * 0.2.0	Joey		03-20-2014	First release	Requirements
 */
InputWire.prototype.getPosition = function() {
	var parentPosition = this.belongsTo.getPosition();
	// Extra values added to the actual position correct the joint between the two lines to make it continuous
	
	/* The shift attribute needs to be used as followed:
	   0: the wire will be positionned on the first left quarter of the gate
	   1: the wire will be positionned on the center of the gate
	   2: the wire will be positionned on the third quarter of the gate
	   As a result, this covers both Single and Dual input gates. */
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
 * 0.5.2	Usman		03-23-2014	First release	Requirements
 */
InputWire.prototype.unlink = function() {
	if(this.linkedTo!==null) {
		// The target wire is an output that hold its links in an array
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
 * Version	Modifier	Date		Change										Reason
 * 0.4.0	Joey		03-22-2014	First release								Requirements
 * 0.4.1	Joey		03-22-2014	Notify holder to check the output state		Requirements
 * 0.5.5	Joey		03-23-2014	Detect unknown state						Issue #1 raised
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
	
	// This method is recursive. As a result, the following statement will be called only after all update bubbling are finished
	this.updateCount = 0;
};


/**
 * Handle the interaction with the pointer
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change												Reason
 * 0.3.0	Joey		03-21-2014	First release										Requirements
 * 0.3.1	Joey		03-21-2014	Call menu display method							Requirements
 * 0.3.2	Joey		03-21-2014	Use ui action origin instead of pointer's one		Requirements
 * 0.5.3	Chris		03-23-2014	Correct improper index								Bugfix #3
 */
InputWire.prototype.pointerInteraction = function() {
	// Get available options for this wire
	var options = [];
	
	// An input wire state can only be toggled if it is not dependent of another linked output wire
	if(this.linkedTo===null) {
		options.push({
			id: this.ui.optionId.indexOf('toggleState'),
			text: 'Toggle the state'
		});
	}
	
	// In regard to the current action performed by the user, corresponding options will be available
	switch(this.ui.currentAction) {
		case this.ui.optionId.indexOf('select'):
			// An input wire can only be either linked or unlinked
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
			// The UI holds the identity of the wire which initiated the current action
			// As a result, this assert that the user is not just starting an action but continuing it
			if(this.ui.currentActionOrigin!==null) {
				// User can cancel the action if it interact with the same one again
				if(this.ui.currentActionOrigin===this) {
					options.push({
						id: this.ui.optionId.indexOf('cancel'),
						text: 'Cancel linking'
					});
				}
				// This makes sure that this input wire can potentially be linked to an eventual external output wire
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
	
	// There might be a scenario where none of the options listed above are available
	if(options.length===0) {
		options.push({
			id: this.ui.optionId.indexOf('disabled'),
			text: 'No action available'
		});
	}
	
	// This notify the UI that a new action has been initiated by the current wire
	if(this.ui.currentActionOrigin===null) {
		this.ui.currentActionOrigin = this;
	}
	
	// In order to display the contextual menu at the right position, this holds the current wire as a source of this interaction
	this.ui.pointer.setContextualMenuSource(this);
	this.ui.displayMenu(options);
};