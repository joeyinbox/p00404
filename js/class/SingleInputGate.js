function SingleInputGate(ui, type, x, y) {
	LogicGate.apply(this, arguments);
	
	this.input = new InputWire(1);
}
SingleInputGate.prototype = new LogicGate();
SingleInputGate.prototype.constructor = SingleInputGate;

