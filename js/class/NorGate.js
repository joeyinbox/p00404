/**
 * Constructor of the NorGate class
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
function NorGate(ui, type, x, y) {
	DualInputGate.apply(this, arguments);
}
NorGate.prototype = new DualInputGate();
NorGate.prototype.constructor = NorGate;


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
NorGate.getResource = function() {
	return "img/gate/nor.svg";
}
