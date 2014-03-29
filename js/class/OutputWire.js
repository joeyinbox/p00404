/**
 * Constructor of the OutputWire class which inherits from the Wire class
 * 
 * @param	ui(UserInterface)	Instance of the current user interface which coordinates everything
 * @param	gate(Wire)			Instance of the wire to whom belongs this input wire
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change										Reason
 * 0.2.0	Joey		03-20-2014	First release								Requirements
 * 0.5.5	Joey		03-23-2014	Add updateCount to detect unknown state		Issue #1 raised
 */
function OutputWire(ui, gate) {
	// Call the parent class constructor
	Wire.apply(this, arguments);
	
	this.linkedTo = [];
}
// Declare the inheritence-like pattern and override the constructor method
OutputWire.prototype = new Wire();
OutputWire.prototype.constructor = OutputWire;


/**
 * Attempts to link this output wire to an input wire of another gate
 * 
 * @param	input(InputWire)	The input wire to be linked to
 * @return	boolean		To assert if the operation went well to get rid of the global linking flag
 *
 * Modification history
 * Version	Modifier	Date		Change					Reason
 * 0.5.0	Usman		03-23-2014	First release			Requirements
 * 0.5.4	Joey		03-23-2014	Check power limit		Requirements
 */
OutputWire.prototype.link = function(input) {
	if(input.constructor.name==="InputWire" && this.linkedTo.indexOf(input)===-1 && this.belongsTo!==input.belongsTo) {
		this.linkedTo.push(input);
		input.link(this);
		
		// Check if the power limit is reached for this output
		this.underPowered();
		
		return true;
	}
	return false;
};


/**
 * Draw links from an output wire
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.5.0	Joey		03-23-2014	First release	Requirements
 */
OutputWire.prototype.drawLinks = function() {
	for(var i=0; i<this.linkedTo.length; i++) {
		// Impact the state of the linked input
		this.linkedTo[i].state = this.state;
		
		// Draw the link
		var from = this.getPosition();
		var to = this.linkedTo[i].getPosition();
		
		this.ui.context.lineWidth = this.width;
		this.ui.context.beginPath();
		this.ui.context.moveTo(from.x, from.y+this.height-this.width/2);
		this.ui.context.lineTo(to.x, to.y+this.width/2);
		this.ui.context.strokeStyle = this.ui.color[this.state];
		this.ui.context.stroke();
	}
};


/**
 * Returns the position coordinates of an output wire
 * 
 * @param	none
 * @return	{x,y}(object)	Coordinates of the wire
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.2.0	Joey		03-20-2014	First release	Requirements
 */
OutputWire.prototype.getPosition = function() {
	var parentPosition = this.belongsTo.getPosition();
	// Extra values added to the actual position correct the joint between the two lines to make it continuous
	
	return {
		"x": parentPosition.x+(this.belongsTo.width/2),
		"y": parentPosition.y+this.belongsTo.height-8
	}
};


/**
 * Remove all eventual links made between this output wire and inputs of other gates
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.5.2	Chris		03-23-2014	First release	Requirements
 */
OutputWire.prototype.unlinkAll = function() {
	for(var i=0; i<this.linkedTo.length; i++) {
		// The target wire is an input
		this.linkedTo[i].linkedTo = null;
		this.linkedTo[i].state = this.wireStateId.idle;
	}
	this.linkedTo = [];
};


/**
 * Remove an eventual link made between this output wire and an input of another gate
 * 
 * @param	wire(InputWire)
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change										Reason
 * 0.5.2	Chris		03-23-2014	First release								Requirements
 * 0.6.6	Joey		03-25-2014	Notify linked gate to update its output		Bugfix #6
 */
OutputWire.prototype.unlink = function(input) {
	var index = this.linkedTo.indexOf(input);
	if(input.constructor.name==="InputWire" && index!==-1) {
		// The target wire is an input
		this.linkedTo[index].linkedTo = null;
		this.linkedTo[index].state = this.wireStateId.idle;
		this.linkedTo[index].belongsTo.updateOutputState();
		this.linkedTo.splice(index, 1);
		
		// Notify the gate to eventually update its state
		this.belongsTo.updateOutputState();
		
		return true;
	}
};


/**
 * Set the state of the wire
 * 
 * @param	state(int)	Identifier of the state that will be set to the current wire
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change							Reason
 * 0.4.0	Joey		03-22-2014	First release					Requirements
 * 0.5.4	Joey		03-23-2014	Handle underpowered state		Issue #1 raised
 */
OutputWire.prototype.setState = function(state) {
	if(this.wireStateId.indexOf(state)!==-1) {
		if(state==='underpowered') {
			this.state = this.wireStateId.indexOf(state);
		}
		else if(!this.underPowered()) {
			this.state = this.wireStateId.indexOf(state);
		}
		
		// Change eventually any connected input
		for(var i=0; i<this.linkedTo.length; i++) {
			this.linkedTo[i].setState(this.linkedTo[i].wireStateId[this.state]);
		}
	}
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
OutputWire.prototype.pointerInteraction = function() {
	// Get available options
	var options = [];
	
	switch(this.ui.currentAction) {
		case this.ui.optionId.indexOf('select'):
			options.push({
				id: this.ui.optionId.indexOf('link'),
				text: 'Link this wire'
			});
			
			if(this.linkedTo.length>0) {
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
				else if(this.ui.currentActionOrigin.belongsTo!=this.belongsTo && this.ui.currentActionOrigin.constructor.name==='InputWire') {
					options.push({
						id: this.ui.optionId.indexOf('link'),
						text: 'Link to this wire'
					});
				}
			}
			
			if(this.linkedTo.length>0) {
				options.push({
					id: this.ui.optionId.indexOf('unlink'),
					text: 'Unlink this wire'
				});
			}
			break
		case this.ui.optionId.indexOf('unlink'):
			options.push({
				id: this.ui.optionId.indexOf('link'),
				text: 'Link this wire'
			});
			
			if(this.ui.currentActionOrigin!==null) {
				if(this.ui.currentActionOrigin===this) {
					options.push({
						id: this.ui.optionId.indexOf('cancel'),
						text: 'Cancel unlinking'
					});
				}
				// If the wire which originated the current action is an external input linked to this wire
				else if(this.ui.currentActionOrigin.belongsTo!=this.belongsTo && this.ui.currentActionOrigin.constructor.name==='InputWire' && this.linkedTo.indexOf(this.ui.currentActionOrigin)!==-1) {
					options.push({
						id: this.ui.optionId.indexOf('unlink'),
						text: 'Unlink from this wire'
					});
				}
			}
			break;
	}
	
	if(this.ui.currentActionOrigin===null) {
		this.ui.currentActionOrigin = this;
	}
	
	if(options.length===0) {
		options.push({
			id: this.ui.optionId.indexOf('none'),
			text: 'No action available'
		});
	}
	
	this.ui.pointer.setContextualMenuSource(this);
	this.ui.displayMenu(options);
};


/**
 * Assert if the power limit has been reached for this wire
 * 
 * @param	none
 * @return	boolean		True if underpowered, otherwise false
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.5.4	Joey		03-23-2014	First release	Requirements
 */
OutputWire.prototype.underPowered = function(input) {
	if(this.linkedTo.length>=5) {
		if(this.state!==this.wireStateId.indexOf('underpowered')) {
			this.setState('underpowered');
		}
		
		return true;
	}
	return false;
};