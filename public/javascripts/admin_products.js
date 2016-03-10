// $(document).ready(function(){
// 	$('#c').click(function(){
// 		if($('#dropdown').css("display") == "none"){
// 			$('#dropdown').slideDown('quick');
// 		}else{
// 			$('#dropdown').slideUp('quick');
// 		}
		
// 	});
// })

function drop(i) {
	
	if($('#'+i).css("display") == "none"){
		
		$('#'+i).css("display","block");
	}else{

		$('#'+i).css("display","none");
	}
}