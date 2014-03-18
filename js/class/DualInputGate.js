function DualInputGate() {
	// Sub class constructor
}
DualInputGate.prototype = new LogicGate();


DualInputGate.prototype.foo = function() {
	console.log('Dual Input Gate foo!');
}

DualInputGate.prototype.bar = function(parameter) {
	console.log('dual gate baaaaaar: '+parameter);
}