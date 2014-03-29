/**
 * Constructor of the PresentationUI class
 * Declare all variables and set the interface ready
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change													Reason
 * 0.1.0	Joey		03-19-2014	First release of UserInterface class					Requirements
 * 0.1.1	Joey		03-19-2014	GateType and Load all resources							Requirements
 * 0.1.2	Usman		03-19-2014	Add the gateList to store gates							Requirements
 * 0.1.3	Chris		03-19-2014	Refresh ui timer										Requirements
 * 0.1.4	Usman		03-20-2014	Window resize event to adapt canvas						Design specifications
 * 0.2.0	Usman		03-20-2014	Add wire states colors									Requirements
 * 0.2.3	Joey		03-21-2014	Add the shifted position								UX refinement
 * 0.3.0	Chris		03-21-2014	OptionId array declaration								Requirements
 * 0.3.1	Joey		03-21-2014	Create pointer reference								Refinement of ui class
 * 0.3.1	Chris		03-21-2014	Add contextual menu event listeners						Requirements
 * 0.3.2	Chris		03-21-2014	Add currentAction related attributes					Requirements
 * 0.3.3	Usman		03-22-2014	Add unknown and underpowered colors						Ethnological refinement
 * 0.7.1	Joey		03-27-2014	First release inherited from UserInterface class		Refinement
 */
function PresentationUI(canvasId, gateType) {
	// Call the parent class constructor
	UserInterface.apply(this, arguments);
	
	this.optionId = [];
	this.gateToAdd = gateType;
	this.canvasId = canvasId;
	
	// Get a reference to the DOM canvas where everything will be drawn on
	this.canvas = document.getElementById(canvasId);
	this.context = this.canvas.getContext("2d");
	
	this.canvas.width = 140;
    this.canvas.height = 300;
	
	// Initialize an eventual contextual menu and attach a listener when the user will use it
	var that = this;
	$('#contextualMenu').on('mouseleave', this.hideMenu.bind(this));
	$('#contextualMenu').on('click', 'a', function() {
		that.selectOption($(this).data('type'));
		return false;
	});
	
	// Load resources into memory
	this.loadResources();
	
	// Declare all options
	this.optionId.push('idle');
	this.optionId.push('powered');
	this.optionId.push('unknown');
	this.optionId.push('underpowered');
	
	// Handle mouse events
	this.pointer = new Pointer(this.canvas);
	
	// Set the refresh timer
	this.loop = setInterval(this.refresh.bind(this), 30);
}
// Declare the inheritence-like pattern and override the constructor method
PresentationUI.prototype = new UserInterface();
PresentationUI.prototype.constructor = PresentationUI;


/**
 * Add a gate to the interface
 * 
 * @param	type(int)	Type index of the Gate to add
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change						Reason
 * 0.1.2	Usman		03-19-2014	First release				Requirements
 * 0.1.3	Joey		03-19-2014	Add the shifted position	Requirements
 */
PresentationUI.prototype.addGate = function(type) {
	// Checks if the type is known
	if(this.gateType[type]!==undefined) {
		// Create a new Gate of this particular type
		this.gateList.push(new this.gateType[type](this, type, 0, 40));
		this.gateList[this.gateList.length-1].switchToPresentationMode();
		this.gateList[this.gateList.length-1].truthTable();
	}
};


/**
 * Refresh the canvas and re-draw every elements
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change						Reason
 * 0.1.3	Chris		03-19-2014	First release				Requirements
 * 0.2.1	Joey		03-20-2014	Add wires support			Requirements
 * 0.4.0	Usman		03-22-2014	Add state update			Requirements
 * 0.5.0	Chris		03-23-2014	Add links support			Requirements
 * 0.7.2	Joey		03-27-2014	Remove links support		Requirements
 */
PresentationUI.prototype.refresh = function() {
	// Update all components state
	for(var i=this.gateList.length-1; i>=0; i--) {
		this.gateList[i].update();
	}
	
	// Clear the canvas
	this.context.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
	
	// Re-draw every wire and gate
	for(var i=0; i<this.gateList.length; i++) {
		this.gateList[i].drawWires();
		this.gateList[i].drawGate();
	}
}


/**
 * Display a contextual menu to interact with a component
 * 
 * @param	options(array[int])	Identifier of options from the optionId array
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change								Reason
 * 0.3.1	Chris		03-21-2014	First release						Requirements
 * 0.7.5	Usman		03-27-2014	Add offset for presentation mode	Requirements
 */
PresentationUI.prototype.displayMenu = function(options) {
	// Notify the pointer that a contextual menu is about to be displayed
	this.pointer.contextualMenu = true;
	
	// Construct the content of the contextual menu based on the available options decided in the pointerInteraction method of the wires
	var content = '';
	for(var i=0; i<options.length; i++) {
		content += '<li class="'+this.optionId[options[i].id]+'"><a data-type="'+options[i].id+'" href="#">'+options[i].text+'</li>';
	}
	
	// Reveal the contextual menu under the pointer position
	var position = this.pointer.getPosition();
	var offset = $('#'+this.canvasId).offset();
	
	$('#contextualMenu').html(content).css({'top': offset.top+position.y, 'left': offset.left+position.x}).fadeIn(200);
};


/**
 * Select an option in the contextual menu
 * 
 * @param	option(int)
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.7.2	Joey		03-27-2014	First release		Requirements
 */
PresentationUI.prototype.selectOption = function(option) {
	if(this.pointer.contextualMenuSource!==null) {
		this.pointer.contextualMenuSource.setState(this.pointer.contextualMenuSource.wireStateId[option]);
		this.pointer.contextualMenuSource.belongsTo.truthTable();
	}
	
	this.hideMenu();
};


/**
 * Callback called when the interface is ready
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.7.6	Joey		03-27-2014	First release		Requirements
 */
PresentationUI.prototype.ready = function() {
	this.addGate(this.gateToAdd);
}