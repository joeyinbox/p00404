/**
 * Constructor of the NotGate class
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
function NotGate(ui, type, x, y) {
	SingleInputGate.apply(this, arguments);
}
NotGate.prototype = new SingleInputGate();
NotGate.prototype.constructor = NotGate;


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
NotGate.getResource = function() {
	return "img/gate/not.svg";
}
