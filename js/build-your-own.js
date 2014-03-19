$(function(){
	
	var ui = new UserInterface();
	ui.addGate(0);
	ui.gateList[0].setPosition(42, 1337);
	console.log(ui.gateList[0].getPosition());
	
});