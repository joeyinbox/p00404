function OutputWire(gate) {
	Wire.apply(this, arguments);
}
OutputWire.prototype = new Wire();
OutputWire.prototype.constructor = OutputWire;