/**
 * Constructor of the AndGate class
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
function AndGate(ui, type, x, y) {
	DualInputGate.apply(this, arguments);
}
AndGate.prototype = new DualInputGate();
AndGate.prototype.constructor = AndGate;


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
AndGate.getResource = function() {
	return "img/gate/and.svg";
}
