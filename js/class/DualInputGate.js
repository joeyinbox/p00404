/**
 * Constructor of the DualInputGate class which inherits from the LogicGate class
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
 * 0.2.0	Chris		03-20-2014	Add inputs creation				Requirements
 * 0.2.3	Joey		03-21-2014	Add the shifted position		UX refinement
 */
function DualInputGate(ui, type, x, y) {
	// Call the parent class constructor
	LogicGate.apply(this, arguments);
	
	this.input = new InputWire(ui, this, 0);
	this.input2 = new InputWire(ui, this, 2);
}
// Declare the inheritence-like pattern and override the constructor method
DualInputGate.prototype = new LogicGate();
DualInputGate.prototype.parent = LogicGate.prototype;
DualInputGate.prototype.constructor = DualInputGate;


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
DualInputGate.prototype.unlinkAllWire = function() {
	// Forwards the action to both inputs and the output
	this.input.unlink();
	this.input2.unlink();
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
DualInputGate.prototype.drawWires = function() {
	// Forwards the action to both inputs and the output
	this.input.drawWire();
	this.input2.drawWire();
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
 * 0.7.x	Joey		03-27-2014	Add presentation mode support	Requirements
 */
DualInputGate.prototype.update = function() {
	// Assert if the pointer is interacting with the current gate
	this.parent.update.call(this);
	
	// Assert if the pointer is interacting with the input wires
	if(!this.ui.pointer.isBusy()) {
		if(this.ui.pointer.isHovering(this.input) && this.ui.pointer.pressed===true && this.ui.pointer.dragging===false) {
			if(!this.presentationMode) {
				this.input.pointerInteraction();
			}
			else {
				this.input.pointerPresentationInteraction();
			}
		}
		else if(this.ui.pointer.isHovering(this.input2) && this.ui.pointer.pressed===true && this.ui.pointer.dragging===false) {
			if(!this.presentationMode) {
				this.input2.pointerInteraction();
			}
			else {
				this.input2.pointerPresentationInteraction();
			}
		}
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
 * 0.7.x	Joey		03-27-2014	First release	Requirements
 */
DualInputGate.prototype.switchToPresentationMode = function() {
	// Change the size of the gate
	this.width = 140;
	this.height = this.width*this.ratio;
	
	// Change the size of the wires
	this.input.setSize(40, 10, 6.5);
	this.input2.setSize(40, 10, 6.5);
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
 * Version	Modifier	Date		Change						Reason
 * 0.7.0	Joey		26-20-2014	First release				Requirements
 * 0.7.0 	Chris		26-20-2014	Underpowered comparison 	Requirements
 */
DualInputGate.prototype.truthTable = function() {
	var table = '<table>';
	
	if(this.input.state===this.input.wireStateId.indexOf('unknown') || this.input2.state===this.input.wireStateId.indexOf('unknown')) {
		table += '<tr'+((this.input.state===this.input.wireStateId.indexOf('unknown') && (this.input2.state===this.input.wireStateId.indexOf('idle') || this.input2.state===this.input.wireStateId.indexOf('underpowered')))?' class="current"':'')+'>';
		table += '<td>X</td> <td>0</td> <td>'+this.getOutput(this.input.wireStateId.indexOf('unknown'), this.input.wireStateId.indexOf('idle'))+'</td></tr>';
		
		table += '<tr'+((this.input.state===this.input.wireStateId.indexOf('idle') && (this.input2.state===this.input.wireStateId.indexOf('unknown') || this.input2.state===this.input.wireStateId.indexOf('underpowered')))?' class="current"':'')+'>';
		table += '<td>0</td> <td>X</td> <td>'+this.getOutput(this.input.wireStateId.indexOf('idle'), this.input.wireStateId.indexOf('unknown'))+'</td></tr>';
		
		table += '<tr'+((this.input.state===this.input.wireStateId.indexOf('unknown') && (this.input2.state===this.input.wireStateId.indexOf('powered') || this.input2.state===this.input.wireStateId.indexOf('underpowered')))?' class="current"':'')+'>';
		table += '<td>X</td> <td>1</td> <td>'+this.getOutput(this.input.wireStateId.indexOf('unknown'), this.input.wireStateId.indexOf('powered'))+'</td></tr>';
		
		table += '<tr'+((this.input.state===this.input.wireStateId.indexOf('powered') && (this.input2.state===this.input.wireStateId.indexOf('unknown') || this.input2.state===this.input.wireStateId.indexOf('underpowered')))?' class="current"':'')+'>';
		table += '<td>1</td> <td>X</td> <td>'+this.getOutput(this.input.wireStateId.indexOf('powered'), this.input.wireStateId.indexOf('unknown'))+'</td></tr>';
		
		table += '<tr'+((this.input.state===this.input.wireStateId.indexOf('unknown') && (this.input2.state===this.input.wireStateId.indexOf('unknown') || this.input2.state===this.input.wireStateId.indexOf('underpowered')))?' class="current"':'')+'>';
		table += '<td>X</td> <td>X</td> <td>'+this.getOutput(this.input.wireStateId.indexOf('unknown'), this.input.wireStateId.indexOf('unknown'))+'</td></tr>';
	}
	else {
		table += '<tr'+((this.input.state===this.input.wireStateId.indexOf('idle') && this.input2.state===this.input.wireStateId.indexOf('idle'))?' class="current"':'')+'>';
		table += '<td>0</td> <td>0</td> <td>'+this.getOutput(this.input.wireStateId.indexOf('idle'), this.input.wireStateId.indexOf('idle'))+'</td></tr>';
		
		table += '<tr'+((this.input.state===this.input.wireStateId.indexOf('powered') && this.input2.state===this.input.wireStateId.indexOf('idle'))?' class="current"':'')+'>';
		table += '<td>1</td> <td>0</td> <td>'+this.getOutput(this.input.wireStateId.indexOf('powered'), this.input.wireStateId.indexOf('idle'))+'</td></tr>';
		
		table += '<tr'+((this.input.state===this.input.wireStateId.indexOf('idle') && this.input2.state===this.input.wireStateId.indexOf('powered'))?' class="current"':'')+'>';
		table += '<td>0</td> <td>1</td> <td>'+this.getOutput(this.input.wireStateId.indexOf('idle'), this.input.wireStateId.indexOf('powered'))+'</td></tr>';
		
		table += '<tr'+((this.input.state===this.input.wireStateId.indexOf('powered') && this.input2.state===this.input.wireStateId.indexOf('powered'))?' class="current"':'')+'>';
		table += '<td>1</td> <td>1</td> <td>'+this.getOutput(this.input.wireStateId.indexOf('powered'), this.input.wireStateId.indexOf('powered'))+'</td></tr>';
	}
	
	table += '</table>';
	
	$('#results').html(table);
}