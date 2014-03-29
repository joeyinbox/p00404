/**
 * Constructor of the InteractiveUI class
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
function InteractiveUI() {
	// Call the parent class constructor
	UserInterface.apply(this, arguments);
	
	this.optionId = [];
	
	// This value allows to shift the addition of gates on the board to prevent them from being visually stacked over each others
	this.insertShift = 5;
	
	// Get a reference to the DOM canvas where everything will be drawn on
	this.canvas = document.getElementById('canvas');
	this.context = this.canvas.getContext("2d");
	
	// Adapt the canvas size to the viewport and attach a listener to re-adapt it when the user resize its browser
	var that = this;
	$(window).resize(function() {
		that.adaptCanvas();
	});
	this.adaptCanvas();
	
	// Initialize an eventual contextual menu and attach a listener when the user will use it
	$('#contextualMenu').on('mouseleave', this.hideMenu.bind(this));
	$('#contextualMenu').on('click', 'a', function() {
		that.selectOption($(this).data('type'));
		return false;
	});
	
	// Load resources into memory
	this.loadResources();
	
	// Declare all options
	this.optionId.push('select');
	this.optionId.push('link');
	this.optionId.push('unlink');
	this.optionId.push('remove');
	this.optionId.push('toggleState');
	this.optionId.push('cancel');
	this.optionId.push('none');
	
	// Initialise the current action performed by the user
	this.currentAction = this.optionId.indexOf('select');
	this.currentActionOrigin = null;
	
	// Handle mouse events
	this.pointer = new Pointer(this.canvas);
	
	// Set the refresh timer
	this.loop = setInterval(this.refresh.bind(this), 30);
}
// Declare the inheritence-like pattern and override the constructor method
InteractiveUI.prototype = new UserInterface();
InteractiveUI.prototype.constructor = InteractiveUI;


/**
 * Adapt the size of the canvas to the viewport
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.1.4	Usman		03-20-2014	First release	Requirements
 */
InteractiveUI.prototype.adaptCanvas = function() {
	// Compute the size of the window minus the menu size or the header size
	this.canvas.width = window.innerWidth-parseInt($('#menu').outerWidth());
    this.canvas.height = window.innerHeight-parseInt($('header.nav').outerHeight());
	
	// Resize the height of the left side menu to fill the whole page
	$('#menu').css('height', this.canvas.height);
};


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
InteractiveUI.prototype.addGate = function(type) {
	// Checks if the type is known
	if(this.gateType[type]!==undefined) {
		// Create a new Gate of this particular type
		this.gateList.push(new this.gateType[type](this, type, this.insertShift*10, this.insertShift*10));
		this.insertShift++;
	}
};


/**
 * Refresh the canvas and re-draw every elements
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.1.3	Chris		03-19-2014	First release		Requirements
 * 0.2.1	Joey		03-20-2014	Add wires support	Requirements
 * 0.4.0	Usman		03-22-2014	Add state update	Requirements
 * 0.5.0	Chris		03-23-2014	Add links support	Requirements
 */
InteractiveUI.prototype.refresh = function() {
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
 * Display a contextual menu to interact with a component
 * 
 * @param	options(array[int])	Identifier of options from the optionId array
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.3.1	Chris		03-21-2014	First release	Requirements
 */
InteractiveUI.prototype.displayMenu = function(options) {
	// Notify the pointer that a contextual menu is about to be displayed
	this.pointer.contextualMenu = true;
	
	// Construct the content of the contextual menu based on the available options decided in the pointerInteraction method of the wires
	var content = '';
	for(var i=0; i<options.length; i++) {
		content += '<li class="'+this.optionId[options[i].id]+'"><a data-type="'+options[i].id+'" href="#">'+options[i].text+'</li>';
	}
	
	// Reveal the contextual menu under the pointer position
	var position = this.pointer.getPosition();
	$('#contextualMenu').html(content).css({'top': position.y, 'left': position.x+parseInt($('#menu').outerWidth())}).fadeIn(200);
};


/**
 * Select an option in the contextual menu
 * 
 * @param	option(int)
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change					Reason
 * 0.3.1	Chris		03-21-2014	First release			Requirements
 * 0.3.2	Usman		03-21-2014	Add none option			Requirements
 * 0.4.0	Joey		03-22-2014	Add state toggling		Requirements
 * 0.5.0	Chris		03-23-2014	Link link option		Requirements
 * 0.5.2	Chris		03-23-2014	Link unlink option		Requirements
 * 0.7.2	Chris		03-27-2014	Refresh truth table		Requirements
 */
InteractiveUI.prototype.selectOption = function(option) {
	switch(this.optionId[option]) {
		case 'toggleState':
			// If the wire was not powered
			if(this.pointer.contextualMenuSource.wireStateId.indexOf('idle')===this.pointer.contextualMenuSource.state) {
				this.pointer.contextualMenuSource.setState('powered');
			}
			else {
				this.pointer.contextualMenuSource.setState('idle');
			}
			// Refresh the corresponding truth table
			this.pointer.contextualMenuSource.belongsTo.truthTable();
			break;
		case 'link':
			// If the user started a link action with another wire
			if(this.currentAction===this.optionId.indexOf('link') && this.currentActionOrigin!==null) {
				// The following method assert if both wires can be linked and do it if so
				if(this.currentActionOrigin.link(this.pointer.contextualMenuSource)) {
					// Reset the current action as the link has been performed
					this.currentAction = this.optionId.indexOf('select');
					this.currentActionOrigin = null;
				}
			}
			else {
				// The user just started the link action
				// Set the current action and holds the wire that originated it
				this.currentAction = this.optionId.indexOf('link');
				this.currentActionOrigin = this.pointer.contextualMenuSource;
			}
			break;
		case 'unlink':
			// If the user started an unlink action with another wire
			if(this.currentAction===this.optionId.indexOf('unlink') && this.currentActionOrigin!==null) {
				// The following method assert if both wires can be unlinked and do it if so
				if(this.currentActionOrigin.unlink(this.pointer.contextualMenuSource)) {
					// Reset the current action as the unlink has been performed
					this.currentAction = this.optionId.indexOf('select');
					this.currentActionOrigin = null;
				}
			}
			else {
				// The user just started the unlink action
				// Set the current action and holds the wire that originated it
				this.currentAction = this.optionId.indexOf('unlink');
				this.currentActionOrigin = this.pointer.contextualMenuSource;
			}
			break;
		case 'none':
			// do nothing.. Yes really :)
			break;
		default:
			// Reset the current action
			this.currentAction = this.optionId.indexOf('select');
			this.currentActionOrigin = null;
	}
	
	this.hideMenu();
};