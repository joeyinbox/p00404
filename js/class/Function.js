/**
 * Add an extend feature to the Function object
 * 
 * @param	parentClassOrObject		The class or object to extend from
 * @return	Object	The subclass that will extend the parent one
 *
 * Original Copyright
 * Gavin Kistner - http://phrogz.net/JS/classes/OOPinJS2.html
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
Function.prototype.extends = function(parentClassOrObject) { 
	if (parentClassOrObject.constructor==Function) { 
		// Normal Inheritance 
		this.prototype = new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
	} 
	else { 
		// Pure Virtual Inheritance 
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject;
	} 
	return this;
}