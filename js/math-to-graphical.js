$(function(){
	
	// Creates the user interface
	var ui = new InteractiveUI();
	
	// Allow to add gates on the board
	$('#gates a').on('click', function() {
		ui.addGate($(this).data('type'));
		return false;
	});
	
});