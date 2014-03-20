$(function(){
	
	var ui = new UserInterface();
	
	$('#button').on('click', function() {
		ui.addGate(Math.round(Math.random()*1000)%7);
	});
	
	$('#button2').on('click', function() {
		ui.removeGate(ui.gateList[Math.round(Math.random()*10000)%ui.gateList.length]);
	});
	
	
	
	
	//ui.addGate(0);
	//console.log(ui.gateList[0]);
	
	//
	
	//setTimeout(function() { ui.refresh(); }, 10);
	
	//console.log(ui.gateList[0].input2);
	
	
	
	
});