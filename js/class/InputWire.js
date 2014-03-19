function InputWire(gate, shift) {
	Wire.apply(this, arguments);
	
	this.shift = shift;
}
InputWire.prototype = new Wire();
InputWire.prototype.constructor = InputWire;