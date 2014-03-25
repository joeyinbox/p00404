$(function(){
	
	var ui = new UserInterface();
	
	$('#gates a').on('click', function() {
		ui.addGate($(this).data('type'));
	});
	
});