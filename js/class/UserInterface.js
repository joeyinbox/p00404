/**
 * Constructor of the UserInterface class
 * Declare all variables and set the interface ready
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change																Reason
 * 0.1.0	Joey		03-19-2014	First release														Requirements
 * 0.1.1	Joey		03-19-2014	GateType and Load all resources										Requirements
 * 0.1.2	Usman		03-19-2014	Add the gateList to store gates										Requirements
 * 0.1.3	Chris		03-19-2014	Refresh ui timer													Requirements
 * 0.1.4	Usman		03-20-2014	Window resize event to adapt canvas									Design specifications
 * 0.2.0	Usman		03-20-2014	Add wire states colors												Requirements
 * 0.2.3	Joey		03-21-2014	Add the shifted position											UX refinement
 * 0.3.0	Chris		03-21-2014	OptionId array declaration											Requirements
 * 0.3.1	Joey		03-21-2014	Create pointer reference											Refinement of ui class
 * 0.3.1	Chris		03-21-2014	Add contextual menu event listeners									Requirements
 * 0.3.2	Chris		03-21-2014	Add currentAction related attributes								Requirements
 * 0.3.3	Usman		03-22-2014	Add unknown and underpowered colors									Ethnological refinement
 * 0.7.x	Joey		03-27-2014	Fork the class to divide it between interactive and presentation	Refinement
 * 0.7.x	Joey		03-27-2014	Store original resource size to avoid reloading it					Refinement
 */
function UserInterface() {
	this.gateList = [];
	this.resource = [];
	this.resourceSize = [];
	this.resourceToLoad = 0;
	this.resourceLoadedCount = 0;
	this.gateType = [];
	this.error = false;
	
	// This value allows to shift the addition of gates on the board to prevent them from being visually stacked over each others
	this.insertShift = 5;
	

	
	// Declare all gate types by their class name
	this.gateType.push(NotGate);
	this.gateType.push(AndGate);
	this.gateType.push(NandGate);
	this.gateType.push(OrGate);
	this.gateType.push(NorGate);
	this.gateType.push(XorGate);
	this.gateType.push(XnorGate);
	
	// The following colors will be used to visual represent different wire states
	this.color = [];
	this.color.push('#000000'); // idle
	this.color.push('#02AE30'); // powered
	this.color.push('#4D71F2'); // unknown
	this.color.push('#B42702'); // underpowered
}


/**
 * Loads all resources to get ready to reveal the interface
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1.1	Joey		03-19-2014	First release	Requirements
 */
UserInterface.prototype.loadResources = function() {
	// In case the project needs to load other kind of resource, it uses therefore a global counter rather than just the length of gate types
	this.resourceToLoad = this.gateType.length;
	
	// Get the Logic gates resources through their static method getResource and add them to the resource array
	for (var i=0; i<this.resourceToLoad; i++) {
		this.resource[i] = this.preloadImage(this.gateType[i].getResource());
	}
};


/**
 * Preloads an image in cache to be able to use it directly later on
 * 
 * @param	url(string)		url of an image
 * @return	an Image object if the processing was successful, otherwise null
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1.1	Joey		03-19-2014	First release	Requirements
 */
UserInterface.prototype.preloadImage = function(url) {
	// This operation might trigger an exception that needs to be handled
	try {
		var img = new Image();
		// Attaches event listeners to check the status of the loading
		img.onload = this.resourceLoaded.bind(this);
		img.onerror = this.loadingError.bind(this);
		img.src = url;
		
		// The image has been successfully loaded
		return img;
	} catch (e) {
		this.loadingError();
		
		return null;
	}
};


/**
 * Handle an error during resource loading
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1.1	Joey		03-19-2014	First release	Requirements
 */
UserInterface.prototype.loadingError = function() {
	if(!this.error) {
		this.error = true;
		alert('error during loading');
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
 * 0.1.1	Joey		03-19-2014	First release	Requirements
 */
UserInterface.prototype.resourceLoaded = function() {
	// Increments the counter and check if every resource have been loaded
	if(++this.resourceLoadedCount===this.resourceToLoad) {
		// Everything has been loaded
		for(var i=0; i<this.resource.length; i++) {
			this.resourceSize.push({
				width: this.resource[i].width,
				height: this.resource[i].height
			});
		}
		
		this.ready();
	}
};


/**
 * Remove a gate from the interface
 * 
 * @param	gate(LogicGate)	LogicGate subclass object to remove
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.1.2	Usman		03-19-2014	First release		Requirements
 * 0.5.0	Chris		03-23-2014	Add links support	Requirements
 */
UserInterface.prototype.removeGate = function(gate) {
	// Check if the gate is known
	var index = this.gateList.indexOf(gate);
	if(index!==-1) {
		// Go through each of its inputs and outputs to unlink them
		gate.unlinkAllWire();
		
		// Then remove the gate from the list
		this.gateList.splice(index, 1);
	}
};


/**
 * Return the Image object stored
 * 
 * @param	type(string)	Type of the gate
 * @return	(Image)			Image object of the gate
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1.1	Joey		03-19-2014	First release	Requirements
 */
UserInterface.prototype.getResource = function(type) {
	// Check if the type is known
	if(this.gateType[type]!==undefined && this.resource[type]!==undefined) {
		// Create a new Gate of this particular type
		return this.resource[type];
	}
};


/**
 * Return the Image object size stored
 * 
 * @param	type(string)		Type of the gate
 * @return	{width,height}		Size of the gate
 *
 * Modification history
 * Version	Modifier	Date		Change									Reason
 * 0.1.1	Joey		03-19-2014	First release							Requirements
 * 0.7.x	Joey		03-27-2014	Retrieve informations in class array	Requirements
 */
UserInterface.prototype.getResourceSize = function(type) {
	// Check if the type is known
	if(this.gateType[type]!==undefined && this.resourceSize[type]!==undefined) {
		return this.resourceSize[type];
	}
};


/**
 * Hide the contextual menu to interact with a component
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.3.1	Chris		03-21-2014	First release	Requirements
 */
UserInterface.prototype.hideMenu = function() {
	$('#contextualMenu').fadeOut(200);
	this.pointer.contextualMenu = false;
};


/**
 * Callback called when the interface is ready
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.7.x	Joey		03-27-2014	First release		Requirements
 */
UserInterface.prototype.ready = function() {
	console.log('interface ready');
}