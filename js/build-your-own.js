$(function(){
	
	var ui = new UserInterface();
	
	$('#gates a').on('click', function() {
		ui.addGate($(this).data('type'));
	});
	
	
	
	
	
	
	
	
	
	//ui.addGate(0);
	//console.log(ui.gateList[0]);
	
	//
	
	//setTimeout(function() { ui.refresh(); }, 10);
	
	//console.log(ui.gateList[0].input2);
	
	
	
	
});