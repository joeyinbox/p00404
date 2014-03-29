/**
 * Constructor of the SingleInput class which inherits from the LogicGate class
 * 
 * @param	ui(UserInterface)	Instance of the current user interface which coordinates everything
 * @param	type(int)			General identifier of the type of the current gate
 * @param	x(int)				X position of the gate within the graphical interface
 * @param	y(int)				Y position of the gate within the graphical interface
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change							Reason
 * 0.1.0	Joey		03-19-2014	First release					Requirements
 * 0.2.0	Chris		03-20-2014	Add input creation				Requirements
 * 0.2.3	Joey		03-21-2014	Add the shifted position		UX refinement
 */
function SingleInputGate(ui, type, x, y) {
	// Call the parent class constructor
	LogicGate.apply(this, arguments);
	
	this.input = new InputWire(ui, this, 1);
}
// Declare the inheritence-like pattern and override the constructor method
SingleInputGate.prototype = new LogicGate();
SingleInputGate.prototype.parent = LogicGate.prototype;
SingleInputGate.prototype.constructor = SingleInputGate;


/**
 * Remove all links made between the wires of this gate and the other ones
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change					Reason
 * 0.1.2	Usman		03-19-2014	First release			To include in the gate removing process
 * 0.5.2	Chris		03-23-2014	Actual implementation	Requirements
 */
SingleInputGate.prototype.unlinkAllWire = function() {
	// Forwards the action to the input and output
	this.input.unlink();
	this.output.unlinkAll();
};


/**
 * Draw wires of this gate
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.2.0	Joey		03-20-2014	First release	Requirements
 */
SingleInputGate.prototype.drawWires = function() {
	// Forwards the action to the input and output
	this.input.drawWire();
	this.output.drawWire();
};


/**
 * Update the status of the current gate
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change							Reason
 * 0.3.2	Joey		03-21-2014	First release					Requirements
 * 0.4.0	Usman		03-23-2014	Call parent update				Requirements
 * 0.7.5	Joey		03-27-2014	Add presentation mode support	Requirements
 */
SingleInputGate.prototype.update = function() {
	// Assert if the pointer is interacting with the current gate
	this.parent.update.call(this);
	
	// Assert if the pointer is interacting with the input wire
	if(!this.ui.pointer.isBusy() && this.ui.pointer.isHovering(this.input) && this.ui.pointer.pressed===true && this.ui.pointer.dragging===false) {
		if(!this.presentationMode) {
			this.input.pointerInteraction();
		}
		else {
			this.input.pointerPresentationInteraction();
		}
	}
}


/**
 * Update the status of the current gate's output wire
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change									Reason
 * 0.4.1	Joey		03-22-2014	First release							Requirements
 * 0.7.0    Chris		03-26-2014  Split the logic into a smaller module   Requirements
 */
SingleInputGate.prototype.updateOutputState = function() {
	var state = this.getOutput(this.input.state);
	
	if(this.output.state!==this.output.wireStateId.indexOf(state)) {
		this.output.setState(state);
	}
}


/**
 * Change the parameters for presentation mode
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.7.5	Usman		03-27-2014	First release	Requirements
 */
SingleInputGate.prototype.switchToPresentationMode = function() {
	// Change the size of the gate
	this.width = 140;
	this.height = this.width*this.ratio;
	
	// Change the size of the wires
	this.input.setSize(40, 10, 6.5);
	this.output.setSize(40, 10, -6.5);
	
	// Set the presentation flag
	this.presentationMode = true;
}


/**
 * Generates corresponding truth table in the DOM based on LogicGate state
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.7.0	Chris		03-26-2014	First release		Requirements
 * 0.7.3	Chris		03-26-2014	Add table header	Requirements
 */
SingleInputGate.prototype.truthTable = function() {
	var table = '<table>';
	table += '<tr><th>Input 1</th><th>Output</th></tr>';
	
	table += '<tr'+((this.input.state===this.input.wireStateId.indexOf('idle') || this.input.state===this.input.wireStateId.indexOf('underpowered'))?' class="current"':'')+'>';
	table += '<td>0</td><td>'+this.getOutput(this.input.wireStateId.indexOf('idle'))+'</td></tr>';
	
	table += '<tr'+((this.input.state===this.input.wireStateId.indexOf('powered'))?' class="current"':'')+'>';
	table += '<td>1</td><td>'+this.getOutput(this.input.wireStateId.indexOf('powered'))+'</td></tr>';
	
	table += '<tr'+((this.input.state===this.input.wireStateId.indexOf('unknown'))?' class="current"':'')+'>';
	table += '<td>unknown</td><td>'+this.getOutput(this.input.wireStateId.indexOf('unknown'))+'</td></tr>';
	
	table += '</table>';
	
	// insert table into dom div element
	if(this.presentationMode) {
		$('#'+this.ui.canvasId+'-results').html(table);
	}
	else {
		$('#results').html(table);
	}
}