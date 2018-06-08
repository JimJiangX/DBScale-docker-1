// document.write("<link rel=\"stylesheet\" href=\"layer/css/layui.css\">");
//document.write("<script language=\"javascript\" src=\"layer\/layui.js\" > <\/script>");

function getProjectName() {
	return "upcdb_manager";
}

function login_time_out(data){
	if(data.status == 401){
		window.location.href = "/" + getProjectName() + "/forbidden.html";
	}else{
		return;
	}
}

$(document).ready(function() {
	layui.use([ 'layer', 'form' ], function() {
		var layer = layui.layer, form = layui.form();
	});
});

function getAjaxFeatures(features) {
	var ajaxFeatures = new Object();
	var async = true;
	var timeout = 60000;
	if (features != null) {
		if (features.async != null) {
			async = features.async;
		}
		if (features.timeout != null) {
			timeout = parseInt(features.timeout);
		}
	}
	ajaxFeatures.async = async;
	ajaxFeatures.timeout = timeout;
	return ajaxFeatures;
}

var MSG = {
	INFO : "info",
	ERROR : "error"
}

function message() {
	var content;
	var type;
	var callBack;
	switch (arguments.length) {
	case 1 :
		content = arguments[0];
		break;
	case 2 :
		content = arguments[0];
		if(typeof arguments[1] == "function") {
			callBack = arguments[1];
        } else { 
        	type = arguments[1];
        }
		break;
	case 3 :
		content = arguments[0];
		type = arguments[1];
		callBack = arguments[2];
	}
	switch (type) {
	case MSG.ERROR:
		layer.alert(content, {
			icon : 2,
			title : "提示信息"
		}, function(index) {
			layer.close(index);
			if(typeof callBack == "function") {
				callBack();
	        }
		})
		break;
	default:
		var index = layer.message(
				"<span style='letter-spacing:1px;font-size:17px'>" + content
						+ "</span>", {
					time : 1000,
					shade : 0,
					offset : '100px'
				}, function(index) {
					layer.close(index);
					if(typeof callBack == "function") {
						callBack();
			        }
				})
		layer.style(index, {
			backgroundColor : 'rgba(95,184,120,.8)'
		})
		break;
	}
}

function procError(XMLHttpRequest, textStatus, errorThrown) {
	var respText = XMLHttpRequest.responseText;
	if (respText != null) {
		if (respText.charAt(0) == "{") {
			try {
				var respJson = JSON.parse(respText);
				message(respJson.msg, MSG.ERROR);
			} catch (e) {

			}
		} else {
			message(textStatus, MSG.ERROR);
		}
	} else {
		message(textStatus, MSG.ERROR)
	}
}

function sendGet(url, successCallBack,falseCallBack, features) {
	var ajaxFeatures = getAjaxFeatures(features);
	var loadIndex = 0;
	$.ajax({
		url : url,
		async : ajaxFeatures.async,
		method : "get",
		dataType : "json",
		timeout : ajaxFeatures.timeout,
		beforeSend : function() {
			loadIndex = layer.load();
		},
		success : function(data) {
			layer.close(loadIndex);
			successCallBack(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			login_time_out(XMLHttpRequest);
			layer.close(loadIndex);
			falseCallBack(JSON.parse(XMLHttpRequest.responseText).msg);
		}
	});
}

function sendGetWithoutLayer(url, successCallBack,falseCallBack, features) {
	var ajaxFeatures = getAjaxFeatures(features);
	$.ajax({
		url : url,
		async : ajaxFeatures.async,
		method : "get",
		dataType : "json",
		timeout : ajaxFeatures.timeout,
		beforeSend : function() {
			
		},
		success : function(data) {
			successCallBack(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			login_time_out(XMLHttpRequest);
			falseCallBack(JSON.parse(XMLHttpRequest.responseText).msg);
		}
	});
}

function sendPost(url, successCallBack,falseCallBack, jsonData, features) {
	var ajaxFeatures = getAjaxFeatures(features);
	var loadIndex = 0;
	$.ajax({
		url : url,
		async : ajaxFeatures.async,
		method : "post",
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		data : jsonData,
		timeout : ajaxFeatures.timeout,
		beforeSend : function() {
			loadIndex = layer.load();
		},
		success : function(data) {
			layer.close(loadIndex);
			successCallBack(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			login_time_out(XMLHttpRequest);
			layer.close(loadIndex);
			falseCallBack(XMLHttpRequest, textStatus, errorThrown);
		}
	});
}

function sendPut(url,successCallBack,falseCallBack,jsonData, features) {
	var ajaxFeatures = getAjaxFeatures(features);
	var loadIndex = 0;
	$.ajax({
		url : url,
		async : ajaxFeatures.async,
		method : "put",
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		data : jsonData,
		timeout : ajaxFeatures.timeout,
		beforeSend : function() {
			loadIndex = layer.load();
		},
		success : function(data) {
			layer.close(loadIndex);
			successCallBack(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			login_time_out(XMLHttpRequest);
			layer.close(loadIndex);
			falseCallBack(JSON.parse(XMLHttpRequest.responseText).msg);
		}
	});
}

function sendPutAll(url,successCallBack,falseCallBack,jsonData, features,rowIndex,rowNum) {
	var ajaxFeatures = getAjaxFeatures(features);
	var loadIndex = 0;
	$.ajax({
		url : url,
		async : ajaxFeatures.async,
		method : "put",
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		data : jsonData,
		timeout : ajaxFeatures.timeout,
		beforeSend : function() {
			loadIndex = layer.load();
		},
		success : function(data) {
			layer.close(loadIndex);
			successCallBack(data,rowIndex,rowNum);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			login_time_out(XMLHttpRequest);
			layer.close(loadIndex);
			falseCallBack(JSON.parse(XMLHttpRequest.responseText).msg);
		}
	});
}

function sendDelete(url, successCallBack,falseCallBack, jsonData, features) {
	var ajaxFeatures = getAjaxFeatures(features);
	var loadIndex = 0;
	$.ajax({
		url : url,
		async : ajaxFeatures.async,
		method : "delete",
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		data : jsonData,
		timeout : ajaxFeatures.timeout,
		beforeSend : function() {
			loadIndex = layer.load();
		},
		success : function(data) {
			layer.close(loadIndex);
			successCallBack(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			login_time_out(XMLHttpRequest);
			layer.close(loadIndex);
			falseCallBack(JSON.parse(XMLHttpRequest.responseText).msg);
		}
	});
}

//批量删除
function sendDeleteAll(url, successCallBack,falseCallBack, jsonData, features,rowIndex,rowNum) {
	var ajaxFeatures = getAjaxFeatures(features);
	var loadIndex = 0;
	$.ajax({
		url : url,
		async : ajaxFeatures.async,
		method : "delete",
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		data : jsonData,
		timeout : ajaxFeatures.timeout,
		beforeSend : function() {
			loadIndex = layer.load();
		},
		success : function(data) {
			layer.close(loadIndex);
			successCallBack(data,rowIndex,rowNum);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			login_time_out(XMLHttpRequest);
			layer.close(loadIndex);
			falseCallBack(JSON.parse(XMLHttpRequest.responseText).msg);
		}
	});
}