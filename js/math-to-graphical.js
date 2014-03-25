$(function(){
	
	// Creates the user interface
	var ui = new UserInterface();
	
	// Allow to add gates on the board
	$('#gates a').on('click', function() {
		ui.addGate($(this).data('type'));
	});
	
});