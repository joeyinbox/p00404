function UserInterface() {
	
}

/**
 * Loads all resources to get ready for revealing the interface
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
UserInterface.prototype.loadResources = function() {
	// Get the Logic gates resources through their static method getResource and add them to the resource array
	resourceToLoad = gateType.length;
	
	for (var i=0; i<gateType.length; i++) {
		resource[i] = preloadImage(gateType[i].getResource());
	}
};


/**
 * Preloads an image in cache to be able to use it directly later on
 * 
 * @param	url(string)		url of an image
 * @return	an Image object if the processing was successful, else null
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
UserInterface.prototype.preloadImage = function(url) {
	try {
		var img = new Image();
		img.onload = resourceLoaded();
		img.src = url;
		
		// The image has been successfully loaded
		return img;
	} catch (e) {
		error = true;
		// Need to display an error message
		
		return null;
	}
};


/**
 * Increments the resourceLoadedCount and check if all resources have been loaded
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
UserInterface.prototype.resourceLoaded = function() {
	if(++resourceLoadedCount==resourceToLoad) {
		// Everything has been loaded
		// Reveal interface
	}
};




/**
 * Add a gate to the interface
 * 
 * @param	type(int)	Type index of the Gate to add
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
UserInterface.prototype.addGate = function(type) {
	// Check if the type is known
	if(gateType[type]!==undefined) {
		// Create a new Gate of this particular type
		gateList.push(new gateType[type]());
	}
};


/**
 * Remove a gate from the interface
 * 
 * @param	gate(LogicGate)	LogicGate subclass object to remove
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
UserInterface.prototype.removeGate = function(gate) {
	// Check if the gate is known
	var index = gateList.indexOf(gate);
	if(index!==-1) {
		// Go through each of its inputs and outputs to unlink them
		gate.unlinkAllWire();
		
		// Then remove the gate from the list
		gateList.splice(index, 1);
	}
};


/**
 * Refresh the canvas and re-draw every elements
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Name		mm-dd-yyyy	First release	Requirements
 */
UserInterface.prototype.refresh = function() {
	// Clear the canvas
	
	// Re-draw every link
	for(var i=0; i<this.gateList.length; i++) {
		this.gateList[i].output.drawLinks();
	}
	
	// Re-draw every wire and gate
	for(var i=0; i<this.gateList.length; i++) {
		this.gateList[i].drawWires();
		this.gateList[i].drawGate();
	}
}
