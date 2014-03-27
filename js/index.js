$(function(){
	
	// The gate menu needs to be sticky after the intro
	var initialSize = parseInt($('#gate-menu').css('height'));
	var stick = getStickInformations();
	function getStickInformations() {
		var object = {};
		object.position = $('#getting-started').position().top;
		object.initialSize = initialSize;
		object.reducePosition = object.position+object.initialSize-170-110;
		object.slidePosition = object.position+object.initialSize-170;
		object.endPosition = object.position+object.initialSize-70;
		
		return object;
	}
	
	function applyStick(stick) {
		var actualPosition = $(document).scrollTop();
		
		if(actualPosition>=stick.position) {
			if(actualPosition<=stick.endPosition) {
				// Set the sticky class
				if(!$('#getting-started').hasClass('sticked')) {
					$('#getting-started').addClass('sticked');
				}
			
				// Adjust position
				var maxHeight = stick.initialSize-(actualPosition-stick.position);
				if(maxHeight<170) {
					maxHeight = 170;
				}
			
				var top = stick.slidePosition-actualPosition;
				if(top>0) {
					top = 0;
				}
				else if(top<-110) {
					top = -110;
				}
				$('.sticked #gate-menu').css({'max-height':maxHeight+'px', 'top':top+'px'});
			}
			else {
				$('#getting-started').addClass('sticked');
				$('.sticked #gate-menu').css({'max-height':'170px', 'top':'-110px'});
			}
		}
		else if($('#getting-started').hasClass('sticked')) {
			// Restore position
			$('#getting-started').removeClass('sticked');
			$('.sticked #gate-menu').css({'max-height':stick.initialSize+'px', 'top':0});
		}
	}
	
	$(window).resize(function() {
		stick = getStickInformations();
		applyStick(stick);
	});
	
	$(document).scroll(function() {
		applyStick(stick);
	});
	
	// Add a smooth scrolling from the menus
	$('.smooth').click(function(){
	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top
	    }, 500);
	    return false;
	});
	
	
	
	var notUI = new PresentationUI('not-gate-canvas', 0);
	var andUI = new PresentationUI('and-gate-canvas', 1);
	var nandUI = new PresentationUI('nand-gate-canvas', 2);
	var orUI = new PresentationUI('or-gate-canvas', 3);
	var norUI = new PresentationUI('nor-gate-canvas', 4);
	var xorUI = new PresentationUI('xor-gate-canvas', 5);
	var xnorUI = new PresentationUI('xnor-gate-canvas', 6);
	
});