function DualInputGate(ui, type, x, y) {
	LogicGate.apply(this, arguments);
	
	this.input = new InputWire(0);
	this.input2 = new InputWire(2);
}
DualInputGate.prototype = new LogicGate();
DualInputGate.prototype.constructor = DualInputGate;

