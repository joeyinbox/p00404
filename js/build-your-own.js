$(function(){
	
	var ui = new InteractiveUI();
	
	$('#gates a').on('click', function() {
		ui.addGate($(this).data('type'));
		return false;
	});
	
});