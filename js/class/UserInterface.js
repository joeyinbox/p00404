/**
 * Constructor of the UserInterface class
 * Declare all variables and launch resource loading
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Joey		03-19-2014	First release	Requirements
 */
function UserInterface() {
	this.gateList = [];
	this.optionId = [];
	this.resource = [];
	this.resourceToLoad = 0;
	this.resourceLoadedCount = 0;
	this.gateType = [];
	this.error = false;
	this.insertShift = 5;
	
	this.canvas = document.getElementById('canvas');
	this.context = this.canvas.getContext("2d");
	
	// Adapt the canvas size to the viewport
	var that = this;
	$(window).resize(function() {
		that.adaptCanvas();
	});
	this.adaptCanvas();
	
	// Initialize an eventual contextual menu
	$('#contextualMenu').on('mouseleave', this.hideMenu.bind(this));
	$('#contextualMenu').on('click', 'a', function() {
		that.selectOption($(this).data('type'));
	});
	
	// Declare all gate types by their class name
	this.gateType.push(NotGate);
	this.gateType.push(AndGate);
	this.gateType.push(NandGate);
	this.gateType.push(OrGate);
	this.gateType.push(NorGate);
	this.gateType.push(XorGate);
	this.gateType.push(XnorGate);
	
	// Load resources into memory
	this.loadResources();
	
	// Declare all options
	this.optionId.push('select');
	this.optionId.push('link');
	this.optionId.push('unlink');
	this.optionId.push('remove');
	this.optionId.push('toggleState');
	
	this.color = [];
	this.color['idle'] = '#000000';
	this.color['powered'] = '#02AE30';
	this.color['linking'] = '#B42702';
	// TODO: unknown and underpowered
	
	// Handle mouse events
	this.pointer = new Pointer(this.canvas);
	
	// Set the refresh timer
	this.loop = setInterval(this.refresh.bind(this), 30);
}


/**
 * Loads all resources to get ready to reveal the interface
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Joey		03-19-2014	First release	Requirements
 */
UserInterface.prototype.loadResources = function() {
	// Get the Logic gates resources through their static method getResource and add them to the resource array
	this.resourceToLoad = this.gateType.length;
	
	for (var i=0; i<this.resourceToLoad; i++) {
		this.resource[i] = this.preloadImage(this.gateType[i].getResource());
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
 * 0.1		Joey		03-19-2014	First release	Requirements
 */
UserInterface.prototype.preloadImage = function(url) {
	try {
		var img = new Image();
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
 * 0.1		Joey		03-19-2014	First release	Requirements
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
 * 0.1		Joey		03-19-2014	First release	Requirements
 */
UserInterface.prototype.resourceLoaded = function() {
	if(++this.resourceLoadedCount===this.resourceToLoad) {
		// Everything has been loaded
		// Reveal interface
		console.log('reveal interface');
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
 * 0.1		Joey		03-19-2014	First release	Requirements
 */
UserInterface.prototype.addGate = function(type) {
	// Check if the type is known
	if(this.gateType[type]!==undefined) {
		// Create a new Gate of this particular type
		this.gateList.push(new this.gateType[type](this, type, this.insertShift*10, this.insertShift*10));
		this.insertShift++;
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
 * 0.1		Joey		03-19-2014	First release	Requirements
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
 * Refresh the canvas and re-draw every elements
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Joey		03-19-2014	First release	Requirements
 */
UserInterface.prototype.refresh = function() {
	// Update all components state
	for(var i=this.gateList.length-1; i>=0; i--) {
		this.gateList[i].update();
	}
	
	// Clear the canvas
	this.context.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
	
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


/**
 * Return the Image object stored
 * 
 * @param	type(string)	Type of the gate
 * @return	(Image)		Image object of the gate
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Joey		03-19-2014	First release	Requirements
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
 * @param	type(string)	Type of the gate
 * @return	{width,height}		Size of the gate
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Joey		03-19-2014	First release	Requirements
 */
UserInterface.prototype.getResourceSize = function(type) {
	// Check if the type is known
	if(this.gateType[type]!==undefined && this.resource[type]!==undefined) {
		// Create a new Gate of this particular type
		return {width:this.resource[type].width, height:this.resource[type].height};
	}
};


/**
 * Adapt the size of the canvas to the viewport
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Joey		03-22-2014	First release	Requirements
 */
UserInterface.prototype.adaptCanvas = function(type) {
	this.canvas.width = window.innerWidth-parseInt($('#menu').outerWidth());
    this.canvas.height = window.innerHeight-parseInt($('header.nav').outerHeight());
	$('#menu').css('height', this.canvas.height);
};


/**
 * Display a contextual menu to interact with a component
 * 
 * @param	options(array[int])	Identifier of options from the optionId array
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Joey		03-22-2014	First release	Requirements
 */
UserInterface.prototype.displayMenu = function(options) {
	var content = '';
	for(var i=0; i<options.length; i++) {
		content += '<li class="'+this.optionId[options[i].id]+'"><a data-type="'+options[i].id+'" href="#">'+options[i].text+'</li>';
	}
	
	var position = this.pointer.getPosition();
	$('#contextualMenu').html(content).css({'top': position.y, 'left': position.x+parseInt($('#menu').outerWidth())}).fadeIn(200);
	
	this.pointer.contextualMenu = true;
};


/**
 * Hide the contextual menu to interact with a component
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Joey		03-22-2014	First release	Requirements
 */
UserInterface.prototype.hideMenu = function() {
	$('#contextualMenu').fadeOut(200);
	this.pointer.contextualMenu = false;
};


/**
 * Select an option in the contextual menu
 * 
 * @param	option(int)
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1		Joey		03-22-2014	First release	Requirements
 */
UserInterface.prototype.selectOption = function(option) {
	console.log(option);
	this.hideMenu();
};