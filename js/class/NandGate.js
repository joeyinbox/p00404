/**
 * Constructor of the NandGate class
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
function NandGate(ui, type, x, y) {
	DualInputGate.apply(this, arguments);
}
NandGate.prototype = new DualInputGate();
NandGate.prototype.constructor = NandGate;


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
NandGate.getResource = function() {
	return "img/gate/nand.svg";
}
