$(document).ready(function(){
	//分页
	$('.pagination li').click(function(){

		var num = $(this).text();
		var currentPage = $('#curP').text();
		if($(this).hasClass('forward')){
			num = parseInt(currentPage) + 1;
		}else if($(this).hasClass('back')){
			num = parseInt(currentPage) - 1;
		}

		var href = "/admin_orders/all?page=" + num;
		window.location.href = href;
	});

	
	$('tr[idnumber]').click(function(){

		$('#contactNameArea').text($(this).attr('contactName'));
		$('#contactTelArea').text($(this).attr('contactTel'));
		$('#contactRegionArea').text($(this).attr('contactRegion'));
		$('#contactAddressArea').text($(this).attr('contactAddress'));

		$('#contactModal').modal('show');
	});

});