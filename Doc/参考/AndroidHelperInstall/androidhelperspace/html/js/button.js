$(function() { 
    $(window).scroll(function() { 
	var top = $(window).scrollTop()+200; 
	var right= $(window).scrollRight()+500; 
	$("#beifeng").css({ right:right + "px", top: top + "px" }); 
    }); 
});
