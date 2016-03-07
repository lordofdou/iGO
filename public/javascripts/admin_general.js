$(document).ready(function(){

	var h3 = $('.note h3')[0];
	var note = $('.note')[0];

	$('.icon').mouseover(function(){
		// alert(self.attr("title"))
		var title = $(this).attr("titleLabel");

		$(h3).text(title);
		$(note).show();

		$(h3).text(title).show();

	}).mouseout(function(){
		$(note).hide();
	});
});