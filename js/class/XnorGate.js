/**
 * Constructor of the XnorGate class
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
function XnorGate(ui, type, x, y) {
	DualInputGate.apply(this, arguments);
}
XnorGate.prototype = new DualInputGate();
XnorGate.prototype.constructor = XnorGate;


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
XnorGate.getResource = function() {
	return "img/gate/xnor.svg";
}
