function OutputWire(ui, gate) {
	Wire.apply(this, arguments);
	
	this.linkedTo = [];
}
OutputWire.prototype = new Wire();
OutputWire.prototype.constructor = OutputWire;


/**
 * Attempts to link this output wire to an input wire of another gate
 * 
 * @param	input(InputWire)	The input wire to be linked to
 * @return	boolean		To assert if the operation went well to get rid of the global linking flag
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
OutputWire.prototype.link = function(input) {
	if(input.constructor.name==="InputWire" && this.linkedTo.indexOf(input)===-1 && this.belongsTo!==input.belongsTo) {
		this.linkedTo.push(input);
		
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
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
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
		this.ui.context.moveTo(from.x, from.y);
		this.ui.context.lineTo(to.x, to.y);
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
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
OutputWire.prototype.getPosition = function() {
	
	var parentPosition = this.belongsTo.getPosition();
	
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
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
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
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
OutputWire.prototype.unlink = function(input) {
	var index = this.linkedTo.indexOf(input);
	if(input.constructor.name==="InputWire" && index!==-1) {
		// The target wire is an input
		this.linkedTo[index].linkedTo = null;
		this.linkedTo[index].state = this.wireStateId.idle;
		this.linkedTo.splice(index, 1);
		
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
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
Wire.prototype.setState = function(state) {
	if(wireStateId.indexOf(state)!==-1) {
		this.state = state;
		
		// Change eventually any connected input
		for(var i=0; i<this.linkedTo.length; i++) {
			this.linkedTo[i].state = state;
		}
	}
};