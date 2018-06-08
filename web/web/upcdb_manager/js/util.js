var setTime = 60000;     //刷新时长-----------设置

//生成开始结束时间的时间戳（当日0:0:0  当日23:59:59）
//param ------ type (类型：start/end)
var getTimeToday = function(type){
	var date=new Date();
	var time;
	if(type == 'start'){
		var startDate=date.getFullYear()+"-"+Number(date.getMonth()+1)+"-"+date.getDate()+" "+"00:00:00";
		var dateTime = new Date(startDate);
		var time = dateTime.getTime();
	}else if(type == 'end'){
		var endDate=date.getFullYear()+"-"+Number(date.getMonth()+1)+"-"+date.getDate()+" "+"23:59:59";
		var dateTime = new Date(endDate);
		var time = dateTime.getTime();
	}
	return time;
}

/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
** xuanfeng 2014-08-28
*/
var randomWord = function(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

//ip校验
var isIp = function (){
    var regexp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
             
    return function(value){
        var valid = regexp.test(value);
 
        if(!valid){//首先必须是 xxx.xxx.xxx.xxx 类型的数字，如果不是，返回false
            return false;
        }
        return value.split('.').every(function(num){
            //切割开来，每个都做对比，可以为0，可以小于等于255，但是不可以0开头的俩位数
            //只要有一个不符合就返回false
            if(num.length > 1 && num.charAt(0) === '0'){
                //大于1位的，开头都不可以是‘0’
                return false;
            }else if(parseInt(num , 10) > 255){
                //大于255的不能通过
                return false;
            }
            return true;
        });
    }
}();
 

var checkManagerPriority = function(){
	if(getSession("priority") == "manager") {
		return true;
	} else {
		return false;
	}
}

var checkUserPriority = function(){
	if(getSession("priority") == "user") {
		return true;
	} else {
		return false;
	}
}

var initHomepage = function(){
	//TODO
//	var mli="<li>\n\t\t\t\t\t\t<a href=\"views/homepage/homepage.html\"><i class=\"fa fa-lg fa-fw fa-dashboard\"></i> <span class=\"menu-item-parent\">\u9996\u9875</span></a>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<a href=\"#\"><i class=\"fa fa-lg fa-fw fa-cloud\"></i> <span class=\"menu-item-parent\">\u8D44\u6E90\u7BA1\u7406</span></a>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/resource/backup_storage/list.html\"><i class=\"fa fa_icon_css fa-database fa-1\"></i>\u5907\u4EFD\u5B58\u50A8\u7BA1\u7406</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/resource/area/list.html\"><i class=\"fa fa_icon_css fa-object-ungroup fa-1\"></i>\u533A\u57DF\u7BA1\u7406</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/resource/networking/list.html\"><i class=\"fa fa_icon_css fa-sitemap fa-1\"></i>\u7F51\u6BB5\u7BA1\u7406</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/resource/port/list.html\"><i class=\"fa fa_icon_css fa-code-fork fa-1\"></i>\u7AEF\u53E3\u7BA1\u7406</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/resource/cluster/list.html\"><i class=\"fa fa_icon_css fa-clone fa-1\"></i>\u96C6\u7FA4\u7BA1\u7406</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/resource/software_image/list.html\"><i class=\"fa fa_icon_css fa-puzzle-piece fa-1\"></i>\u8F6F\u4EF6\u7BA1\u7406</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/resource/host/list.html\"><i class=\"fa fa_icon_css fa-server fa-1\"></i>\u4E3B\u673A\u7BA1\u7406</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/resource/san/list.html\"><i class=\"fa fa_icon_css fa-folder-open-o fa-1\"></i>\u5B58\u50A8\u7BA1\u7406</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<a href=\"#\"><i class=\"fa fa-lg fa-fw fa-list\"></i> <span class=\"menu-item-parent\">\u7533\u8BF7\u7BA1\u7406</span></a>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/workorder/redis/add.html\">REDIS\u5DE5\u5355\u7533\u8BF7</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/workorder/upsql/add.html\">UPSQL\u5DE5\u5355\u7533\u8BF7</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/workorder/upsql/list.html\"><i class=\"fa fa_icon_css fa-calendar-check-o fa-1\"></i>\u7533\u8BF7\u5355\u5BA1\u6279</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/workorder/sys/list.html\"><i class=\"fa fa_icon_css fa-align-justify fa-1\"></i>\u7CFB\u7EDF\u540D\u79F0\u7BA1\u7406</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/workorder/subsys/list.html\"><i class=\"fa fa_icon_css fa-align-left fa-1\"></i>\u5B50\u7CFB\u7EDF\u540D\u79F0\u7BA1\u7406</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<a href=\"#\"><i class=\"fa fa-lg fa-fw fa-cubes\"></i> <span class=\"menu-item-parent\">\u670D\u52A1\u7BA1\u7406</span></a>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/service/redis/list.html\">REDIS\u7BA1\u7406</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/service/upsql/list.html\">UPSQL\u7BA1\u7406</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<a href=\"#\"><i class=\"fa fa-lg fa-fw fa-line-chart\"></i> <span class=\"menu-item-parent\">\u76D1\u63A7\u7BA1\u7406</span></a>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/monitor/site/resource.html\"><i class=\"fa fa_icon_css fa-pie-chart fa-1\"></i>\u7AD9\u70B9\u8D44\u6E90\u76D1\u63A7</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/monitor/host/status.html\"><i class=\"fa fa_icon_css fa-area-chart fa-1\"></i>\u4E3B\u673A\u72B6\u6001\u76D1\u63A7</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/monitor/task/list.html\"><i class=\"fa fa_icon_css fa-tasks fa-1\"></i>\u4EFB\u52A1\u76D1\u63A7</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/monitor/instance/status.html\"><i class=\"fa fa_icon_css fa-bar-chart fa-1\"></i>\u5B9E\u4F8B\u72B6\u6001\u76D1\u63A7</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/monitor/host/resource.html\"><i class=\"fa fa_icon_css fa-desktop fa-1\"></i>\u4E3B\u673A\u8D44\u6E90\u76D1\u63A7</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/monitor/event/list.html\"><i class=\"fa fa_icon_css fa-envelope-o fa-1\"></i>\u4E8B\u4EF6\u76D1\u63A7</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/monitor/component/list.html\"><i class=\"fa fa_icon_css fa-object-group fa-1\"></i>\u7EC4\u4EF6\u76D1\u63A7</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<a href=\"#\"><i class=\"fa fa-lg fa-fw fa-cogs \"></i> <span class=\"menu-item-parent\">\u7CFB\u7EDF\u7EF4\u62A4</span></a>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/system/user/manager.html\"><i class=\"fa fa_icon_css fa-users fa-1\"></i>\u7528\u6237\u7BA1\u7406</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"views/system/event/manager.html\"><i class=\"fa fa_icon_css fa-warning fa-1\"></i>\u544A\u8B66\u7BA1\u7406</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</li>";
//	var uli = '\n\t\t<li>\n\t\t\t\t\t\t<a href="upm/user/views/homepage/homepage.html"><i class="fa fa-lg fa-fw fa-home"></i> <span class="menu-item-parent">\u9996\u9875</span></a>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<a href="#"><i class="fa fa-lg fa-fw fa-table"></i> <span class="menu-item-parent">\u5DE5\u5355\u7BA1\u7406</span></a>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href="upm/user/views/workorder/list.html">\u5DE5\u5355\u5217\u8868</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<a href="#"><i class="fa fa-lg fa-fw fa-inbox"></i> <span class="menu-item-parent">\u670D\u52A1\u7BA1\u7406</span></a>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href="upm/user/views/service/list.html">\u670D\u52A1\u5217\u8868</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</li>\n\t\t';
//	
//	$("ul#ul_index").html(mli);
	/*
	if(getSession("priority") === "manager"){
		$("ul#ul_index").html(mli);
	} else {
		$("ul#ul_index").html(uli);
	}
	*/
}

var clearSession = function(){
	if(typeof(Storage) !== "undefined") {
		sessionStorage = {};
	} else {
		document.cookie = "";
	}
}

var setSession = function(k, v){
	if(typeof(Storage) !== "undefined") {
		sessionStorage[k] = v;
	} else {
		if(document.cookie == "") {
			document.cookie = k + "=" + v;
		} else {
			var old_v = getSession(k);
			if(old_v){
				document.cookie.replace(k + "=" + old_v, k + "=" + v)
			} else {
				document.cookie = document.cookie + " ;" + k + "=" + v;
			}
			
		}
	}
}

var getSession = function(k){
	if(typeof(Storage) !== "undefined") {
		return sessionStorage[k];
	} else {
		var cookieArr = document.cookie.split(";")
		for(cookie in cookieArr){
			if(k == cookie.split("=")[0]){
				return cookie.split("=")[1]
			}
		}
		return undefined;
	}
}

var DialogAlert = function(msg) {
	DialogAlertClear();
	var da = "\n<div class=\"alert alert-danger fade in\">\n\t<button class=\"close\" data-dismiss=\"alert\">\n\t\tx\n\t</button>\n\t<i class=\"fa-fw fa fa-times\"></i>\n\t<strong>Error!</strong> \n";
	da = da + msg + "</div>";
	$("#dialog-alert").append(da);
}

var DialogAlertClear = function(){
	$("#dialog-alert").empty();
}

var ListAlert = function(msg) {
	ListAlertClear();
	var la = "\n<div class=\"alert alert-danger fade in\">\n\t<button class=\"close\" data-dismiss=\"alert\">\n\t\tx\n\t</button>\n\t<i class=\"fa-fw fa fa-times\"></i>\n\t<strong>Error!</strong> \n";
	la = la + msg + "</div>";
	$("#list-alert").append(la);
}

var ListConfirm = function(type, id) {
	/*
	 <div class="alert alert-info alert-block">
				<a class="close" data-dismiss="alert" href="#">×</a>
				<h4 class="alert-heading">Info!</h4>
				确认是否执行操作
				<p class="text-align-left">
					<br>
					<a href="javascript:void(0);" onclick="confirm('"+type+"','"+id+"')" class="btn btn-sm btn-default"><strong>确认</strong></a>
				</p>
			</div>
	 */
	var la = "\n\t\t\t<div class=\"alert alert-info alert-block\">\n\t\t\t\t<a class=\"close\" data-dismiss=\"alert\" href=\"#\">\xD7</a>\n\t\t\t\t<h4 class=\"alert-heading\">Info!</h4>\n\t\t\t\t\u786E\u8BA4\u662F\u5426\u6267\u884C\u64CD\u4F5C\n\t\t\t\t<p class=\"text-align-left\">\n\t\t\t\t\t<br>\n\t\t\t\t\t<a href=\"javascript:void(0);\" onclick=\"confirm('";
	la += type;
	la += "','";
	la += id;
	la += "')\" class=\"btn btn-sm btn-default\"><strong>\u786E\u8BA4</strong></a>\n\t\t\t\t</p>\n\t\t\t</div>\n";
	$("#list-alert").append(la);
}

var ListAlertClear = function(){
	$("#list-alert").empty();
}

var BytesToSize = function(bytes){
	if(bytes === 0){
		return "0 B"
	}
	var k = 1024,
		sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'],
		i = Math.floor(Math.log(bytes) / Math.log(k));
	return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

var BytesToGB = function(bytes){
	var GB = 1024*1024*1024;
	return Math.round(bytes / GB);
}

var LimitCheck = function(current, total){
	if(current == 0 || current == null|| total == 0 || total == null){
		return true;
	}
	var limit = 80;
	if(getSession('hostResourceLimit') != undefined){
		limit = getSession('hostResourceLimit');
	}
	if(current / total * 100 < limit){
		return true;
	}
	return false;
}

var LimitCheckPercent = function(current, total){
	var percent = 0;
	if(current == 0 || current == null|| total == 0 || total == null){
		return percent;
	}else{
		percent = current / total * 100;
		return percent;
	}
}

var DateToStrYYYYMMDD = function(date){
	return date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate();
}

var DateToDayParam = function(date){
	return "?start_time="+(Math.round(date/1000)-(60*60*24))+"&end_time="+Math.round(date/1000);
}

var DateToMonthParam = function(dateStart,dateEnd){
	return "?start_time="+(Math.round(dateStart/1000)-(60*60*24*31))+"&end_time="+Math.round((dateEnd+86399000)/1000);
}

var monitorChangeAdminPhoto = function(data){
	var statusData = data.data.value;
	if(statusData != "on"){
		$("#admin_photo").removeClass("admin_photo");
		$("#admin_photo").addClass("admin_photo_red");
		$("#btnOn").show();
		$("#btnOff").hide();
	}else{
		$("#admin_photo").removeClass("admin_photo_red");
		$("#admin_photo").addClass("admin_photo");
		$("#btnOff").show();
		$("#btnOn").hide();
	}
}