$(document).ready(function(){
	//增加描述
  	var desNum = $('#description_length').text();
  	function addContentM(num){
  		var desDom = "<br /><div class='form-group'><label class='col-sm-2 control-label'>描述标题 " + num + "</label><div class='col-sm-10'><input name='desTitle" + num + "' type='text' style='width:600px;' class='form-control' placeholder='description title'></div></div>";
  		var desDom = desDom + "<div class='form-group'><label class='col-sm-2 control-label'>内容</label><div class='col-sm-10'><textarea class='form-control' rows='3' name='desCont" + num + "'></textarea></div></div>"
  		$('#tailAdd').before(desDom);
  	}
  	$('#addDesM').click(function(){
  		addContentM(++desNum);
  	});

  	$('#modifyBtn').click(function(){
  		$('#modifyForm').submit();
  	});
});