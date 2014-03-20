/**
 * Constructor of the XorGate class
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
function XorGate(ui, type, x, y) {
	DualInputGate.apply(this, arguments);
}
XorGate.prototype = new DualInputGate();
XorGate.prototype.constructor = XorGate;


/**
 * Get the resource path of the graphical representation of this gate
 * 
 * @param	none
 * @return	(string)	The resource path
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
XorGate.getResource = function() {
	return "img/gate/xor.svg";
}
