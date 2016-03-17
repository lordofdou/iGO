$(document).ready(function(){

  	//增加描述
  	var desNum = 1;
  	function addContent(num){
  		var desDom = "<br /><div class='form-group'><label class='col-sm-2 control-label'>描述标题 " + num + "</label><div class='col-sm-10'><input name='desTitle" + num + "' type='text' style='width:600px;' class='form-control' placeholder='description title'></div></div>";
  		var desDom = desDom + "<div class='form-group'><label class='col-sm-2 control-label'>内容</label><div class='col-sm-10'><textarea class='form-control' rows='3' name='desCont" + num + "'></textarea></div></div>"
  		$('#tailAdd').before(desDom);
  	}
  	$('#addDes').click(function(){
  		addContent(desNum++);
  	});


  	//清空表单
  	$('#clearBtn').click(function(){
  		$('#addForm')[0].reset();
  	});

  	//提交内容
  	$('#saveBtn').click(function(){

  		//验证表单
  		var pid = parseInt($('input[name="pid"]').val());
  		var title = $('input[name="title"]').val();
  		var desTitle1 = $('input[name="desTitle1"]').val();
  		var desCont = $('textarea[name="desCont1"]').val();

  		if(!pid){
  			$('.alert-danger').text("商品ID错误").show();
  			$('input[name="pid"]').focus();
  			return false;
  		}

  		if(title.length < 3){
  			$('.alert-danger').text("标题错误").show();
  			$('input[name="title"]').focus();
  			return false;
  		}
  		
  		if(desTitle1.length == 0){
  			$('.alert-danger').text("描述标题错误").show();
  			return false;
  		}

  		if(desCont.length < 10){
  			$('.alert-danger').text("描述内容错误").show();
  			return false;
  		}

  		$('#addForm').submit();
  		
  	});

  	//添加图片背景图片
  	$('input[type="file"]').change(function(){
  		var src = getObjectURL(this.files[0]);
  		$(this).parent().css('background', 'url(' + src + ') no-repeat center center').css('background-size', '100%');
  	});

  	function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file)
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file)
        }
        return url
    };



});