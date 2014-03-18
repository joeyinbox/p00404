DualInputGate.prototype = new LogicGate();
DualInputGate.prototype.constructor = DualInputGate;
DualInputGate.prototype.parent = LogicGate.prototype;

function DualInputGate() {
	// Sub class constructor
}

LogicGate.prototype.foo = function() {
	this.parent.foo.call(this);	// call the parent constructor
	console.log('Dual Input Gate foo');
}