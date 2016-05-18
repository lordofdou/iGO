
function statusreload(v)
{
	var loader = document.getElementById("load");
	loader.style.display = "";
	mid_ifram_style.style.visibility = "hidden";  
}

function reload(v)
{
	
	if(document.getElementById("status_ifram_style").contentWindow.location.href=="http://127.0.0.1/html/status_window.html"){
		alert("请链接手机!");
		document.getElementById("mid_ifram_style").href="./noconnect.html"
		return ;
	}
	
	var loader = document.getElementById("load");
	loader.style.display = "";
	mid_ifram_style.style.visibility = "hidden";  
}

function stateChangeIE(iframe){
	
	if(iframe.readyState==4){
		var loader = document.getElementById("load");
		loader.style.display = "none";  
		iframe.style.visibility = "visible";   
	}
}

function stateChangeFirefox(iframe){
		var loader = document.getElementById("load");
		loader.style.display = "none";
		iframe.style.visibility = "visible";   
}


