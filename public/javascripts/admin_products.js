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
//查询具体分类的商品
function query(i,j) {
	window.location.href="/admin_products/query?id="+i+"&category="+j;

}