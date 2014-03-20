/**
 * Constructor of the OrGate class
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
function OrGate(ui, type, x, y) {
	DualInputGate.apply(this, arguments);
}
OrGate.prototype = new DualInputGate();
OrGate.prototype.constructor = OrGate;


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
OrGate.getResource = function() {
	return "img/gate/or.svg";
}
