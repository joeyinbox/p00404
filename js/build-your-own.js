$(function(){
	
	var ui = new UserInterface();
	
	$('#button').on('click', function() {
		ui.addGate(Math.round(Math.random()*100)%7);
		ui.refresh();
	});
	
	
	
	
	//ui.addGate(0);
	//console.log(ui.gateList[0]);
	
	//
	
	//setTimeout(function() { ui.refresh(); }, 10);
	
	//console.log(ui.gateList[0].input2);
	
	
	
	
});