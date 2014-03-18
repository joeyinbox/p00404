function AndGate() {
	// Sub class constructor
	console.log('AndGate constructor please');
}
AndGate.prototype = new DualInputGate();


AndGate.prototype.foo = function() {
	console.log('And Gate foo!');
}
