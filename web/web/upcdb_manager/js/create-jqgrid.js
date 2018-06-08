var jqGrid_template = {
		datatype : "local",
		height : 'auto',
		sortname : 'servName',
		sortorder : "asc",
		multiselect:true,
		autowidth : true,
		pager : '#pjqgrid',
		hidegrid: false,
		rowNum: 20,
        rowList: [10, 20, 30],
        emptyrecords: "Nothing to display",
        viewrecords: true
}

function jqGrid_LoadComplete(){
	$("#jqgrid").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
}

function jqGrid_OnSelectRow(id){
    var s;
    s = $("#jqgrid").jqGrid('getGridParam', 'selarrrow');
    if(s.length>1){
        for(var i=0;i<=s.length;i++){
            if(s[i]!=id){
                $("#jqgrid").jqGrid('setSelection', s[i]);
            }
        }
    }
}

function jqGrid_OnSelectAll(rowids, statue) {
    $("#jqgrid").jqGrid('resetSelection');
}

function jqGrid_ResetClass(){
	$("#jqgrid").navGrid('#pjqgrid',
			{add:false, edit:false, view:false, del:false, refresh:false, search:true}, 
			{}, // use default settings for edit
			{}, // use default settings for add
			{},  // delete instead that del:false we need this
			{multipleSearch : true}, // enable the advanced searching
			{closeOnEscape:true} /* allow the view dialog to be closed when user press ESC key*/
		);
	
	// remove classes
    $(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
    $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
    $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
    $(".ui-jqgrid-pager").removeClass("ui-state-default");
    $(".ui-jqgrid").removeClass("ui-widget-content");

    // add classes
    $(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
    $(".ui-jqgrid-btable").addClass("table table-bordered table-striped");


    $(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
    $(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
    $(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
    $(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
    $(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
    $(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
    $(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
    $(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");

    $( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");

    $( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");

    $( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");

    $( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
    

    $(window).on('resize.jqGrid', function () {
        $("#jqgrid").jqGrid( 'setGridWidth', $("#content").width() );
    })
}

function monitorStatus(status){
	switch(status){
	case 'passing':
		return '<span class=\"label label-success\">'+status+'</spam>';
	case 'critcal':
		return '<span class=\"label label-danger\">'+status+'</spam>';
	default:
		return status;
	}
}

//新建备份存储列表 
function createGrid_bs(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '名称', '类型', 'IP地址', '源目录', '挂载目录', '挂载参数', '空闲容量','总容量','启用/停用','id','createDateTime','createLoginUserName'];
	option.colModel = [
        { name : 'name', index : 'name', editable : false,width:'180px' },
        { name : 'type', index : 'type', editable : true },
        { name : 'ip', index : 'ip',editable : false },
        { name : 'dir', index : 'dir',editable : false },
        { name : 'mountDir', index : 'mountDir', editable : false },
        { name : 'mountOpts', index : 'mountOpts',  editable : false },
        { name : 'freeSpace', index : 'freeSpace', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
      		  return (cellvalue/1024/1024/1024).toFixed(1)+"G";
            }
        },
        { name : 'totalSpace', index : 'totalSpace' /*sortable : false, editable : true */,
        	formatter: function (cellvalue, options, rowObject) {
      		  return (cellvalue/1024/1024/1024).toFixed(1)+"G";
            }
        },
        { name : 'enabled', index : 'enabled' ,
            formatter: function (cellvalue, options, rowObject) {
                if (cellvalue == false) return "<span class=\"txt-color-red pull-left\"><i class=\"fa fa-lg fa-times\"></i></span>";
                if (cellvalue == true) return "<span class=\"txt-color-green pull-left\"><i class=\"fa fa-lg fa-check\"></i></span>";},
            sortable : false/*,align:"left"*/},
        {name:"id",index:"id",hidden:true},
        {name:"createDateTime ",index:"createDateTime ",hidden:true},
        {name:"createLoginUserName",index:"createLoginUserName",hidden:true}            
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//区域列表
function createGrid_area(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '区域名称', '区域描述', '备份存储', '启用/停用','enabledStatus','id','backupStorageId','createDateTime','createLoginUserName'];
	option.colModel = [
        { name : 'name', index : 'name', editable : false},
        { name : 'description', index : 'description', editable : false },
        { name : 'backupStorageName', index : 'backupStorageName', editable : false },
        { name : 'enabled', index : 'enabled' ,
            formatter: function (cellvalue, options, rowObject) {
                if (cellvalue == false) return "<span class=\"txt-color-red pull-left\"><i class=\"fa fa-lg fa-times\"></i></span>";
                if (cellvalue == true) return "<span class=\"txt-color-green pull-left\"><i class=\"fa fa-lg fa-check\"></i></span>";},
            sortable : false},
        { name : 'enabledStatus', index : 'enabledStatus' ,
                formatter: function (cellvalue, options, rowObject) {
                    if (rowObject.enabled == false) return "yes";
                    if (rowObject.enabled == true) return "no";},
                    hidden:true},
        {name:"id",index:"id",hidden:true},
        {name:"backupStorageId ",index:"backupStorageId ",hidden:true},
        {name:"createDateTime ",index:"createDateTime ",hidden:true},
        {name:"createLoginUserName",index:"createLoginUserName",hidden:true} 
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//集群列表
function createGrid_cluster(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '所属区域', '网络标签', '集群名称', '最大使用率(%)','最大主机数量','包含软件', '包含网段', '混合类型', '状态','enabledStatus','id'];
	option.colModel = [
        { name : 'areaName', index : 'areaName', editable : false },
        { name : 'haNetworkTag', index : 'haNetworkTag', editable : false },
        { name : 'name', index : 'name', editable : false },
        { name : 'maxUsage', index : 'maxUsage', editable : false },
        { name : 'maxHostCount', index : 'maxHostCount', editable : false },
        { name : 'definitionSubServNames', index : 'definitionSubServNames', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		if(cellvalue.length == 0){
        			return "";
        		} else {
        			var ret = "";
        			$.each(cellvalue, function(k, v){
        				ret = ret + v.name + "<br/>";
        			});
        			return ret;
        		}
        	}
        },
        { name : 'networkings', index : 'networkings', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		if(cellvalue.length == 0){
        			return "";
        		} else {
        			var ret = "";
        			$.each(cellvalue, function(k, v){
        				ret = ret + v.name + "<br/>";
        			});
        			return ret;
        		}
        	}
        },
        { name : 'mixed', index : 'mixed' ,
            formatter: function (cellvalue, options, rowObject) {
                if (cellvalue == false) return "非混合";
                if (cellvalue == true) return "混合";},
            sortable : false},
        { name : 'enabled', index : 'enabled' ,
            formatter: function (cellvalue, options, rowObject) {
                if (cellvalue == false) return "<span class=\"txt-color-red pull-left\" style=\"font-weight:bold;\">停用</span>";
                if (cellvalue == true) return "<span class=\"txt-color-green pull-left\" style=\"font-weight:bold;\">启用</span>";},
            sortable : false},
        { name : 'enabledStatus', index : 'enabledStatus' ,
                formatter: function (cellvalue, options, rowObject) {
                    if (rowObject.enabled == false) return "yes";
                    if (rowObject.enabled == true) return "no";},
                    hidden:true},
        {name:"id",index:"id",hidden:true}
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//网段列表
function createGrid_net(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = ['网段名称', '起始IP','结束IP','掩码','网关','IP使用率','所用区域','所用集群','标记vlanID','启用/停用','enabledStatus','id'];
	option.colModel = [
        { name : 'name', index : 'name', editable : false, },
        { name : 'startIp', index : 'startIp', editable : false },
        { name : 'endIp', index : 'endIp', editable : false },
        { name : 'prefix', index : 'prefix', editable : false },
        { name : 'gateway', index : 'gateway', editable : false },
        { name : 'ipUsed', index : 'ipUsed', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		return (rowObject.ipUsedCount*100/rowObject.ipCount).toFixed(2)+"% ("+rowObject.ipUsedCount+"/"+rowObject.ipCount+")";
            }	
        },
        { name : 'areaName', index : 'areaName',  editable : false },
        { name : 'clusterName', index : 'clusterName',  editable : false },
        { name : 'vlanId', index : 'vlanId',  editable : false },
        { name : 'enabled', index : 'enabled' ,
            formatter: function (cellvalue, options, rowObject) {
                if (cellvalue == false) return "<span class=\"txt-color-red pull-left\"><i class=\"fa fa-lg fa-times\"></i></span>";
                if (cellvalue == true) return "<span class=\"txt-color-green pull-left\"><i class=\"fa fa-lg fa-check\"></i></span>";},
           sortable : false},
        { name : 'enabledStatus', index : 'enabledStatus' ,
               formatter: function (cellvalue, options, rowObject) {
                   if (rowObject.enabled == false) return "yes";
                   if (rowObject.enabled == true) return "no";},
                   hidden:true},
        {name:"id",index:"id",hidden:true}
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();    
}

//软件镜像列表
function createGrid_si_1(data) {
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '软件名称', '版本', '启用/停用', '任务详情','id' ];
	option.colModel = [
		{
			name : 'name',
			index : 'name',
			editable : false
		},
		{
			name : 'majorVersion',
			index : 'majorVersion',
			editable : false,
			formatter : function(cellvalue,
					options, rowObject) {
				return rowObject.majorVersion 
						+ "." 
						+ rowObject.minorVersion 
						+ "."
						+ rowObject.patchVersion 
						+ "." 
						+ rowObject.buildVersion;
			},
			
			sortable : false
		},
		{
			name : 'enabled',
			index : 'enabled',
			formatter : function(cellvalue,
					options, rowObject) {
				if (cellvalue == false)
					return "<span class=\"txt-color-red pull-left\">"
							+ "<i class=\"fa fa-lg fa-times\"></i></span>";
				if (cellvalue == true)
					return "<span class=\"txt-color-green pull-left\">"
							+ "<i class=\"fa fa-lg fa-check\"></i></span>";
			},
			
			sortable : false
		},
		{
			name : 'info',
			index : "1",
			formatter : function(cellvalue,
					options, rowObject) {
				return "<a href=\"\" data-task-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#taskModal\"><span class=\" pull-left\">"+rowObject.taskStatusText+"<i class=\"fa fa-lg fa-book\"></i></span></a>";
			},
			editable : false
		},
		{name:"id",index:"id",hidden:true}
		];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

function createGrid_si_2(data) {
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '软件名称', '图标', '主版本', '次版本','id'];
	option.colModel = [ {
		name : 'id',
		index : 'id',
		editable : false
	}, {
		name : 'icon',
		index : 'icon',
		formatter : function(cellvalue, options, rowObject) {
			if (cellvalue == '1')
				return "<i class=\"fa fa-qq\"></i>";
			if (cellvalue == '2')
				return "<i class=\"fa fa-wechat\"></i>";
			if (cellvalue == '3')
				return "<i class=\"fa fa-paw\"></i>";
		},
		sortable : false,width : '60px',
	}, {
		name : 'majorVersion',
		index : 'majorVersion',
		align : "center",
		editable : false
	}, {
		name : 'minorVersion',
		index : 'minorVersion',
		align : "center",
		editable : false
	},
	{name:"id",index:"id",hidden:true}
	];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}


//主机列表
function createGrid_host_1(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '主机名称', '主机IP', '所属区域','所属集群','所连存储','机房','机位','容器上限','status','主机状态','备注','任务详情','id','description'];
	option.colModel = [
        { name : 'name', index : 'name', editable : false },
        { name : 'sshIp', index : 'sshIp', editable : false,width:'180px' },
        { name : 'areaName', index : 'areaName', editable : false },
        { name : 'clusterName', index : 'clusterName', editable : false },
        { name : 'sanName', index : 'sanName', editable : false, 
        	formatter: function (cellvalue, options, rowObject) {
        			if(cellvalue != null){
        				return cellvalue;
        			}else{
        				return "无";
        			}
        	}
        },
        { name : 'room', index : 'room', editable : false },
        { name : 'seat', index : 'seat', editable : false },
        { name : 'maxContainer', index : 'maxContainer', editable : false},
        { name : 'status', index : 'status', hidden:true},
        { name : 'statusText', index : 'statusText', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		if(rowObject.status == "enable"){
        			return "<span style='color:green;font-weight: bold;'>"+cellvalue+"</span>";
        		}else if(rowObject.status == "disable"){
        			return "<span style='color:red;font-weight: bold;'>"+cellvalue+"</span>";
        		}else{
        			return "<span style='color:blue;font-weight: bold;'>"+cellvalue+"</span>";
        		}
            }
        },
        { name : 'description', index : 'description', editable : false},
        { name : 'detail', index : 'detail', align : "center", editable : false,
            formatter: function (cellvalue, options, rowObject) {
                return "<a href=\"\" data-task-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#taskModal\"><span class=\" pull-left\">"+rowObject.taskStatusText+"<i class=\"fa fa-lg fa-book\"></i></span></a>";
            },
             editable: false, align: "center"},
        {
           name : 'id', index : 'id',hidden:true
        },
        {
        	description : 'id', description : 'id',hidden:true
        }
    ];
	/*option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;*/
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

function createHomeUpsqlGrid(data){
	var statusStr;
	var num;
    $.each(data.data,function(index,obj){
    		if (obj['availableStatus'] == 'passing'){ statusStr = "<span class=\"txt-color-green pull-left\" style=\"font-size: 17px;width: 96px;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";}else
            if (obj['availableStatus'] == 'warning'){ statusStr = "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 17px;width: 96px;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";}else
            if (obj['availableStatus'] == 'critical'){ statusStr = "<span class=\"txt-color-red pull-left\" style=\"font-size: 17px;width: 96px;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";}else
            if (obj['availableStatus'] == 'unknown'){ statusStr = "<span class=\"txt-color-blue pull-left\" style=\"font-size: 17px;width: 96px;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";}else
            	{statusStr = "";}
    		num = index+1;
    	if(num%2 == 0){
    		$("#upsqlTable").append(
                    "<tr style='background:#e0ffff'><td>"
        			+num+"</td> <td>"
            		+obj['siteName']+"</td> <td>"
            		+obj['businessSystemName']+"</td> <td>"
            		+obj['businessSubSystemName']+"</td> <td>"
            		+obj['servName']+"</td> <td>"
            		+statusStr+"</td></tr>"
            );
    	}else{
    		$("#upsqlTable").append(
                    "<tr><td>"
        			+num+"</td> <td>"
            		+obj['siteName']+"</td> <td>"
            		+obj['businessSystemName']+"</td> <td>"
            		+obj['businessSubSystemName']+"</td> <td>"
            		+obj['servName']+"</td> <td>"
            		+statusStr+"</td></tr>"
            );
    	}
    });
}
function createHomeUpreidsGrid(data){
	var statusStr;
	var num;
    $.each(data.data,function(index,obj){
    		if (obj['status'] == 'passing'){ statusStr = "<span class=\"txt-color-green pull-left\" style=\"font-size: 17px;width: 96px;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";}else
            if (obj['status'] == 'warning'){ statusStr = "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 17px;width: 96px;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";}else
            if (obj['status'] == 'critical'){ statusStr = "<span class=\"txt-color-red pull-left\" style=\"font-size: 17px;width: 96px;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";}else
            if (obj['status'] == 'unknown'){ statusStr = "<span class=\"txt-color-blue pull-left\" style=\"font-size: 17px;width: 96px;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";}else
            	{statusStr = "";}
    		num = index+1;
    	if(num%2 == 0){
    		$("#upredisTable").append(
                    "<tr style='background:rgb(98, 162, 228)'><td>"
        			+num+"</td> <td>"
            		+obj['siteName']+"</td> <td>"
            		+obj['businessSystemName']+"</td> <td>"
            		+obj['businessSubSystemName']+"</td> <td>"
            		+obj['servName']+"</td> <td>"
            		+statusStr+"</td></tr>"
            );
    	}else{
    		$("#upredisTable").append(
                    "<tr><td>"
        			+num+"</td> <td>"
            		+obj['siteName']+"</td> <td>"
            		+obj['businessSystemName']+"</td> <td>"
            		+obj['businessSubSystemName']+"</td> <td>"
            		+obj['servName']+"</td> <td>"
            		+statusStr+"</td></tr>"
            );
    	}
    });
}

function createGrid_taskDetail(data){
    $.each(data.data,function(index,obj){
    	$("#mainframestate").append(
                "<tr><td>"
        		+obj['owner']+"</td> <td>"
        		+obj['startDateTime']+"</td> <td>"
        		+obj['endDateTime']+"</td> <td>"
        		+obj['objType']+"</td> <td>"
        		+obj['objName']+"</td> <td>"
        		+obj['actionType']+"</td> <td>"
        		+obj['statusText']+"</td> <td>"
        		+obj['msg']+"</td></tr>"
        );
    });
}

function createGrid_softwareServiceDetail(data){
	var dataArray=new Array();
	for(var i=0;i<data['data'].length;i++){
		for(var k=0;k<data['data'][i]['subServs'].length;k++){
			for(var s=0;s<data['data'][i]['subServs'][k]['units'].length;s++){
				data['data'][i]['subServs'][k]['units'][s]['ownerName'] = data['data'][i]['ownerName'];
				data['data'][i]['subServs'][k]['units'][s]['businessSystemName'] = data['data'][i]['businessSystemName'];
				data['data'][i]['subServs'][k]['units'][s]['businessSubSystemName'] = data['data'][i]['businessSubSystemName'];
				data['data'][i]['subServs'][k]['units'][s]['servName'] = data['data'][i]['servName'];
				dataArray.push(data['data'][i]['subServs'][k]['units'][s]);
			}
		}
	}
    $.each(dataArray,function(index,obj){
    	$("#servSoftwareTable").append(
                "<tr><td>"
        		+obj['ownerName']+"</td> <td>"
        		+obj['hostName']+"</td> <td>"
        		+obj['businessSystemName']+"</td> <td>"
        		+obj['businessSubSystemName']+"</td> <td>"
        		+obj['servName']+"</td> <td>"
        		+obj['relateName']+"</td> </tr>"
        );
    });
}

//主机任务详情列表
function createGrid_taskDetailModal(data){
        var option = {};
		var jqGrid_user_template = {
				datatype : "local",
				height : 'auto',
				sortname : 'name',
				sortorder : "asc",
				multiselect:false,
				shrinkToFit : false,
				pager : '#pjqgridTask',
				hidegrid: false,
				rowNum: 15,
		        rowList: [10, 20, 30],
		        viewrecords: true
		}
		$.extend(true, option, jqGrid_user_template);
		option.caption = "";
		option.data = data['data'];
		option.colNames = [ '所属者', '开始时间', '结束时间', '对象类型', '任务名称', '任务类型','状态','回执信息','id'];
		option.colModel = [
            { name : 'owner', index : 'owner', editable : false ,width:100},
            { name : 'startDateTime', index : 'startDateTime', editable : false,width:100},
            { name : 'endDateTime', index : 'endDateTime',  editable : false ,width:100},
            { name : 'objType', index : 'objType', editable : false,width:100 },
            { name : 'objName', index : 'objName', editable : false ,width:100},
            { name : 'actionType', index : 'actionType', editable : false,width:100},
            { name : 'statusText', index : 'statusText',  editable : false ,width:100},
            { name : 'msg', index : 'msg',  editable : false ,width:275},
            { name : 'id', index : 'id',hidden:true }
        ];
		option.onSelectRow = function(id){
		    var s;
		    s = $("#jqgridTask").jqGrid('getGridParam', 'selarrrow');
		    if(s.length>1){
		        for(var i=0;i<=s.length;i++){
		            if(s[i]!=id){
		                $("#jqgridTask").jqGrid('setSelection', s[i]);
		            }
		        }
		    }
		};
		option.onSelectAll = function(rowids, statue) {
		    $("#jqgridTask").jqGrid('resetSelection');
		};
		option.loadComplete = function(){
			$("#jqgridTask").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
		};
		
		$("#jqgridTask").jqGrid(option);
		
		$("#jqgridTask").navGrid('#pjqgridTask',
				{add:false, edit:false, view:false, del:false, refresh:false, search:true}, 
				{}, // use default settings for edit
				{}, // use default settings for add
				{},  // delete instead that del:false we need this
				{multipleSearch : true}, // enable the advanced searching
				{closeOnEscape:true} /* allow the view dialog to be closed when user press ESC key*/
			);
		
		// remove classes
		$(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
		$(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
		$(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
		$(".ui-jqgrid-pager").removeClass("ui-state-default");
		$(".ui-jqgrid").removeClass("ui-widget-content");
		
		// add classes
		$(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
		$(".ui-jqgrid-btable").addClass("table table-bordered table-striped");
		
		
		$(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
		$(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
		$(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
		$(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
		$(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
		$(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
		$(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
		$(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");
		
		$( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");
		
		$( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");
		
		$( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");
		
		$( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
		
		
		$(window).on('resize.jqGrid', function () {
		    $("#jqgridTask").jqGrid( 'setGridWidth', 975 );
		})    

}




//SANS列表
function createGrid_san_1(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '存储名称', '所属站点', '品牌','总量','剩余容量','登记时间 ','id'];
	option.colModel = [
      { name : 'name', index : 'name', editable : false },
      { name : 'siteName', index : 'siteName', editable : false,width:'180px' },
      { name : 'vendor', index : 'vendor', editable : false,
          formatter: function (cellvalue, options, rowObject) {
        	  return cellvalue.code;
          }
      },
      { name : 'total', index : 'total', editable : false,
    	  formatter: function (cellvalue, options, rowObject) {
    		  return (cellvalue/1024/1024/1024).toFixed(1)+"G";
          },
      },
      { name : 'free', index : 'free', editable : false,
    	  formatter: function (cellvalue, options, rowObject) {
    		  return (cellvalue/1024/1024/1024).toFixed(1)+"G";
          },
      },
      { name : 'createDateTime', index : 'createDateTime', editable : false },
      {
          name : 'id', index : 'id',hidden:true
       }
  ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}


//RG列表
function createGrid_rg(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ 'RG编号', '总量', '剩余容量','lun总数','状态'];
	option.colModel = [
      { name : 'number', index : 'number', editable : false },
      { name : 'total', index : 'total', editable : false,width:'180px',
    	  formatter: function (cellvalue, options, rowObject) {
    		  return (cellvalue/1024/1024/1024).toFixed(1)+"G";
          },    
      },
      { name : 'free', index : 'free', editable : false,
    	  formatter: function (cellvalue, options, rowObject) {
    		  return (cellvalue/1024/1024/1024).toFixed(1)+"G";
          },   
      },
      { name : 'lunNum', index : 'lunNum', editable : false },
      { name : 'enabled', index : 'enabled', editable : false ,
    	  formatter: function (cellvalue, options, rowObject) {
    		  if(cellvalue){
    			  return "启用";
    		  }else{
    			  return "停用";
    		  }
          },  
      }
  ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//端口列表
function createGrid_port(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '端口', '所属服务','启用状态', '分配状态','id'];
	option.colModel = [
        { name : 'portValue', index : 'portValue', editable : false},
        { name : 'servName', index : 'servName',  editable : false },
        { name : 'enabledText', index : 'enabledText',  editable : false },
        { name : 'used', index : 'used' , editable : false,
            formatter: function (cellvalue, options, rowObject) {
                if (cellvalue == false) return "<span class=\"txt-color-red pull-left\"><i class=\"fa fa-lg fa-times\"></i></span>";
                if (cellvalue == true) return "<span class=\"txt-color-green pull-left\"><i class=\"fa fa-lg fa-check\"></i></span>";},
            sortable : false, search:false
        },
        {name:"id",index:"id",hidden:true}
    ];
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//UPSQL工单列表
function addCellAttr(rowId, val, rawObject, cm, rdata) {
    if(rawObject.status == "unapproved" ){
        return "style='color:blue; font-weight: bold;";
    }else if(rawObject.status == "approved" ){
        return "style='color:green; font-weight: bold;";
    }else if(rawObject.status == "unapprove" ){
        return "style='color:red; font-weight: bold;";
    }
}
function createGrid_wo_1(data){
	var option = {};
	var jqGrid_order_template = {
			datatype : "local",
			height : 'auto',
			sortname : 'createDateTime',
			sortorder : "desc",
			multiselect:true,
			autowidth : true,
			pager : '#pjqgrid',
			hidegrid: false,
			rowNum: 30,
	        rowList: [10, 20, 30],
	        viewrecords: true
	}
	for(var i=0;i<data['data'].length;i++){
		if(data['data'][i].servTypeName == 'upredis_urproxy_sentinel'){
			data['data'][i].servTypeName = "UPREDIS";
		}
		if(data['data'][i].servTypeName == 'upsql_upproxy_swm'){
			data['data'][i].servTypeName = "UPSQL";
		}
		if(data['data'][i].servTypeName == 'mysql'){
			data['data'][i].servTypeName = "MYSQL";
		}
		if(data['data'][i].servTypeName == 'redis'){
			data['data'][i].servTypeName = "REDIS";
		}
	}
	$.extend(true, option, jqGrid_order_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '站点', '区域', '系统', '子系统', '用户', '服务名称','服务类型','工单类型', '创建时间','状态','status','id'];
	option.colModel = [
        { name : 'siteName', index : 'siteName', editable : false, cellattr:addCellAttr  },
        { name : 'areaName', index : 'areaName', editable : false, cellattr:addCellAttr },
        { name : 'businessSystemName', index : 'businessSystemName', editable : false, cellattr:addCellAttr },
        { name : 'businessSubSystemName', index : 'businessSubSystemName',  editable : false, cellattr:addCellAttr },
        { name : 'owner', index : 'owner',  editable : false, cellattr:addCellAttr },
        { name : 'servName', index : 'servName',  editable : false, cellattr:addCellAttr },
        { name : 'servTypeName', index : 'servTypeName', editable : false,cellattr:addCellAttr},
        { name : 'type', index : 'type', editable : false, cellattr:addCellAttr},
        { name : 'createDateTime', index : 'createDateTime', editable : false, cellattr:addCellAttr},
        { name : 'statusText', index : 'statusText', editable : false, cellattr:addCellAttr},
        {name:"status",index:"status",hidden:true},
        {name:"id",index:"id",hidden:true}
    ];
	/*option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;*/
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//REDIS工单列表
function createGrid_wo_2(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '站点', '区域', '系统', '子系统', '用户', '服务名称', '创建时间','状态','id'];
	option.colModel = [
        { name : 'siteName', index : 'siteName', editable : false },
        { name : 'areaName', index : 'areaName', editable : false },
        { name : 'businessSystemName', index : 'businessSystemName', editable : false },
        { name : 'businessSubSystemName', index : 'businessSubSystemName',  editable : false },
        { name : 'owner', index : 'owner',  editable : false },
        { name : 'servName', index : 'servName',  editable : false },
        { name : 'createDateTime', index : 'createDateTime', editable : false},
        { name : 'statusText', index : 'statusText', editable : false},
        {name:"id",index:"id",hidden:true}
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//主机资源监控
function createGridMonitorHostResource(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '主机名', '所属区域', '所属集群', 'IP地址','容器分配率', 'CPU分配率', '内存分配率', 'HDD分配率','SSD分配率','带宽分配率', '主机状态','管理agent状态','docker状态','docker plugin状态','单元信息','监控','id'];
	option.colModel = [
        { name: 'name', index: 'name', editable: false },
        { name: 'areaName', index: 'areaName', editable: false },
        { name: 'clusterName', index: 'clusterName',  editable: false },
        { name: 'sshIp', index: 'sshIp',  editable: false },
        { name: 'containerResource', index: 'containerResource', editable: false,
            formatter: function (cellvalue, options, rowObject) {
            	var percent = LimitCheckPercent(rowObject.usedContainer,rowObject.maxContainer).toFixed(0);
            	if (LimitCheck(rowObject.usedContainer, rowObject.maxContainer)) {
            		return "<div style='color:green;'><span style='font-weight:bold; white-space: nowrap;'>"+percent+"% &nbsp;&nbsp;("+rowObject.usedContainer + '/' + rowObject.maxContainer+")</span></div>";
            	}else{
            		return "<div style='color:red;'><span style='font-weight:bold; white-space: nowrap;'>"+percent+"% &nbsp;&nbsp;("+rowObject.usedContainer + '/' + rowObject.maxContainer+")</span></div>";
            	}
            }
        },
        { name: 'cpuResource', index: 'cpuResource', editable: false,
            formatter: function (cellvalue, options, rowObject) {
            	var percent = LimitCheckPercent(rowObject.cpuUsed,rowObject.cpuCount).toFixed(0);
            	if (LimitCheck(rowObject.cpuUsed, rowObject.cpuCount)) {
            		return "<div style='color:green;'><span style='font-weight:bold; white-space: nowrap;'>"+percent+"% &nbsp;&nbsp;("+rowObject.cpuUsed + '/' + rowObject.cpuCount+")</span></div>";
            	}else{
            		return "<div style='color:red;'><span style='font-weight:bold; white-space: nowrap;'>"+percent+"% &nbsp;&nbsp;("+rowObject.cpuUsed + '/' + rowObject.cpuCount+")</span></div>";
            	}
            }
        },
        { name: 'memResource', index: 'memResource', editable: false,
            formatter: function (cellvalue, options, rowObject) {
            	var percent = LimitCheckPercent(rowObject.memUsed,rowObject.memCount).toFixed(0);
            	if (LimitCheck(rowObject.memUsed, rowObject.memCount)) {
            		return "<div style='color:green;'><span style='font-weight:bold; white-space: nowrap;'>"+percent+"% &nbsp;&nbsp;("+BytesToGB(rowObject.memUsed) + '/' + BytesToGB(rowObject.memCount)+")</span></div>";
            	}else{
            		return "<div style='color:red;'><span style='font-weight:bold; white-space: nowrap;'>"+percent+"% &nbsp;&nbsp;("+BytesToGB(rowObject.memUsed) + '/' + BytesToGB(rowObject.memCount)+")</span></div>";
            	}
            }
        },
        { name: 'hddResource', index: 'hddResource', editable: false,
            formatter: function (cellvalue, options, rowObject) {
            	var total = 0,used = 0;
            	var percent;
            	if(rowObject['localHdds'] != null && rowObject['localHdds'].length != 0){
            		total = rowObject['localHdds']['0']['total'];
            		used = rowObject['localHdds']['0']['used'];
            	}
            	percent = LimitCheckPercent(used,total).toFixed(0);
            	if (LimitCheck(used, total)) {
            		return "<div style='color:green;'><span style='font-weight:bold; white-space: nowrap;'>"+percent+"% &nbsp;&nbsp;("+BytesToGB(used) + '/' + BytesToGB(total)+")</span></div>";
            	}else{
            		return "<div style='color:red;'><span style='font-weight:bold; white-space: nowrap;'>"+percent+"% &nbsp;&nbsp;("+BytesToGB(used) + '/' + BytesToGB(total)+")</span></div>";
            	}
            }
        },
        { name: 'ssdResource', index: 'ssdResource', editable: false,
            formatter: function (cellvalue, options, rowObject) {
            	var total = 0,used = 0;
            	var percent;
            	if(rowObject['localSsds'] != null && rowObject['localSsds'].length != 0){
            		total = rowObject['localSsds']['0']['total'];
            		used = rowObject['localSsds']['0']['used'];
            	}
            	percent = LimitCheckPercent(used,total).toFixed(0);
            	if (LimitCheck(used, total)) {
            		return "<div style='color:green;'><span style='font-weight:bold; white-space: nowrap;'>"+percent+"% &nbsp;&nbsp;("+BytesToGB(used) + '/' + BytesToGB(total)+")</span></div>";
            	}else{
            		return "<div style='color:red;'><span style='font-weight:bold; white-space: nowrap;'>"+percent+"% &nbsp;&nbsp;("+BytesToGB(used) + '/' + BytesToGB(total)+")</span></div>";
            	}
            }
        },
        { name: 'bandwidthResource', index: 'bandwidthResource', editable: false,
            formatter: function (cellvalue, options, rowObject) {
            	var percent = LimitCheckPercent(rowObject.bandwithUsed,rowObject.bandwithCount).toFixed(0);
            	if (LimitCheck(rowObject.bandwithUsed, rowObject.bandwithCount)) {
            		return "<div style='color:green;'><span style='font-weight:bold; white-space: nowrap;'>"+percent+"% &nbsp;&nbsp;("+rowObject.bandwithUsed + '/' + rowObject.bandwithCount+")</span></div>";
            	}else{
            		return "<div style='color:red;'><span style='font-weight:bold; white-space: nowrap;'>"+percent+"% &nbsp;&nbsp;("+rowObject.bandwithUsed + '/' + rowObject.bandwithCount+")</span></div>";
            	}
            }
        },
        { name: 'hostStatus', index: 'hostStatus',  editable: false,
        	formatter:function (cellvalue, options, rowObject){
        		if (cellvalue == 'passing') return "<span class=\"txt-color-green pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";
                if (cellvalue == 'warning') return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";
                if (cellvalue == 'critical') return "<span class=\"txt-color-red pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";
                if (cellvalue == 'unknown') return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";
        	}
        },
        { name: 'swarmAgentStatus', index: 'swarmAgentStatus',  editable: false,
        	formatter:function (cellvalue, options, rowObject){
        		if (cellvalue == 'passing') return "<span class=\"txt-color-green pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";
                if (cellvalue == 'warning') return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";
                if (cellvalue == 'critical') return "<span class=\"txt-color-red pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";
                if (cellvalue == 'unknown') return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";
        	}
        },
        { name: 'dockerStatus', index: 'dockerStatus',  editable: false ,
        	formatter:function (cellvalue, options, rowObject){
        		if (cellvalue == 'passing') return "<span class=\"txt-color-green pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";
                if (cellvalue == 'warning') return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";
                if (cellvalue == 'critical') return "<span class=\"txt-color-red pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";
                if (cellvalue == 'unknown') return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";
        	}
        },
        { name: 'dockerPluginStatus', index: 'dockerPluginStatus',  editable: false ,
        	formatter:function (cellvalue, options, rowObject){
        		if (cellvalue == 'passing') return "<span class=\"txt-color-green pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";
                if (cellvalue == 'warning') return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";
                if (cellvalue == 'critical') return "<span class=\"txt-color-red pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";
                if (cellvalue == 'unknown') return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";
        	}
        },
        { name : 'detail', index : 'detail', editable : false,
            formatter: function (cellvalue, options, rowObject) {
                return "<a href=\"\" data-unit-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#unitModal\"><span class=\" pull-left\"><i class=\"fa fa-lg fa-book\"></i></span></a>";
            }
        },
        { name : 'monitor', index : 'monitor', editable : false,
            formatter: function (cellvalue, options, rowObject) {
            	return "<a href=\"javascript:void(0)\" onclick=\"forwardHostResourceDetail('"+rowObject.id+"','"+rowObject.hostStatus+"')\"><span class=\"pull-left\"><i class=\"fa fa-lg fa-book\"></i></span></a>";
            }
        },
        { name : 'id', index : 'id', hidden : true}
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//组件监控
function createGridComponent(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.multiselect = false;
	option.data = data['data'];
	option.colNames = [ '组件名称', '组件IP地址', '组件端口号', '组件状态'];
	option.colModel = [
        { name : 'name', index : 'name', editable : false },
        { name : 'ip', index : 'ip', editable : false },
        { name : 'port', index : 'port',  editable : false },
        { name : 'status', index : 'status', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		if (rowObject.status == 'critical' || rowObject.availableStatus == 'critical' ){ return "<span class=\"txt-color-red pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";}else
        		if (rowObject.status == 'warning' || rowObject.availableStatus == 'warning' ){ return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";}else
        		if (rowObject.status == 'unknown' || rowObject.availableStatus == 'unknown' ){ return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";}else
        		{ return "<span class=\"txt-color-green pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";}
        	}
        }
    ];
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//主机状态监控
function createGridHostStatus(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.multiselect = false;
	option.data = data['data'];
	option.colNames = [ '主机名', '所属集群', '运行状态', '管理agent状态', 'docker状态', 'docker plugin状态', '实例单元信息'];
	option.colModel = [
        { name : 'host_name', index : 'host_name', editable : false },
        { name : 'cluster_name', index : 'cluster_name', editable : false },
        { name : 'host_status', index : 'host_status', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
            	return monitorStatus(rowObject.host_status);
            }
        },
        { name : 'swarm_agent_status', index : 'swarm_agent_status',  editable : false,
        	formatter: function (cellvalue, options, rowObject) {
            	return monitorStatus(rowObject.swarm_agent_status);
            }
        },
        { name : 'docker_status', index : 'docker_status',  editable : false,
        	formatter: function (cellvalue, options, rowObject) {
            	return monitorStatus(rowObject.docker_status);
            }
        },
        { name : 'docker_plugin_status', index : 'docker_plugin_status',  editable : false,
        	formatter: function (cellvalue, options, rowObject) {
            	return monitorStatus(rowObject.docker_plugin_status);
            }
        },
        { name : 'detail', index : 'detail', editable : false,
            formatter: function (cellvalue, options, rowObject) {
                return "<a href=\"\" data-unit-id='"+rowObject.host_id+"'\" data-toggle=\"modal\" data-target=\"#unitModal\"><span class=\" pull-left\"><i class=\"fa fa-lg fa-book\"></i></span></a>";
            }
        }
    ];
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//任务监控
function createGridTask(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.multiselect = false;
	option.data = data['data'];
	option.colNames = [ '任务类型', '任务结果', '实例名称', '操作者', '开始时间', '结束时间', '总耗时'];
	option.colModel = [
        { name : 'actionType', index : 'actionType', editable : false },
        { name : 'statusText', index : 'statusText', editable : false },
        { name : 'objName', index : 'objName', editable : false },
        { name : 'owner', index : 'owner',  editable : false },
        { name : 'startDateTime', index : 'startDateTime',  editable : false },
        { name : 'endDateTime', index : 'endDateTime',  editable : false },
        { name : 'duration', index : 'duration',  editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		if(rowObject.endDateTime == null || rowObject.endDateTime == ''){
        			return;
        		}
        		var startDateTime = new Date(rowObject.startDateTime);
        		var endDateTime = new Date(rowObject.endDateTime);
        		var duration = Math.round((endDateTime.getTime() - startDateTime.getTime())/1000);
        		var hour = Math.round(duration / 3600) > 0 ? Math.round(duration / 3600) + '小时' : '';
        		var minute = Math.round((duration % 3600) / 60) > 0 ? Math.round((duration % 3600) / 60) + '分钟' : '';
        		var second = (duration % 60) + '秒';
        		return hour + minute + second;
            }
        }
    ];
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//实例监控
function createGridInstance(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.multiselect = false;
	option.data = data['data'];
	option.colNames = [ '所属用户', '业务名', '子业务名', '实例名', '实例状态', '实例单元信息'];
	option.colModel = [
        { name : 'owner', index : 'owner', editable : false },
        { name : 'businessSystemName', index : 'businessSystemName', editable : false },
        { name : 'businessSubSystemName', index : 'businessSubSystemName', editable : false },
        { name : 'servName', index : 'servName',  editable : false },
        { name : 'statusText', index : 'statusText',  editable : false },
        { name : 'detail', index : 'detail',  editable : false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<a href=\"\" data-unit-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#unitModal\"><span class=\" pull-left\"><i class=\"fa fa-lg fa-book\"></i></span></a>";
            }
        }
    ];
	option.grouping = true;
	option.groupingView = {
			groupField: ["owner", "businessSystemName", "businessSubSystemName"],
            groupColumnShow: [true, true, true],
            groupText: [
				"所属用户: <b>{0}</b>",
				"业务名: <b>{0}</b>",
				"子业务名: <b>{0}</b>"
			],
            groupOrder: ["asc", "asc", "asc"],
            groupSummary: [false, false, false],
			groupSummaryPos: ['header', 'header', 'header'],
            groupCollapse: false
	};
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

function createGridUnitDetail(data){
	var role = '';
    $.each(data.data, function(index,obj){
    	role = obj['role'] == null?'':obj['role'];
    	$("#mainframestate").append(
                "<tr><td>"
    			+obj['owner']+"</td> <td>"
    			+obj['businessSystemName']+"</td> <td>"
    			+obj['businessSubSystemName']+"</td> <td>"
        		+obj['container_name']+"</td> <td>"
        		+role+"</td> <td>"
        		+obj['unit_type']+"</td> <td>"
        		+obj['container_status']+"</td></tr>"
        );
    });
}


//新建redis服务列表
function createGrid_redis_1(data){
	$("#jqgrid").jqGrid({
        data : data['data'],
        datatype : "local",
        height : 'auto',
        colNames : [ '服务名', '所属用户', '状态','任务详情', '任务状态', 'id'],
        colModel : [
            { name : 'servName', index : 'servName', editable : false },
            { name : 'owner', index : 'owner', editable : false },
            { name : 'statusText', index : 'statusText', editable : false},
            { name : 'taskStatusText', index : 'taskStatusText', editable : false},
            {
                name: 'info', index : 'info', editable: false,
                formatter: function (cellvalue, options, rowObject) {
                    return "<a href=\"\" data-toggle=\"modal\" data-target=\"#myModal\"><span class=\" pull-left\"><i class=\"fa fa-lg fa-book\"></i></span></a>";
                },
            },
            {name:"id",index:"id",hidden:true}
        ],
        //pager : '#pjqgrid',
        sortname : 'name',
        sortorder : "asc",
        multiselect:true,//设置为false则无勾选框出现
        hidegrid:false,
        editurl : "dummy.html",
        caption : "",
        autowidth : true,
        loadComplete: function () {  //隐藏滚动条
            $("#jqgrid").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
        },
        onSelectRow: function(id){
            var s;
            s = $("#jqgrid").jqGrid('getGridParam', 'selarrrow');
            if(s.length>1){
                for(var i=0;i<=s.length;i++){
                    if(s[i]!=id){
                        $("#jqgrid").jqGrid('setSelection', s[i]);
                    }
                }
            }
        },
        onSelectAll:function(rowids,statue) {
            $("#jqgrid").jqGrid('resetSelection');
        }

    });
    $("#jqgrid").jqGrid('navGrid', "#pjqgrid", {
        edit : false,
        add : false,
        del : true
    });
    $("#jqgrid").jqGrid('inlineNav', "#pjqgrid");
    /* Add tooltips */
    $('.navtable .ui-pg-button').tooltip({
        container : 'body'
    });
    /* Add tooltips */
    $('.navtable .ui-pg-button').tooltip({
        container : 'body'
    });

    // remove classes
    $(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
    $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
    $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
    $(".ui-jqgrid-pager").removeClass("ui-state-default");
    $(".ui-jqgrid").removeClass("ui-widget-content");

    // add classes
    $(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
    $(".ui-jqgrid-btable").addClass("table table-bordered table-striped");


    $(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
    $(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
    $(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
    $(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
    $(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
    $(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
    $(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
    $(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");

    $( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");

    $( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");

    $( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");

    $( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");

    $(window).on('resize.jqGrid', function () {
        $("#jqgrid").jqGrid( 'setGridWidth', $("#content").width() );
    })
}
function createGrid_redis_2(data){
	 var stateTable=$("#mainframestate");
     $.each(data,function(index,obj){
         stateTable.append(
                 "<tr><td>"+obj['name']+"</td> <td>" +obj['time']+"</td> <td>" +
                 obj['type']+"</td> <td>" +obj['objectname']+"</td> <td>" +
                 obj['type2']+"</td> <td>" +obj['state']+"</td> <td>" +
                 obj['return']+
                 "</td> </tr>"
         );
     });
}
//新建redis服务管理列表
function createGrid_redis_m1(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = ['单元名称', '所属集群', '所属主机', 'IP地址', '端口','cpu数量','内存','数据容量', '日志容量', '状态','容器状态','任务详情','id'];
	option.colModel = [
        {name: 'relateName', index: 'relateName', editable: false},
        {name: 'clusterName', index: 'clusterName', editable: false},
        {name: 'hostName', index: 'hostName',  editable: false},
        {name: 'hostIp', index: 'hostIp',  editable: false},
        {name: 'portValue', index: 'portValue',  editable: false},
        {name: 'cpuCount', index: 'cpuCount', editable: false},
        {name: 'memSize', index: 'memSize',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return BytesToSize(rowObject.memSize);
            }
        },
        {name: 'dataDirSize', index: 'dataDirSize',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return BytesToSize(rowObject.dataDirSize);
            }
        },
        {name: 'logDirSize', index: 'logDirSize',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return BytesToSize(rowObject.logDirSize);
            }
        },
        {name: 'statusText', index: 'statusText',  editable: false},
        {name: 'containerStatus', index: 'containerStatus', editable: false},
        {
            name: 'info', index: 'info', editable: false,
            formatter: function (cellvalue, options, rowObject) {
                return "<a href=\"\" data-toggle=\"modal\" data-target=\"#myModal\"><span class=\" pull-left\"><i class=\"fa fa-lg fa-book\"></i></span></a>";
            }
        },
        {name:"id",index:"id",hidden:true}
    ];
	option.grouping = true;
	option.groupingView = {
			groupField: ["portValue"],
            groupColumnShow: [true],
            groupText: [
				"分片号: <b>{0}</b>"
			],
            groupOrder: ["asc"],
            groupSummary: [false],
			groupSummaryPos: ['header'],
            groupCollapse: false
	};
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}
function createGrid_redis_m2(data){
	 var stateTable = $("#mainframestate");
    $.each(data, function (index, obj) {
        stateTable.append(
                "<tr><td>" + obj['name'] + "</td> <td>" + obj['time'] + "</td> <td>" +
                obj['type'] + "</td> <td>" + obj['objectname'] + "</td> <td>" +
                obj['type2'] + "</td> <td>" + obj['state'] + "</td> <td>" +
                obj['return'] +
                "</td> </tr>"
        );
    });
}
function createGrid_redis_m3(data){
	 $.each(data, function (index, obj) {
        $("#name").append(obj['name']);
        $("#owner").append(obj['owner']);
        $("#architecture").append(obj['architecture']);
        $("#scale").append(obj['scale']);
        $("#software").append(obj['software']);
        $("#state").append(obj['state']);
    });
}

//upsql服务列表
function createGrid_mysql_1(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames =  [ '站点名称','所属用户','业务系统','业务子系统','服务名称','部署架构','软件版本', '性能套餐','scaleNamePro','访问地址','状态','任务状态','管 理','softwareImageId','softwareImageIdUpproxy','softwareImageIdSwm','dateSize','networkBandwidth','networkBandwidthPro','id','taskId','createSuccessFlg'];
	option.colModel = [
		{ name : 'siteName', index : 'siteName', editable : false },
		{ name : 'ownerName', index : 'ownerName', editable : false },
		{ name : 'businessSystemName', index : 'businessSystemName', editable : false },
		{ name : 'businessSubSystemName', index : 'businessSubSystemName', editable : false },
        { name : 'servName', index : 'servName', editable : false },
        { name : 'archName', index : 'archName', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		var upsqlCnt = 0;
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'upsql'){
        				upsqlCnt++;
        				ret = v.archName;
        			}
        		});
        		if (rowObject.sharding == true) {
        			ret += "(" + upsqlCnt + "分片)";
        		}
        		return ret;
            }
        },
        { name : 'softwareVersion', index : 'softwareVersion', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'upsql'){
        				ret = v.softwareVersion;
        			}
        		});
        		return ret;
            }
        },
        { name : 'scaleName', index : 'scaleName', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'upsql'){
        				ret = v.scaleName;
        			}
        		});
        		return ret;
            }
        },
        { name : 'scaleNamePro', index : 'scaleNamePro', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'upproxy'){
        				ret = v.scaleName;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'endPointIps', index : 'endPointIps', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'upproxy' && v.endPointIps != undefined){
        				$.each(v.endPointIps, function(i, endPointIp){
        					ret += endPointIp +":"+v.port+ "</br>";
            			});
        			}
        		});
        		return ret;
            }
        },
        { name : 'availableStatus', index : 'availableStatus', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		if (rowObject.status == 'critical' || rowObject.availableStatus == 'critical' ){ return "<span class=\"txt-color-red pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";}else
        		if (rowObject.status == 'warning' || rowObject.availableStatus == 'warning' ){ return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";}else
        		if (rowObject.status == 'unknown' || rowObject.availableStatus == 'unknown' ){ return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";}else
        		{ return "<span class=\"txt-color-green pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";}
        	}
        },
        { name : 'taskStatusText', index : 'taskStatusText', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var con = cellvalue != null?cellvalue:'';
                return "<a href=\"\" data-service-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#serviceModal\"><span class=\" pull-left\">"+con+"&nbsp;<i class=\"fa fa-lg fa-book\"></i></span></a>";
            },editable: false, align: "center"
        },
        { name : 'manageServ', index : 'manageServ', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		return "<a href=\"javascript:void(0);\" onclick=\"manageUpsqlOnRow('"+rowObject.id+"',"+rowObject.createSuccessFlg+")\"><i class=\"fa fa-cog fa-2\" style=\"font-size:18px;\"></i></a>";
            },editable: false ,align: "center"
        },
        { name : 'softwareImageId', index : 'softwareImageId', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'upsql'){
        				ret = v.softwareImageId;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'softwareImageIdUpproxy', index : 'softwareImageIdUpproxy', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'upproxy'){
        				ret = v.softwareImageId;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'softwareImageIdSwm', index : 'softwareImageIdSwm', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'switch_manager'){
        				ret = v.softwareImageId;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'dateSize', index : 'dateSize', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'upsql'){
        				ret = v.dateSize;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'networkBandwidth', index : 'networkBandwidth', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'upsql'){
        				if(v.networkBandwidth == 0){
        					ret = "无限制";
        				}else{
        					ret = v.networkBandwidth+"M";
        				}
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'networkBandwidthPro', index : 'networkBandwidthPro', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'upproxy'){
        				if(v.networkBandwidth == 0){
        					ret = "无限制";
        				}else{
        					ret = v.networkBandwidth+"M";
        				}
        			}
        		});
        		return ret;
            },hidden:true
        },
        {name:"id",index:"id",hidden:true},
        {name:"taskId",index:"taskId",hidden:true},
        {name:"createSuccessFlg",index:"createSuccessFlg",
        	formatter: function (cellvalue, options, rowObject) {
        		var createSuccessFlg = "no";
        		if(cellvalue){
        			createSuccessFlg = "yes";
        		}else{
        			createSuccessFlg = "no";
        		}
        		return createSuccessFlg;
        	},
        hidden:true}
    ];
/*	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;*/
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//mysql服务列表
function createGrid_mysql_mysql(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames =  [ '站点名称','所属用户','业务系统','业务子系统','服务名称','部署架构','软件版本', '性能套餐','scaleNamePro','状态','任务状态','管 理','softwareImageId','softwareImageIdUpproxy','softwareImageIdSwm','dateSize','networkBandwidth','networkBandwidthPro','id','taskId','createSuccessFlg'];
	option.colModel = [
		{ name : 'siteName', index : 'siteName', editable : false },
		{ name : 'ownerName', index : 'ownerName', editable : false },
		{ name : 'businessSystemName', index : 'businessSystemName', editable : false },
		{ name : 'businessSubSystemName', index : 'businessSubSystemName', editable : false },
        { name : 'servName', index : 'servName', editable : false },
        { name : 'archName', index : 'archName', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		var upsqlCnt = 0;
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				upsqlCnt++;
        				ret = v.archName;
        			}
        		});
        		if (rowObject.sharding == true) {
        			ret += "(" + upsqlCnt + "分片)";
        		}
        		return ret;
            }
        },
        { name : 'softwareVersion', index : 'softwareVersion', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				ret = v.softwareVersion;
        			}
        		});
        		return ret;
            }
        },
        { name : 'scaleName', index : 'scaleName', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				ret = v.scaleName;
        			}
        		});
        		return ret;
            }
        },
        { name : 'scaleNamePro', index : 'scaleNamePro', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				ret = v.scaleName;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'availableStatus', index : 'availableStatus', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		if (rowObject.status == 'critical' || rowObject.availableStatus == 'critical' ){ return "<span class=\"txt-color-red pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";}else
        		if (rowObject.status == 'warning' || rowObject.availableStatus == 'warning' ){ return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";}else
        		if (rowObject.status == 'unknown' || rowObject.availableStatus == 'unknown' ){ return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";}else
        		{ return "<span class=\"txt-color-green pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";}
        	}
        },
        { name : 'taskStatusText', index : 'taskStatusText', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var con = cellvalue != null?cellvalue:'';
                return "<a href=\"\" data-service-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#serviceModal\"><span class=\" pull-left\">"+con+"&nbsp;<i class=\"fa fa-lg fa-book\"></i></span></a>";
            },editable: false, align: "center"
        },
        { name : 'manageServ', index : 'manageServ', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		return "<a href=\"javascript:void(0);\" onclick=\"manageMysqlOnRow('"+rowObject.id+"',"+rowObject.createSuccessFlg+")\"><i class=\"fa fa-cog fa-2\" style=\"font-size:18px;\"></i></a>";
            },editable: false ,align: "center"
        },
        { name : 'softwareImageId', index : 'softwareImageId', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				ret = v.softwareImageId;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'softwareImageIdUpproxy', index : 'softwareImageIdUpproxy', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				ret = v.softwareImageId;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'softwareImageIdSwm', index : 'softwareImageIdSwm', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				ret = v.softwareImageId;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'dateSize', index : 'dateSize', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				ret = v.dateSize;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'networkBandwidth', index : 'networkBandwidth', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				if(v.networkBandwidth == 0){
        					ret = "无限制";
        				}else{
        					ret = v.networkBandwidth+"M";
        				}
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'networkBandwidthPro', index : 'networkBandwidthPro', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				if(v.networkBandwidth == 0){
        					ret = "无限制";
        				}else{
        					ret = v.networkBandwidth+"M";
        				}
        			}
        		});
        		return ret;
            },hidden:true
        },
        {name:"id",index:"id",hidden:true},
        {name:"taskId",index:"taskId",hidden:true},
        {name:"createSuccessFlg",index:"createSuccessFlg",
        	formatter: function (cellvalue, options, rowObject) {
        		var createSuccessFlg = "no";
        		if(cellvalue){
        			createSuccessFlg = "yes";
        		}else{
        			createSuccessFlg = "no";
        		}
        		return createSuccessFlg;
        	},
        hidden:true}
    ];
/*	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;*/
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

function createGrid_serviceDetail(data){
	var stateTable=$("#mainframestate");
    $.each(data.data ,function(index,obj){
        stateTable.append(
                "<tr><td>"+obj['owner']+"</td> <td>" +obj['startDateTime']+"</td> <td>" +
                obj['objType']+"</td> <td>" +obj['objName']+"</td> <td>" +
                obj['actionType']+"</td> <td>" +obj['statusText']+"</td> <td>" +
                obj['msg']+
                "</td> </tr>"
        );
    });
}
//新建mysql服务管理列表
function addCellAttrBg(rowId, val, rawObject, cm, rdata) {
    if(rawObject.fontcolor == "900323" ){
        return "style='background-color:#3276b1;color:#fff;'";
    }
}
function createGrid_mysql_m1(data){
	var option = {};
	var colornum = '';
	var dataArray=new Array();
	for(var i=0;i<data['data'].length;i++){
		(i%2 ==0) ?colornum = "333333":colornum = "000000";
		for(var k=0;k<data['data'][i]['units'].length;k++){
			data['data'][i]['units'][k]['fontcolor'] = colornum;
			data['data'][i]['units'][k]['subServsId'] = data['data'][i]['id'];
			dataArray.push(data['data'][i]['units'][k]);
		}
	}
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = dataArray;
	option.colNames = ['实例单元名称', '所属集群','clusterId', '所属主机', '所属主机IP', '服务地址', '服务端口','版本号','CPU数量','内存容量','角色', '容器状态', '运行状态','可用状态','任务详情','subServsId','id','taskId'];
	option.colModel = [
        {name: 'relateName', index: 'relateName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            },width:'200px'
        },
        {name: 'clusterName', index: 'clusterName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'clusterId', index: 'clusterId', editable: false,hidden:true},
        {name: 'hostName', index: 'hostName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'hostIp', index: 'hostIp', editable: false},
        {name: 'serverIp', index: 'serverIp', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'portValue', index: 'portValue', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'softwareVersion', index: 'softwareVersion',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'cpuCount', index: 'cpuCount',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'memSize', index: 'memSize',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+BytesToGB(cellvalue)+"G</div>";
            }
        },
        {name: 'role', index: 'role', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'containerStatus', index: 'containerStatus', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'status', index: 'status',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
        		if (cellvalue == 'passing') return "<span class=\"txt-color-green pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";
                if (cellvalue == 'warning') return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";
                if (cellvalue == 'critical') return "<span class=\"txt-color-red pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";
                if (cellvalue == 'unknown') return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";
            }
        },
        {name: 'availableStatus', index: 'availableStatus',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
        		if (cellvalue == 'normal') return "<span class=\"txt-color-green pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";
                if (cellvalue == 'warning') return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";
                if (cellvalue == 'abnormal') return "<span class=\"txt-color-red pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";
                if (cellvalue == 'unknown') return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";
            }
        },
        {
            name: 'taskStatusText', editable: false,
            formatter: function (cellvalue, options, rowObject) {
            	var con = cellvalue != null?cellvalue:'';
                return "<a href=\"\" data-upsql-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#taskModal\"><span class=\" pull-left\">"+con+"&nbsp;<i class=\"fa fa-lg fa-book\"></i></span></a>";
            }
        },
        {name:"subServsId",index:"subServsId",hidden:true},
        {name:"id",index:"id",hidden:true},
        {name:"taskId",index:"taskId",hidden:true}
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete =  function (resultData) {
		$("#jqgrid").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
		for (var i = 0; i < resultData.rows.length; i++) {
	        var $tr = $('tr#' + resultData.rows[i].id);
	    	if(resultData.rows[i]['fontcolor'] == "000000"){
	    		$tr.css({"background-color":"#fdfae6"});
	    	}else{
	    		$tr.css({"background-color":"#ffffff"});
	    	}
	    }
	};
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//mysql服务管理列表
function createGrid_mysql_manage(data){
	var option = {};
	var colornum = '';
	var dataArray=new Array();
	for(var i=0;i<data['data'].length;i++){
		(i%2 ==0) ?colornum = "333333":colornum = "000000";
		for(var k=0;k<data['data'][i]['units'].length;k++){
			data['data'][i]['units'][k]['fontcolor'] = colornum;
			data['data'][i]['units'][k]['subServsId'] = data['data'][i]['id'];
			dataArray.push(data['data'][i]['units'][k]);
		}
	}
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = dataArray;
	option.colNames = ['实例单元名称', '所属集群','clusterId', '所属主机', '所属主机IP', '服务地址', '服务端口','版本号','CPU数量','内存容量','角色', '容器状态', '运行状态','任务详情','subServsId','id','taskId'];
	option.colModel = [
        {name: 'relateName', index: 'relateName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            },width:'200px'
        },
        {name: 'clusterName', index: 'clusterName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'clusterId', index: 'clusterId', editable: false,hidden:true},
        {name: 'hostName', index: 'hostName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'hostIp', index: 'hostIp', editable: false},
        {name: 'serverIp', index: 'serverIp', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'portValue', index: 'portValue', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'softwareVersion', index: 'softwareVersion',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'cpuCount', index: 'cpuCount',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'memSize', index: 'memSize',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+BytesToGB(cellvalue)+"G</div>";
            }
        },
        {name: 'role', index: 'role', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'containerStatus', index: 'containerStatus', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'status', index: 'status',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
        		if (cellvalue == 'passing') return "<span class=\"txt-color-green pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";
                if (cellvalue == 'warning') return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";
                if (cellvalue == 'critical') return "<span class=\"txt-color-red pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";
                if (cellvalue == 'unknown') return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";
            }
        },
        {
            name: 'taskStatusText', editable: false,
            formatter: function (cellvalue, options, rowObject) {
            	var con = cellvalue != null?cellvalue:'';
                return "<a href=\"\" data-upsql-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#taskModal\"><span class=\" pull-left\">"+con+"&nbsp;<i class=\"fa fa-lg fa-book\"></i></span></a>";
            }
        },
        {name:"subServsId",index:"subServsId",hidden:true},
        {name:"id",index:"id",hidden:true},
        {name:"taskId",index:"taskId",hidden:true}
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete =  function (resultData) {
		$("#jqgrid").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
		for (var i = 0; i < resultData.rows.length; i++) {
	        var $tr = $('tr#' + resultData.rows[i].id);
	    	if(resultData.rows[i]['fontcolor'] == "000000"){
	    		$tr.css({"background-color":"#fdfae6"});
	    	}else{
	    		$tr.css({"background-color":"#ffffff"});
	    	}
	    }
	};
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}



//新建upproxy服务管理列表
function createGrid_upproxy(data){
	var option = {};
	var colornum = '';
	var dataArray=new Array();
	for(var i=0;i<data['data'].length;i++){
		(i%2 ==0) ?colornum = "333333":colornum = "000000";
		for(var k=0;k<data['data'][i]['units'].length;k++){
			data['data'][i]['units'][k]['fontcolor'] = colornum;
			data['data'][i]['units'][k]['subServsId'] = data['data'][i]['id'];
			dataArray.push(data['data'][i]['units'][k]);
		}
	}
	
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = dataArray;
	option.colNames = ['实例单元名称', '所属集群','clusterId', '所属主机', '所属主机IP', '服务地址', '服务端口','版本号','CPU数量','内存容量', '容器状态', '运行状态','任务详情','subServsId', 'id'];
	option.colModel = [
        {name: 'relateName', index: 'relateName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'clusterName', index: 'clusterName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'clusterId', index: 'clusterId', editable: false,hidden:true},
        {name: 'hostName', index: 'hostName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'hostIp', index: 'hostIp', editable: false},
        {name: 'serverIp', index: 'serverIp', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'portValue', index: 'portValue', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'softwareVersion', index: 'softwareVersion',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'cpuCount', index: 'cpuCount',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'memSize', index: 'memSize',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+BytesToGB(cellvalue)+"G</div>";
            }
        },
        {name: 'containerStatus', index: 'containerStatus', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'status', index: 'status',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
        		if (cellvalue == 'passing') return "<span class=\"txt-color-green pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";
                if (cellvalue == 'warning') return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";
                if (cellvalue == 'critical') return "<span class=\"txt-color-red pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";
                if (cellvalue == 'unknown') return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";
            }
        },
        {
            name: 'taskStatusText', editable: false,
            formatter: function (cellvalue, options, rowObject) {
            	var con = cellvalue != null?cellvalue:'';
                return "<a href=\"\" data-upsql-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#taskModal\"><span class=\" pull-left\">"+con+"&nbsp;<i class=\"fa fa-lg fa-book\"></i></span></a>";
            }
        },
        {name:"subServsId",index:"subServsId",hidden:true},
        {name:"id",index:"id",hidden:true}
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete =  function (resultData) {
		$("#jqgrid").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
		for (var i = 0; i < resultData.rows.length; i++) {
	        var $tr = $('tr#' + resultData.rows[i].id);
	        if(resultData.rows[i]['fontcolor'] == "000000"){
	    		$tr.css("background-color", "#fdfae6");
	    	}else{
	    		$tr.css("background-color", "#ffffff");
	    	}
	    }   
	};
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}


//新建switch_manager服务管理列表
function createGrid_switch_manager(data){
	var option = {};
	var colornum = '';
	var dataArray=new Array();
	for(var i=0;i<data['data'].length;i++){
		(i%2 ==0) ?colornum = "333333":colornum = "000000";
		for(var k=0;k<data['data'][i]['units'].length;k++){
			data['data'][i]['units'][k]['fontcolor'] = colornum;
			data['data'][i]['units'][k]['subServsId'] = data['data'][i]['id'];
			dataArray.push(data['data'][i]['units'][k]);
		}
	}
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = dataArray;
	option.colNames = ['实例单元名称', '所属集群','clusterId', '所属主机', '所属主机IP', '服务地址', '服务端口','版本号','CPU数量','内存容量', '容器状态', '运行状态','任务详情','subServsId', 'id'];
	option.colModel = [
        {name: 'relateName', index: 'relateName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'clusterName', index: 'clusterName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'clusterId', index: 'clusterId', editable: false,hidden:true},
        {name: 'hostName', index: 'hostName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'hostIp', index: 'hostIp', editable: false},
        {name: 'serverIp', index: 'serverIp', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'portValue', index: 'portValue', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'softwareVersion', index: 'softwareVersion',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'cpuCount', index: 'cpuCount',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'memSize', index: 'memSize',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+BytesToGB(cellvalue)+"G</div>";
            }
        },
        {name: 'containerStatus', index: 'containerStatus', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'status', index: 'status',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
        		if (cellvalue == 'passing') return "<span class=\"txt-color-green pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";
                if (cellvalue == 'warning') return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";
                if (cellvalue == 'critical') return "<span class=\"txt-color-red pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";
                if (cellvalue == 'unknown') return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";
            }
        },
        {
            name: 'taskStatusText', editable: false,
            formatter: function (cellvalue, options, rowObject) {
            	var con = cellvalue != null?cellvalue:'';
                return "<a href=\"\" data-upsql-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#taskModal\"><span class=\" pull-left\">"+con+"&nbsp;<i class=\"fa fa-lg fa-book\"></i></span></a>";
            }
        },
        {name:"subServsId",index:"subServsId",hidden:true},
        {name:"id",index:"id",hidden:true}
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete =  function (resultData) {
		$("#jqgrid").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
		for (var i = 0; i < resultData.rows.length; i++) {
	        var $tr = $('tr#' + resultData.rows[i].id);
	        if(resultData.rows[i]['fontcolor'] == "000000"){
	    		$tr.css("background-color", "#fdfae6");
	    	}else{
	    		$tr.css("background-color", "#ffffff");
	    	}
	    }   
	};
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}


function createGrid_mysql_m2(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.pager = 'pjqgridParam';
	option.caption = "";
	option.data = data['data'];
	option.colNames = ['参数名称', '默认值', '重启生效', '说明'];
	option.colModel = [
        {name: 'name', index: 'name', editable: false},
        {name: 'value', index: 'value', editable: false},
        {name: 'mustRestart', index: 'mustRestart', editable: false},
        {name: 'description', index: 'description', editable: false}
    ];
	option.onSelectRow = function(id){
	    var s;
	    s = $("#jqgridParam").jqGrid('getGridParam', 'selarrrow');
	    if(s.length>1){
	        for(var i=0;i<=s.length;i++){
	            if(s[i]!=id){
	                $("#jqgridParam").jqGrid('setSelection', s[i]);
	            }
	        }
	    }
	};
	option.onSelectAll = function(rowids, statue) {
	    $("#jqgridParam").jqGrid('resetSelection');
	};
	option.loadComplete = function(){
		$("#jqgridParam").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
	};
	
	$("#jqgridParam").jqGrid(option);
	
	$("#jqgridParam").navGrid('#pjqgridParam',
			{add:false, edit:false, view:false, del:false, refresh:false, search:true}, 
			{}, // use default settings for edit
			{}, // use default settings for add
			{},  // delete instead that del:false we need this
			{multipleSearch : true}, // enable the advanced searching
			{closeOnEscape:true} /* allow the view dialog to be closed when user press ESC key*/
		);
	
	// remove classes
    $(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
    $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
    $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
    $(".ui-jqgrid-pager").removeClass("ui-state-default");
    $(".ui-jqgrid").removeClass("ui-widget-content");

    // add classes
    $(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
    $(".ui-jqgrid-btable").addClass("table table-bordered table-striped");


    $(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
    $(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
    $(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
    $(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
    $(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
    $(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
    $(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
    $(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");

    $( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");

    $( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");

    $( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");

    $( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
    

    $(window).on('resize.jqGrid', function () {
        $("#jqgridParam").jqGrid( 'setGridWidth', $("#content").width() );
    })    
}
function createGrid_mysql_m3(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.pager = 'pjqgridBackupStrategy';
	option.caption = "";
	option.data = data['data'];
	option.colNames = ['策略类型', '发起时间', '保留时间', '状态', '创建时间', '创建者','id'];
	option.colModel = [
        {name: 'typeText', index: 'typeText', editable: false},
        {name: 'cronExpression', index: 'cronExpression', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
        		var crons = rowObject.cronExpression.split(' ');
        		var cronText = '';
        		if(crons[2] != '*'){
        			cronText += '每月 ';
        			cronText += crons[2] + '日 ';
        		} else if(crons[4] != '*'){
        			cronText += '每周 ';
        			cronText += '周' + crons[4] + ' ';
        		} else {
        			cronText += '每日 ';
        		}
        		cronText += crons[1] + ':' + crons[0];
                return cronText;
            }
        },
        {name: 'retention', index: 'retention', editable: false},
        {name: 'enabledText', index: 'enabledText', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
        		if(cellvalue == "否"){
        			return "<div style='color:red;'>停用</div>";
        		}else{
        			return "<div style='color:green;'>启用</div>";
        		}
            }
        },
        {name: 'createDateTime', index: 'createDateTime', editable: false},
        {name: 'createLoginUserName', index: 'createLoginUserName', editable: false},
        {name: 'id', index: 'id', hidden: true}
    ];
	option.onSelectRow = function(id){
	    var s;
	    s = $("#jqgridBackupStrategy").jqGrid('getGridParam', 'selarrrow');
	    if(s.length>1){
	        for(var i=0;i<=s.length;i++){
	            if(s[i]!=id){
	                $("#jqgridBackupStrategy").jqGrid('setSelection', s[i]);
	            }
	        }
	    }
	};
	option.onSelectAll = function(rowids, statue) {
	    $("#jqgridBackupStrategy").jqGrid('resetSelection');
	};
	option.loadComplete = function(){
		$("#jqgridBackupStrategy").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
	};
	
	$("#jqgridBackupStrategy").jqGrid(option);
	
	$("#jqgridBackupStrategy").navGrid('#pjqgridBackupStrategy',
			{add:false, edit:false, view:false, del:false, refresh:false, search:true}, 
			{}, // use default settings for edit
			{}, // use default settings for add
			{},  // delete instead that del:false we need this
			{multipleSearch : true}, // enable the advanced searching
			{closeOnEscape:true} /* allow the view dialog to be closed when user press ESC key*/
		);
	
	// remove classes
    $(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
    $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
    $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
    $(".ui-jqgrid-pager").removeClass("ui-state-default");
    $(".ui-jqgrid").removeClass("ui-widget-content");

    // add classes
    $(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
    $(".ui-jqgrid-btable").addClass("table table-bordered table-striped");


    $(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
    $(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
    $(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
    $(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
    $(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
    $(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
    $(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
    $(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");

    $( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");

    $( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");

    $( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");

    $( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
    

    $(window).on('resize.jqGrid', function () {
        $("#jqgridBackupStrategy").jqGrid( 'setGridWidth', $("#content").width() );
    })    
}
function createGrid_mysql_m4(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.pager = 'pjqgridBackupList';
	option.caption = "";
	option.multiselect = true;
	option.data = data['data'];
	option.colNames = ['备份名称', '备份类型', '备份大小', '创建时间', '过期时间', '备注','id'];
	option.colModel = [
        {name: 'name', index: 'name', editable: false},
        {name: 'backupType', index: 'backupType', editable: false},
        {name: 'size', index: 'size', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return BytesToSize(rowObject.size);
            }
        },
        {name: 'createDateTime', index: 'createDateTime', editable: false},
        {name: 'expire', index: 'expire', editable: false},
        {name: 'remark', index: 'remark', editable: false},
        {name: 'id', index: 'id', hidden: true}
    ];
	option.onSelectRow = function(id){
	    var s;
	    s = $("#jqgridBackupList").jqGrid('getGridParam', 'selarrrow');
	    if(s.length>1){
	        for(var i=0;i<=s.length;i++){
	            if(s[i]!=id){
	                $("#jqgridBackupList").jqGrid('setSelection', s[i]);
	            }
	        }
	    }
	};
	option.onSelectAll = function(rowids, statue) {
	    $("#jqgridBackupList").jqGrid('resetSelection');
	};
	option.loadComplete = function(){
		$("#jqgridBackupList").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
	};
	
	$("#jqgridBackupList").jqGrid(option);
	
	$("#jqgridBackupList").navGrid('#pjqgridBackupList',
			{add:false, edit:false, view:false, del:false, refresh:false, search:true}, 
			{}, // use default settings for edit
			{}, // use default settings for add
			{},  // delete instead that del:false we need this
			{multipleSearch : true}, // enable the advanced searching
			{closeOnEscape:true} /* allow the view dialog to be closed when user press ESC key*/
		);
	
	// remove classes
    $(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
    $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
    $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
    $(".ui-jqgrid-pager").removeClass("ui-state-default");
    $(".ui-jqgrid").removeClass("ui-widget-content");

    // add classes
    $(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
    $(".ui-jqgrid-btable").addClass("table table-bordered table-striped");


    $(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
    $(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
    $(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
    $(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
    $(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
    $(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
    $(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
    $(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");

    $( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");

    $( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");

    $( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");

    $( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
    

    $(window).on('resize.jqGrid', function () {
        $("#jqgridBackupList").jqGrid( 'setGridWidth', $("#content").width() );
    })    
}

function createGrid_mysql_m5(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.pager = 'pjqgridRelation';
	option.caption = "";
	option.multiselect = false;
	option.data = data;
	option.colNames = ['实例名称', '角色', 'IP', '端口', '主机IP', '主机名', '状态', '容器状态'];
	option.colModel = [
        {name: 'relateName', index: 'relateName', editable: false},
        {name: 'role', index: 'role', editable: false},
        {name: 'serverIp', index: 'serverIp', editable: false},
        {name: 'portValue', index: 'portValue', editable: false},
        {name: 'hostIp', index: 'hostIp', editable: false},
        {name: 'hostName', index: 'hostName', editable: false},
        {name: 'statusText', index: 'statusText', editable: false},
        {name: 'containerStatus', index: 'containerStatus', editable: false}
    ];
	option.onSelectRow = function(id){
	    var s;
	    s = $("#jqgridRelation").jqGrid('getGridParam', 'selarrrow');
	    if(s.length>1){
	        for(var i=0;i<=s.length;i++){
	            if(s[i]!=id){
	                $("#jqgridRelation").jqGrid('setSelection', s[i]);
	            }
	        }
	    }
	};
	option.onSelectAll = function(rowids, statue) {
	    $("#jqgridRelation").jqGrid('resetSelection');
	};
	option.loadComplete = function(){
		$("#jqgridRelation").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
	};
	
	$("#jqgridRelation").jqGrid(option);
	
	$("#jqgridRelation").navGrid('#pjqgridRelation',
			{add:false, edit:false, view:false, del:false, refresh:false, search:true}, 
			{}, // use default settings for edit
			{}, // use default settings for add
			{},  // delete instead that del:false we need this
			{multipleSearch : true}, // enable the advanced searching
			{closeOnEscape:true} /* allow the view dialog to be closed when user press ESC key*/
		);
	
	// remove classes
    $(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
    $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
    $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
    $(".ui-jqgrid-pager").removeClass("ui-state-default");
    $(".ui-jqgrid").removeClass("ui-widget-content");

    // add classes
    $(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
    $(".ui-jqgrid-btable").addClass("table table-bordered table-striped");


    $(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
    $(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
    $(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
    $(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
    $(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
    $(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
    $(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
    $(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");

    $( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");

    $( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");

    $( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");

    $( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
    

    $(window).on('resize.jqGrid', function () {
        $("#jqgridRelation").jqGrid( 'setGridWidth', $("#content").width() );
    })    
}

function createGrid_mysql_m7(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.pager = 'pjqgridDatabase';
	option.caption = "";
	option.data = data['data'];
	option.colNames = ['库名', '编码类型'];
	option.colModel = [
        {name: 'name', index: 'name', editable: false},
        {name: 'characterSetText', index: 'characterSetText', editable: false}
    ];
	option.onSelectRow = function(id){
	    var s;
	    s = $("#jqgridDatabase").jqGrid('getGridParam', 'selarrrow');
	    if(s.length>1){
	        for(var i=0;i<=s.length;i++){
	            if(s[i]!=id){
	                $("#jqgridDatabase").jqGrid('setSelection', s[i]);
	            }
	        }
	    }
	};
	option.onSelectAll = function(rowids, statue) {
	    $("#jqgridDatabase").jqGrid('resetSelection');
	};
	option.loadComplete = function(){
		$("#jqgridDatabase").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
	};
	
	$("#jqgridDatabase").jqGrid(option);
	
	$("#jqgridDatabase").navGrid('#pjqgridDatabase',
			{add:false, edit:false, view:false, del:false, refresh:false, search:true}, 
			{}, // use default settings for edit
			{}, // use default settings for add
			{},  // delete instead that del:false we need this
			{multipleSearch : true}, // enable the advanced searching
			{closeOnEscape:true} /* allow the view dialog to be closed when user press ESC key*/
		);
	
	// remove classes
    $(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
    $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
    $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
    $(".ui-jqgrid-pager").removeClass("ui-state-default");
    $(".ui-jqgrid").removeClass("ui-widget-content");

    // add classes
    $(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
    $(".ui-jqgrid-btable").addClass("table table-bordered table-striped");


    $(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
    $(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
    $(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
    $(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
    $(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
    $(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
    $(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
    $(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");

    $( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");

    $( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");

    $( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");

    $( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
    

    $(window).on('resize.jqGrid', function () {
        $("#jqgridDatabase").jqGrid( 'setGridWidth', $("#content").width() );
    })    
}

function createGrid_user(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '登录用户名', '用户姓名', '所属单位','默认站点','默认区域','areaId', '联系电话', '邮箱', '状态', '角色', '自动审批', '注册时间'];
	option.colModel = [
        { name : 'username', index : 'username', editable : false},
        { name : 'name', index : 'name', editable : false },
        { name : 'company', index : 'company', editable : false},
        { name : 'siteName', index : 'siteName', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		if(rowObject.group != null){
        			return rowObject.group.siteName;
        		}
        		return "";
            }  	
        },
        { name : 'areaName', index : 'areaName', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		if(rowObject.group != null){
        			return rowObject.group.areaName;
        		}
                return "";
            }  		
        },
        { name : 'areaId', index : 'areaId',hidden:true},
        { name : 'telephone', index : 'telephone', editable : false},
        { name : 'email', index : 'email', editable : false},
        { name : 'enabled', index : 'enabled', editable : false},
        { name : 'role.name', index : 'role.name', editable : false},
        { name : 'autoApprove', index : 'autoApprove', editable : false},
        { name : 'registerDatetime', index : 'registerDatetime', editable : false}
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

function createGrid_event(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '告警值', '告警名', '告警等级','创建时间', '服务名','主机名', '所属集群', '创建者'];
	option.colModel = [
        { name : 'value', index : 'value', editable : false},
        { name : 'name', index : 'name', editable : false },
        { name : 'level', index : 'level', editable : false },
        { name : 'create_time', index : 'create_time', editable : false,
    	  formatter: function (cellvalue, options, rowObject) {debugger;
        	  return new Date(cellvalue).toLocaleString();
          }  
        },
        { name : 'serv_name', index : 'serv_name', editable : false},
        { name : 'host_name', index : 'host_name', editable : false},
        { name : 'cluster_name', index : 'cluster_name', editable : false},
        { name : 'owner', index : 'owner', editable : false}
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//新建任务列表
function createGrid_task(data){
	  $("#jqgrid").jqGrid({
        data : data,
        datatype : "local",
        height : 'auto',
        colNames : [ '所属者', '操作时间', '对象类型', '对象名称', '任务类型', '状态','回执信息','id'],
        colModel : [
            { name : 'owner', index : 'owner', editable : false },
            { name : 'time', index : 'time', editable : false },
            { name : 'type', index : 'type',  editable : false },
            { name : 'name', index : 'name', editable : false },
            { name : 'tasktype', index : 'tasktype', editable : false },
            { name : 'state', index : 'state',  editable : false },
            { name : 'return', index : 'return', editable : false },
            {name:"id",index:"id",hidden:true}
        ],

        //pager : '#pjqgrid',
        sortname : 'owner',
        toolbarfilter: true,
        viewrecords : true,
        sortorder : "asc",
        multiselect:false,//设置为false则无勾选框出现
        rownumbers: true,//设置序号
        hidegrid:false,
        editurl : "dummy.html",
        caption : "",
        autowidth : true,
        loadComplete: function () {  //隐藏滚动条
            $("#jqgrid").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
        },
        onSelectRow: function(id){
            var s;
            s = $("#jqgrid").jqGrid('getGridParam', 'selarrrow');
            if(s.length>1){
                for(var i=0;i<=s.length;i++){
                    if(s[i]!=id){
                        $("#jqgrid").jqGrid('setSelection', s[i]);
                    }
                }
            }
        },
        onSelectAll:function(rowids,statue) {
            $("#jqgrid").jqGrid('resetSelection');
        }

    });
    $("#jqgrid").jqGrid('navGrid', "#pjqgrid", {
        edit : false,
        add : false,
        del : true
    });
    $("#jqgrid").jqGrid('inlineNav', "#pjqgrid");
    /* Add tooltips */
    $('.navtable .ui-pg-button').tooltip({
        container : 'body'
    });

    // remove classes
    $(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
    $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
    $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
    $(".ui-jqgrid-pager").removeClass("ui-state-default");
    $(".ui-jqgrid").removeClass("ui-widget-content");

    // add classes
    $(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
    $(".ui-jqgrid-btable").addClass("table table-bordered table-striped");


    $(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
    $(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
    $(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
    $(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
    $(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
    $(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
    $(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
    $(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");

    $( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");

    $( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");

    $( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");

    $( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
    // update buttons

    $(window).on('resize.jqGrid', function () {
        $("#jqgrid").jqGrid( 'setGridWidth', $("#content").width() );
    });
}

//事件监控列表
function createGrid_monitor_info(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '事件名称', '事件等级', '事件值','实例名称','生成时间','用户名称','主机名称','集群名称'];
	option.colModel = [
      { name : 'name', index : 'name', editable : false },
      { name : 'level', index : 'level', editable : false, width:'180px' },
      { name : 'value', index : 'value', editable : false},
      { name : 'serv_name', index : 'serv_name', editable : false },
      { name : 'create_time', index : 'create_time', editable : false,
    	  formatter: function (cellvalue, options, rowObject) {
        	  return new Date(cellvalue).toLocaleString();
          }  
      },
      { name : 'owner', index : 'owner', editable : false },
      { name : 'host_name', index : 'host_name', editable : false },
      { name : 'cluster_name', index : 'cluster_name', editable : false }
  ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//redis服务列表
function createGrid_redis_a1(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames =  [ '站点名称','所属用户','业务系统','业务子系统','服务名称','部署架构','软件版本', '性能套餐','scaleNamePro','访问地址','状态','任务状态','管 理','softwareImageId','softwareImageIdUpproxy','softwareImageIdSwm','dateSize','networkBandwidth','networkBandwidthPro','id','taskId','createSuccessFlg'];
	option.colModel = [
		{ name : 'siteName', index : 'siteName', editable : false },
		{ name : 'ownerName', index : 'ownerName', editable : false },
		{ name : 'businessSystemName', index : 'businessSystemName', editable : false },
		{ name : 'businessSubSystemName', index : 'businessSubSystemName', editable : false },
        { name : 'servName', index : 'servName', editable : false },
        { name : 'archName', index : 'archName', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		var upredisCnt = 0;
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'upredis'){
        				upredisCnt++;
        				ret = v.archName;
        			}
        		});
        		if (rowObject.sharding == true) {
        			ret += "(" + upredisCnt + "分片)";
        		}
        		return ret;
            }
        },
        { name : 'softwareVersion', index : 'softwareVersion', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'upredis'){
        				ret = v.softwareVersion;
        			}
        		});
        		return ret;
            }
        },
        { name : 'scaleName', index : 'scaleName', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'upredis'){
        				ret = v.scaleName;
        			}
        		});
        		return ret;
            }
        },
        { name : 'scaleNamePro', index : 'scaleNamePro', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'urproxy'){
        				ret = v.scaleName;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'endPointIps', index : 'endPointIps', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'urproxy' && v.endPointIps != undefined){
        				$.each(v.endPointIps, function(i, endPointIp){
        					ret += endPointIp +":"+v.port+ "</br>";
            			});
        			}
        		});
        		return ret;
            }
        },
        { name : 'status', index : 'status', editable : false,
        	formatter: function (cellvalue, options, rowObject) {debugger;
        		if (cellvalue == 'passing'){ return "<span class=\"txt-color-green pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";}else
                if (cellvalue == 'warning'){ return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";}else
                if (cellvalue == 'critical'){ return "<span class=\"txt-color-red pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";}else
                if (cellvalue == 'unknown'){ return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";}else
                	{return "";}
        	}
        },
        { name : 'taskStatusText', index : 'taskStatusText', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var con = cellvalue != null?cellvalue:'';
                return "<a href=\"\" data-service-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#serviceModal\"><span class=\" pull-left\">"+con+"&nbsp;<i class=\"fa fa-lg fa-book\"></i></span></a>";
            },editable: false, align: "center"
        },
        { name : 'manageServ', index : 'manageServ', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		return "<a href=\"javascript:void(0);\" onclick=\"manageRedisOnRow('"+rowObject.id+"',"+rowObject.createSuccessFlg+")\"><i class=\"fa fa-cog fa-2\" style=\"font-size:18px;\"></i></a>";
            },editable: false ,align: "center"
        },
        { name : 'softwareImageId', index : 'softwareImageId', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'upredis'){
        				ret = v.softwareImageId;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'softwareImageIdUpproxy', index : 'softwareImageIdUpproxy', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'urproxy'){
        				ret = v.softwareImageId;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'softwareImageIdSwm', index : 'softwareImageIdSwm', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'sentinel'){
        				ret = v.softwareImageId;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'dateSize', index : 'dateSize', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'redis'){
        				ret = v.dateSize;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'networkBandwidth', index : 'networkBandwidth', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'upredis'){
        				if(v.networkBandwidth == 0){
        					ret = "无限制";
        				}else{
        					ret = v.networkBandwidth+"M";
        				}
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'networkBandwidthPro', index : 'networkBandwidthPro', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'urproxy'){
        				if(v.networkBandwidth == 0){
        					ret = "无限制";
        				}else{
        					ret = v.networkBandwidth+"M";
        				}
        			}
        		});
        		return ret;
            },hidden:true
        },
        {name:"id",index:"id",hidden:true},
        {name:"taskId",index:"taskId",hidden:true},
        {name:"createSuccessFlg",index:"createSuccessFlg",
        	formatter: function (cellvalue, options, rowObject) {
        		var createSuccessFlg = "no";
        		if(cellvalue){
        			createSuccessFlg = "yes";
        		}else{
        			createSuccessFlg = "no";
        		}
        		return createSuccessFlg;
        	},
        hidden:true}
    ];
	/*option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;*/
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}


//redis_new服务列表
function createGrid_redis_redis(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames =  [ '站点名称','所属用户','业务系统','业务子系统','服务名称','部署架构','软件版本', '性能套餐','scaleNamePro','状态','任务状态','管 理','softwareImageId','softwareImageIdUpproxy','softwareImageIdSwm','dateSize','networkBandwidth','networkBandwidthPro','id','taskId','createSuccessFlg'];
	option.colModel = [
		{ name : 'siteName', index : 'siteName', editable : false },
		{ name : 'ownerName', index : 'ownerName', editable : false },
		{ name : 'businessSystemName', index : 'businessSystemName', editable : false },
		{ name : 'businessSubSystemName', index : 'businessSubSystemName', editable : false },
        { name : 'servName', index : 'servName', editable : false },
        { name : 'archName', index : 'archName', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		var upredisCnt = 0;
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'redis'){
        				upredisCnt++;
        				ret = v.archName;
        			}
        		});
        		if (rowObject.sharding == true) {
        			ret += "(" + upredisCnt + "分片)";
        		}
        		return ret;
            }
        },
        { name : 'softwareVersion', index : 'softwareVersion', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'redis'){
        				ret = v.softwareVersion;
        			}
        		});
        		return ret;
            }
        },
        { name : 'scaleName', index : 'scaleName', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'redis'){
        				ret = v.scaleName;
        			}
        		});
        		return ret;
            }
        },
        { name : 'scaleNamePro', index : 'scaleNamePro', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'urproxy'){
        				ret = v.scaleName;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'status', index : 'status', editable : false,
        	formatter: function (cellvalue, options, rowObject) {debugger;
        		if (cellvalue == 'passing'){ return "<span class=\"txt-color-green pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";}else
                if (cellvalue == 'warning'){ return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";}else
                if (cellvalue == 'critical'){ return "<span class=\"txt-color-red pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";}else
                if (cellvalue == 'unknown'){ return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";}else
                	{return "";}
        	}
        },
        { name : 'taskStatusText', index : 'taskStatusText', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var con = cellvalue != null?cellvalue:'';
                return "<a href=\"\" data-service-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#serviceModal\"><span class=\" pull-left\">"+con+"&nbsp;<i class=\"fa fa-lg fa-book\"></i></span></a>";
            },editable: false, align: "center"
        },
        { name : 'manageServ', index : 'manageServ', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		return "<a href=\"javascript:void(0);\" onclick=\"manageRedisOnRow('"+rowObject.id+"',"+rowObject.createSuccessFlg+")\"><i class=\"fa fa-cog fa-2\" style=\"font-size:18px;\"></i></a>";
            },editable: false ,align: "center"
        },
        { name : 'softwareImageId', index : 'softwareImageId', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'redis'){
        				ret = v.softwareImageId;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'softwareImageIdUpproxy', index : 'softwareImageIdUpproxy', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'urproxy'){
        				ret = v.softwareImageId;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'softwareImageIdSwm', index : 'softwareImageIdSwm', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'sentinel'){
        				ret = v.softwareImageId;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'dateSize', index : 'dateSize', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'redis'){
        				ret = v.dateSize;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'networkBandwidth', index : 'networkBandwidth', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'redis'){
        				if(v.networkBandwidth == 0){
        					ret = "无限制";
        				}else{
        					ret = v.networkBandwidth+"M";
        				}
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'networkBandwidthPro', index : 'networkBandwidthPro', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'urproxy'){
        				if(v.networkBandwidth == 0){
        					ret = "无限制";
        				}else{
        					ret = v.networkBandwidth+"M";
        				}
        			}
        		});
        		return ret;
            },hidden:true
        },
        {name:"id",index:"id",hidden:true},
        {name:"taskId",index:"taskId",hidden:true},
        {name:"createSuccessFlg",index:"createSuccessFlg",
        	formatter: function (cellvalue, options, rowObject) {
        		var createSuccessFlg = "no";
        		if(cellvalue){
        			createSuccessFlg = "yes";
        		}else{
        			createSuccessFlg = "no";
        		}
        		return createSuccessFlg;
        	},
        hidden:true}
    ];
	/*option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;*/
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}


//事件监控列表
function reloadUserGrid(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '事件名称', '事件等级', '事件值','实例名称','生成时间','用户名称','主机名称','集群名称'];
	option.colModel = [
      { name : 'name', index : 'name', editable : false },
      { name : 'level', index : 'level', editable : false, width:'180px' },
      { name : 'value', index : 'value', editable : false},
      { name : 'serv_name', index : 'serv_name', editable : false },
      { name : 'create_time', index : 'create_time', editable : false,
    	  formatter: function (cellvalue, options, rowObject) {
        	  return new Date(cellvalue).toLocaleString();
          }  
      },
      { name : 'owner', index : 'owner', editable : false },
      { name : 'host_name', index : 'host_name', editable : false },
      { name : 'cluster_name', index : 'cluster_name', editable : false }
  ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//组别管理
function createGrid_group(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '组别名称', '区域', '描述','areaId','id'];
	option.colModel = [
      { name : 'name', index : 'name', editable : false },
      { name : 'areaName', index : 'areaName', editable : false, width:'180px' },
      { name : 'description', index : 'description', editable : false},
      {name:"areaId",index:"areaId",hidden:true},
      {name:"id",index:"id",hidden:true}
  ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//系统列表
function createGrid_business_systems(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '业务系统名称', '创建时间', '所属者', '描述','id'];
	option.colModel = [
      { name : 'name', index : 'name', editable : false },
      { name : 'createDateTime', index : 'createDateTime', editable : false, width:'180px' },
      { name : 'owner', index : 'owner', editable : false},
      { name : 'description', index : 'description', editable : false},
      {name:"id",index:"id",hidden:true}
  ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//子系统列表
function createGrid_business_subsystems(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '业务系统名称','子系统名称', '创建时间', '所属者','描述', 'businessSystemId','id'];
	option.colModel = [
	  { name : 'businessSystem.name', index : 'businessSystem.name', editable : false },
      { name : 'name', index : 'name', editable : false },
      { name : 'createDateTime', index : 'createDateTime', editable : false, width:'180px' },
      { name : 'businessSystem.owner', index : 'businessSystem.owner', editable : false},
      { name : 'description', index : 'description', editable : false},
      {name:"id",index:"id",hidden:true},
      {name:"businessSystem.id",index:"businessSystem.id",hidden:true}
  ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}


//服务管理用户管理信息列表
function create_User_Grid(data){
	var option = {};
	var jqGrid_user_template = {
			datatype : "local",
			height : 'auto',
			sortname : 'username',
			sortorder : "asc",
			multiselect:true,
			autowidth : true,
			pager : '#pjqgridUser',
			hidegrid: false,
			rowNum: 20,
	        rowList: [10, 20, 30],
	        viewrecords: true
	}
	$.extend(true, option, jqGrid_user_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '用户名','模式','认证方式','白名单', '黑名单','数据库权限'];
	option.colModel = [
	  { name : 'username', index : 'username', editable : false },
      { name : 'modelText', index : 'modelText', editable : false },
      { name : 'authType', index : 'authType', editable : false },
      { name : 'whiteIps', index : 'whiteIps', editable : false },
      { name : 'blackIps', index : 'blackIps', editable : false},
      { name : 'dbPrivileges', index : 'dbPrivileges', editable : false,
    	  formatter: function (cellvalue, options, rowObject) {
    		if(cellvalue.length == 0){
      			return "";
      		} else {
      			var ret = "";
      			$.each(cellvalue, function(k, v){
      				ret += "库名:"+k+"&nbsp;&nbsp;权限:"+v+"<br/>";
      			});
      			return ret;
      		}
          } 
      }
  ];
	option.onSelectRow = function(id){
	    var s;
	    s = $("#jqgridUser").jqGrid('getGridParam', 'selarrrow');
	    if(s.length>1){
	        for(var i=0;i<=s.length;i++){
	            if(s[i]!=id){
	                $("#jqgridUser").jqGrid('setSelection', s[i]);
	            }
	        }
	    }
	};
	option.onSelectAll = function(rowids, statue) {
	    $("#jqgridUser").jqGrid('resetSelection');
	};
	option.loadComplete = function(){
		$("#jqgridUser").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
	};
	
	$("#jqgridUser").jqGrid(option);
	
	$("#jqgridUser").navGrid('#pjqgridUser',
			{add:false, edit:false, view:false, del:false, refresh:false, search:true}, 
			{}, // use default settings for edit
			{}, // use default settings for add
			{},  // delete instead that del:false we need this
			{multipleSearch : true}, // enable the advanced searching
			{closeOnEscape:true} /* allow the view dialog to be closed when user press ESC key*/
		);
	
	// remove classes
    $(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
    $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
    $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
    $(".ui-jqgrid-pager").removeClass("ui-state-default");
    $(".ui-jqgrid").removeClass("ui-widget-content");

    // add classes
    $(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
    $(".ui-jqgrid-btable").addClass("table table-bordered table-striped");


    $(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
    $(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
    $(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
    $(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
    $(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
    $(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
    $(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
    $(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");

    $( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");

    $( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");

    $( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");

    $( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
    

    $(window).on('resize.jqGrid', function () {
        $("#jqgridUser").jqGrid( 'setGridWidth', $("#content").width() );
    })    
}


//服务管理直连用户信息列表
function create_UserDirect_Grid(data){
	var option = {};
	var jqGrid_user_template = {
			datatype : "local",
			height : 'auto',
			sortname : 'name',
			sortorder : "asc",
			multiselect:true,
			autowidth : true,
			pager : '#pjqgridUserDirect',
			hidegrid: false,
			rowNum: 20,
	        rowList: [10, 20, 30],
	        viewrecords: true
	}
	$.extend(true, option, jqGrid_user_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '用户名','白名单', '数据库名', '数据库权限'];
	option.colModel = [
	  { name : 'username', index : 'username', editable : false },
	  { name : 'ips', index : 'ips', editable : false },
      { name : 'databaseName', index : 'databaseName', editable : false },
      { name : 'privileges', index : 'privileges', editable : false}
  ];
	option.onSelectRow = function(id){
	    var s;
	    s = $("#jqgridUserDirect").jqGrid('getGridParam', 'selarrrow');
	    if(s.length>1){
	        for(var i=0;i<=s.length;i++){
	            if(s[i]!=id){
	                $("#jqgridUserDirect").jqGrid('setSelection', s[i]);
	            }
	        }
	    }
	};
	option.onSelectAll = function(rowids, statue) {
	    $("#jqgridUserDirect").jqGrid('resetSelection');
	};
	option.loadComplete = function(){
		$("#jqgridUserDirect").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
	};
	
	$("#jqgridUserDirect").jqGrid(option);
	
	$("#jqgridUserDirect").navGrid('#pjqgridUserDirect',
			{add:false, edit:false, view:false, del:false, refresh:false, search:true}, 
			{}, // use default settings for edit
			{}, // use default settings for add
			{},  // delete instead that del:false we need this
			{multipleSearch : true}, // enable the advanced searching
			{closeOnEscape:true} /* allow the view dialog to be closed when user press ESC key*/
		);
	
	// remove classes
    $(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
    $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
    $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
    $(".ui-jqgrid-pager").removeClass("ui-state-default");
    $(".ui-jqgrid").removeClass("ui-widget-content");

    // add classes
    $(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
    $(".ui-jqgrid-btable").addClass("table table-bordered table-striped");


    $(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
    $(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
    $(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
    $(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
    $(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
    $(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
    $(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
    $(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");

    $( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");

    $( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");

    $( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");

    $( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
    $(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
    

    $(window).on('resize.jqGrid', function () {
        $("#jqgridUserDirect").jqGrid( 'setGridWidth', $("#content").width() );
    })    
}


//redis服务管理列表
function createGrid_redis(data){
	var option = {};
	var colornum = '';
	var dataArray=new Array();
	var masterNum = 0;
	var masterIp = '';
	var typeUpredis = 'error';
	for(var i=0;i<data['data']['subServs'].length;i++){
		(i%2 ==0) ?colornum = "333333":colornum = "000000";
		
		if(data['data']['subServs'][i]['type'] == 'upredis'){
			for(var k=0;k<data['data']['subServs'][i]['units'].length;k++){
				if(data['data']['subServs'][i]['units'][k]['role'] == "master"){
					masterIp = data['data']['subServs'][i]['units'][k]['serverIp'];
					masterNum ++;
				};
			}
		}
		
		if(data['data']['subServs'][i]['type'] == 'upredis'){
			if(masterNum == 1){
				typeUpredis = 'success';
			}
			for(var k=0;k<data['data']['subServs'][i]['units'].length;k++){
				if(data['data']['subServs'][i]['units'][k]['role'] == "slave"){
					if(masterIp == data['data']['subServs'][i]['units'][k]['replicationMasterIp'] && masterNum == 1){
						typeUpredis = 'success';
					}else{
						typeUpredis = 'error';
					}
				};
				if(data['data']['subServs'][i]['units'][k]['role'] == null || data['data']['subServs'][i]['units'][k]['role'] == 'unknown'){
						typeUpredis = 'unknown';
				};
			}
		}
		
		if(data['data']['subServs'][i]['type'] == 'upredis'){
			for(var k=0;k<data['data']['subServs'][i]['units'].length;k++){
				data['data']['subServs'][i]['units'][k]['fontcolor'] = colornum;
				data['data']['subServs'][i]['units'][k]['typeUpredis'] = typeUpredis;
				data['data']['subServs'][i]['units'][k]['subServsId'] = data['data']['subServs'][i]['id'];
				dataArray.push(data['data']['subServs'][i]['units'][k]);
			}
			masterNum = 0;
			masterIp = '';
		}
	}
	var jqGrid_template_test = {
			datatype : "local",
			height : 'auto',
			sortname : 'name',
			sortorder : "asc",
			multiselect:true,
			autowidth : true,
			pager : '#pjqgrid',
			hidegrid: false,
			rowNum: 30,
	        rowList: [10, 20, 30],
	        emptyrecords: "Nothing to display",
	        viewrecords: true
	}
	$.extend(true, option, jqGrid_template_test);
	option.caption = "";
	option.data = dataArray;
	option.colNames = ['实例单元名称', '所属集群','clusterId', '所属主机', '所属主机IP', '服务地址', '服务端口','版本号','CPU数量','内存容量','角色','容器状态', '运行状态','分片复制状态','任务详情','subServsId', 'id','taskId'];
	option.colModel = [
        {name: 'relateName', index: 'relateName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            },width:'200px'
        },
        {name: 'clusterName', index: 'clusterName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'clusterId', index: 'clusterId', editable: false,hidden:true},
        {name: 'hostName', index: 'hostName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'hostIp', index: 'hostIp', editable: false},
        {name: 'serverIp', index: 'serverIp', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'portValue', index: 'portValue', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'softwareVersion', index: 'softwareVersion',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'cpuCount', index: 'cpuCount',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'memSize', index: 'memSize',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+BytesToGB(cellvalue)+"G</div>";
            }
        },
        {name: 'role', index: 'role', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'containerStatus', index: 'containerStatus', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'status', index: 'status',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
        		if (cellvalue == 'passing') return "<span class=\"txt-color-green pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";
                if (cellvalue == 'warning') return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";
                if (cellvalue == 'critical') return "<span class=\"txt-color-red pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";
                if (cellvalue == 'unknown') return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";
            }
        },
        {name:"testRow",index:"testRow",align:"center",
        	formatter: function (cellvalue, options, rowObject) {
        		if(rowObject.typeUpredis == "success"){
        			return '<span class=\"txt-color-green pull-left\" id=\"'+rowObject.subServsId+'\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>';
        		}else if(rowObject.typeUpredis == "unknown"){
        			return '<span class=\"txt-color-blue pull-left\" id=\"'+rowObject.subServsId+'\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>';
        		}else{
        			return '<span class=\"txt-color-red pull-left\" id=\"'+rowObject.subServsId+'\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>';
        		}
            },
            cellattr: function (rowId, tv, rawObject, cm, rdata) {
                //合并单元格
            		return 'id=\'testRow' + rowId + "\'";
            }
        },
        {
            name: 'taskStatusText', editable: false,
            formatter: function (cellvalue, options, rowObject) {
            	var con = cellvalue != null?cellvalue:'';
                return "<a href=\"\" data-upsql-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#taskModal\"><span class=\" pull-left\">"+con+"&nbsp;<i class=\"fa fa-lg fa-book\"></i></span></a>";
            }
        },
        {name:"subServsId",index:"subServsId",hidden:true},
        {name:"id",index:"id",hidden:true},
        {name:"taskId",index:"taskId",hidden:true}
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete =  function (resultData) {
		$("#jqgrid").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
		for (var i = 0; i < resultData.rows.length; i++) {
	        var $tr = $('tr#' + resultData.rows[i].id);
	        if(resultData.rows[i]['fontcolor'] == "000000"){
	    		$tr.css("background-color", "#fdfae6");
	    	}else{
	    		$tr.css("background-color", "#ffffff");
	    	}
	    }
		MergerStatistics("jqgrid", 'testRow');
	};
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//合并单元格
function MergerStatistics(gridName, CellName) {
    //得到显示到界面的id集合
    var mya = $("#" + gridName + "").getDataIDs();
    //当前显示多少条
    var length = mya.length;
    for (var i = 0; i < length; i++) {
        //从上到下获取一条信息
        var before = $("#" + gridName + "").jqGrid('getRowData', mya[i]);
        //定义合并行数
        var rowSpanTaxCount = 1;
        for (j = i + 1; j <= length; j++) {
            //和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏
            var end = $("#" + gridName + "").jqGrid('getRowData', mya[j]);
            var cellNames = CellName.split(",");
            for (var n = 0; n < cellNames.length; n++) {
                if (before[cellNames[0]] == end[cellNames[0]] ) {
                    rowSpanTaxCount++;
                    $("#" + gridName + "").setCell(mya[j], cellNames[0], '', { display: 'none' });
                } else {
                    rowSpanTaxCount = 1;
                    break;
                }
                $("#" + cellNames[0] + "" + mya[i] + "").attr("rowspan", rowSpanTaxCount);//最后合并需要合并的行与合并的行数
            }
        }
    }
}

//redis_urproxy服务管理列表
function createGrid_redis_urproxy(data){
	var option = {};
	var colornum = '';
	var dataArray=new Array();
	for(var i=0;i<data['data'].length;i++){
		(i%2 ==0) ?colornum = "333333":colornum = "000000";
		for(var k=0;k<data['data'][i]['units'].length;k++){
			data['data'][i]['units'][k]['fontcolor'] = colornum;
			data['data'][i]['units'][k]['subServsId'] = data['data'][i]['id'];
			dataArray.push(data['data'][i]['units'][k]);
		}
	}
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = dataArray;
	option.colNames = ['实例单元名称', '所属集群','clusterId', '所属主机', '所属主机IP', '服务地址', '服务端口','版本号','CPU数量','内存容量','容器状态', '运行状态','任务详情','subServsId', 'id'];
	option.colModel = [
        {name: 'relateName', index: 'relateName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            },width:'200px'
        },
        {name: 'clusterName', index: 'clusterName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'clusterId', index: 'clusterId', editable: false,hidden:true},
        {name: 'hostName', index: 'hostName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'hostIp', index: 'hostIp', editable: false},
        {name: 'serverIp', index: 'serverIp', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'portValue', index: 'portValue', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'softwareVersion', index: 'softwareVersion',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'cpuCount', index: 'cpuCount',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'memSize', index: 'memSize',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+BytesToGB(cellvalue)+"G</div>";
            }
        },
        {name: 'containerStatus', index: 'containerStatus', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'status', index: 'status',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
        		if (cellvalue == 'passing') return "<span class=\"txt-color-green pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";
                if (cellvalue == 'warning') return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";
                if (cellvalue == 'critical') return "<span class=\"txt-color-red pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";
                if (cellvalue == 'unknown') return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";
            }
        },
        {
            name: 'taskStatusText', editable: false,
            formatter: function (cellvalue, options, rowObject) {
            	var con = cellvalue != null?cellvalue:'';
                return "<a href=\"\" data-upsql-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#taskModal\"><span class=\" pull-left\">"+con+"&nbsp;<i class=\"fa fa-lg fa-book\"></i></span></a>";
            }
        },
        {name:"subServsId",index:"subServsId",hidden:true},
        {name:"id",index:"id",hidden:true}
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete =  function (resultData) {
		$("#jqgrid").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
		for (var i = 0; i < resultData.rows.length; i++) {
	        var $tr = $('tr#' + resultData.rows[i].id);
	        if(resultData.rows[i]['fontcolor'] == "000000"){
	    		$tr.css("background-color", "#fdfae6");
	    	}else{
	    		$tr.css("background-color", "#ffffff");
	    	}
	    }   
	};
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}


//redis_sentinel服务管理列表
function createGrid_redis_sentinel(data){
	var option = {};
	var colornum = '';
	var dataArray=new Array();
	for(var i=0;i<data['data'].length;i++){
		(i%2 ==0) ?colornum = "333333":colornum = "000000";
		for(var k=0;k<data['data'][i]['units'].length;k++){
			data['data'][i]['units'][k]['fontcolor'] = colornum;
			data['data'][i]['units'][k]['subServsId'] = data['data'][i]['id'];
			dataArray.push(data['data'][i]['units'][k]);
		}
	}
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = dataArray;
	option.colNames = ['实例单元名称', '所属集群','clusterId', '所属主机', '所属主机IP', '服务地址', '服务端口','版本号','CPU数量','内存容量','容器状态', '运行状态','任务详情','subServsId', 'id'];
	option.colModel = [
        {name: 'relateName', index: 'relateName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            },width:'200px'
        },
        {name: 'clusterName', index: 'clusterName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'clusterId', index: 'clusterId', editable: false,hidden:true},
        {name: 'hostName', index: 'hostName', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'hostIp', index: 'hostIp', editable: false},
        {name: 'serverIp', index: 'serverIp', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'portValue', index: 'portValue', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'softwareVersion', index: 'softwareVersion',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'cpuCount', index: 'cpuCount',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'memSize', index: 'memSize',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+BytesToGB(cellvalue)+"G</div>";
            }
        },
        {name: 'containerStatus', index: 'containerStatus', editable: false,
        	formatter: function (cellvalue, options, rowObject) {
                return "<div style = 'white-space: nowrap;color:#"+rowObject.fontcolor+"'>"+cellvalue+"</div>";
            }
        },
        {name: 'status', index: 'status',  editable: false,
        	formatter: function (cellvalue, options, rowObject) {
        		if (cellvalue == 'passing') return "<span class=\"txt-color-green pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";
                if (cellvalue == 'warning') return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";
                if (cellvalue == 'critical') return "<span class=\"txt-color-red pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";
                if (cellvalue == 'unknown') return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 15px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";
            }
        },
        {
            name: 'taskStatusText', editable: false,
            formatter: function (cellvalue, options, rowObject) {
            	var con = cellvalue != null?cellvalue:'';
                return "<a href=\"\" data-upsql-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#taskModal\"><span class=\" pull-left\">"+con+"&nbsp;<i class=\"fa fa-lg fa-book\"></i></span></a>";
            }
        },
        {name:"subServsId",index:"subServsId",hidden:true},
        {name:"id",index:"id",hidden:true}
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = function (resultData) {
		$("#jqgrid").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
		for (var i = 0; i < resultData.rows.length; i++) {
	        var $tr = $('tr#' + resultData.rows[i].id);
	        if(resultData.rows[i]['fontcolor'] == "000000"){
	    		$tr.css("background-color", "#fdfae6");
	    	}else{
	    		$tr.css("background-color", "#ffffff");
	    	}
	    }   
	};
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}


//mysql服务
function createGrid_mysql_list(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames =  [ '站点名称','所属用户','业务系统','业务子系统','服务名称','部署架构','软件版本', '性能套餐','访问地址','服务状态','任务状态','softwareImageId','dateSize','networkBandwidth','id'];
	option.colModel = [
		{ name : 'siteName', index : 'siteName', editable : false },
		{ name : 'owner', index : 'owner', editable : false },
		{ name : 'businessSystemName', index : 'businessSystemName', editable : false },
		{ name : 'businessSubSystemName', index : 'businessSubSystemName', editable : false },
        { name : 'servName', index : 'servName', editable : false },
        { name : 'archName', index : 'archName', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				ret = v.archName;
        			}
        		});
        		return ret;
            }
        },
        { name : 'softwareVersion', index : 'softwareVersion', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				ret = v.softwareVersion;
        			}
        		});
        		return ret;
            }
        },
        { name : 'scaleName', index : 'scaleName', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				ret = v.scaleName;
        			}
        		});
        		return ret;
            }
        },
        { name : 'endPointIps', index : 'endPointIps', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql' && v.endPointIps != undefined){
        				$.each(v.endPointIps, function(i, endPointIp){
        					ret += endPointIp +":"+v.port+ "</br>";
            			});
        			}
        		});
        		return ret;
            }
        },
        { name : 'availableStatus', index : 'availableStatus', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		if (cellvalue == 'passing'){ return "<span class=\"txt-color-green pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-check-circle\"></i></span>";}else
                if (cellvalue == 'warning'){ return "<span class=\"txt-color-yellow pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-exclamation-circle\"></i></span>";}else
                if (cellvalue == 'critical'){ return "<span class=\"txt-color-red pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-times-circle\"></i></span>";}else
                if (cellvalue == 'unknown'){ return "<span class=\"txt-color-blue pull-left\" style=\"font-size: 16px;margin-left: 40%;\"><i class=\"fa fa-lg fa-question-circle\"></i></span>";}else
                	{return "";}
        	}
        },
        { name : 'taskStatusText', index : 'taskStatusText', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var con = cellvalue != null?cellvalue:'';
                return "<a href=\"\" data-service-id='"+rowObject.id+"'\" data-toggle=\"modal\" data-target=\"#serviceModal\"><span class=\" pull-left\">"+con+"&nbsp;<i class=\"fa fa-lg fa-book\"></i></span></a>";
            },editable: false, align: "center"
        },
        { name : 'softwareImageId', index : 'softwareImageId', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				ret = v.softwareImageId;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'dateSize', index : 'dateSize', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				ret = v.dateSize;
        			}
        		});
        		return ret;
            },hidden:true
        },
        { name : 'networkBandwidth', index : 'networkBandwidth', editable : false,
        	formatter: function (cellvalue, options, rowObject) {
        		var ret = "";
        		$.each(rowObject.subServs, function(k, v){
        			if(v.type == 'mysql'){
        				if(v.networkBandwidth == 0){
        					ret = "无限制";
        				}else{
        					ret = v.networkBandwidth+"M";
        				}
        			}
        		});
        		return ret;
            },hidden:true
        },
        {name:"id",index:"id",hidden:true}
    ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}




//慢日志列表
function createGrid_slowlog(data){
	
	$("#size").text("size : "+data['data']['size']);
	$("#querySum").text("querySum : "+data['data']['querySum']);
	$("#uniqueQuerySum").text("uniqueQuerySum : "+data['data']['uniqueQuerySum']);
	
        var option = {};
        var jqGrid_user_template = {
				datatype : "local",
				height : 'auto',
				sortname : 'name',
				sortorder : "asc",
				multiselect:true,
				shrinkToFit : false,
				pager : '#pjqgridslowlog',
				hidegrid: false,
				rowNum: 20,
		        rowList: [10, 20, 30],
		        viewrecords: true
		}
		$.extend(true, option, jqGrid_user_template);
		option.caption = "";
		option.data = data['data']['slowLogDetails'];
		option.colNames = [ 'checkSum', 'total', 'avg', 'max', 'min', 'count','querySql','databse','host','user','lastSceen','firstSceen'];
		option.colModel = [
            { name : 'checkSum', index : 'checkSum', editable : false,width:100 },
            { name : 'total', index : 'total', editable : false,width:50 },
            { name : 'avg', index : 'avg',  editable : false,width:50 },
            { name : 'max', index : 'max', editable : false,width:50 },
            { name : 'min', index : 'min', editable : false,width:50 },
            { name : 'count', index : 'count',  editable : false,width:50 },
            { name : 'querySql', index : 'querySql', editable : false ,width:125},
            { name : 'databse', index : 'databse', editable : false,width:100 },
            { name : 'host', index : 'host', editable : false,width:100 },
            { name : 'user', index : 'user', editable : false,width:100},
            { name : 'lastSceen', index : 'lastSceen', editable : false ,width:100},
            { name : 'firstSceen', index : 'firstSceen', editable : false ,width:100}
        ];
		option.onSelectRow = function(id){
		    var s;
		    s = $("#jqgridslowlog").jqGrid('getGridParam', 'selarrrow');
		    if(s.length>1){
		        for(var i=0;i<=s.length;i++){
		            if(s[i]!=id){
		                $("#jqgridslowlog").jqGrid('setSelection', s[i]);
		            }
		        }
		    }
		};
		option.onSelectAll = function(rowids, statue) {
		    $("#jqgridslowlog").jqGrid('resetSelection');
		};
		option.loadComplete = function(){
			$("#jqgridslowlog").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
		};
		
		$("#jqgridslowlog").jqGrid(option);
		
		$("#jqgridslowlog").navGrid('#pjqgridslowlog',
				{add:false, edit:false, view:false, del:false, refresh:false, search:true}, 
				{}, // use default settings for edit
				{}, // use default settings for add
				{},  // delete instead that del:false we need this
				{multipleSearch : true}, // enable the advanced searching
				{closeOnEscape:true} /* allow the view dialog to be closed when user press ESC key*/
			);
		
		// remove classes
		$(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
		$(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
		$(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
		$(".ui-jqgrid-pager").removeClass("ui-state-default");
		$(".ui-jqgrid").removeClass("ui-widget-content");
		
		// add classes
		$(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
		$(".ui-jqgrid-btable").addClass("table table-bordered table-striped");
		
		
		$(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
		$(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
		$(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
		$(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
		$(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
		$(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
		$(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
		$(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");
		
		$( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");
		
		$( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");
		
		$( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");
		
		$( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
		
		
		$(window).on('resize.jqGrid', function () {
		    $("#jqgridslowlog").jqGrid( 'setGridWidth', 975 );
		})    

}

//操作日志
function createGrid_opelatelog(data){
	var option = {};
	$.extend(true, option, jqGrid_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '操作模块','操作','操作对象', '操作人', '操作时间'];
	option.colModel = [
	  { name : 'model', index : 'model', editable : false },
      { name : 'action', index : 'action', editable : false },
      { name : 'obj_name', index : 'obj_name', editable : false },
      { name : 'user', index : 'user', editable : false, width:'180px' },
      { name : 'create_time', index : 'create_time', editable : false},
  ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}


//还原备份文件列表
function createGrid_restore(data){
        var option = {};
		var jqGrid_user_template = {
				datatype : "local",
				height : 'auto',
				sortname : 'name',
				sortorder : "asc",
				multiselect:true,
				shrinkToFit : false,
				pager : '#pjqgridrestore',
				hidegrid: false,
				rowNum: 15,
		        rowList: [10, 20, 30],
		        viewrecords: true
		}
		$.extend(true, option, jqGrid_user_template);
		option.caption = "";
		option.data = data['data'];
		option.colNames = [ '名称', '所属者', '类型', '创建时间', '过期时间', '备份文件大小','备注','耗时','id'];
		option.colModel = [
            { name : 'name', index : 'name', editable : false,width:200},
            { name : 'owner', index : 'owner', editable : false,width:100},
            { name : 'backupType', index : 'backupType',  editable : false,width:100 },
            { name : 'createDateTime', index : 'createDateTime', editable : false,width:100 },
            { name : 'expire', index : 'expire', editable : false,width:100 },
            { name : 'size', index : 'size', editable : false,
            	formatter: function (cellvalue, options, rowObject) {
            		return BytesToGB(cellvalue)+"GB";
                },width:100
            },
            { name : 'remark', index : 'remark',  editable : false,width:175 },
            { name : 'uptime', index : 'uptime', editable : false,
            	formatter: function (cellvalue, options, rowObject) {
            		return Math.round(cellvalue/1000/60)+"分钟";
                },width:100
            },
            { name : 'id', index : 'id',hidden:true }
        ];
		option.onSelectRow = function(id){
		    var s;
		    s = $("#jqgridrestore").jqGrid('getGridParam', 'selarrrow');
		    if(s.length>1){
		        for(var i=0;i<=s.length;i++){
		            if(s[i]!=id){
		                $("#jqgridrestore").jqGrid('setSelection', s[i]);
		            }
		        }
		    }
		};
		option.onSelectAll = function(rowids, statue) {
		    $("#jqgridrestore").jqGrid('resetSelection');
		};
		option.loadComplete = function(){
			$("#jqgridrestore").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
		};
		
		$("#jqgridrestore").jqGrid(option);
		
		$("#jqgridrestore").navGrid('#pjqgridrestore',
				{add:false, edit:false, view:false, del:false, refresh:false, search:true}, 
				{}, // use default settings for edit
				{}, // use default settings for add
				{},  // delete instead that del:false we need this
				{multipleSearch : true}, // enable the advanced searching
				{closeOnEscape:true} /* allow the view dialog to be closed when user press ESC key*/
			);
		
		// remove classes
		$(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
		$(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
		$(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
		$(".ui-jqgrid-pager").removeClass("ui-state-default");
		$(".ui-jqgrid").removeClass("ui-widget-content");
		
		// add classes
		$(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
		$(".ui-jqgrid-btable").addClass("table table-bordered table-striped");
		
		
		$(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
		$(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
		$(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
		$(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
		$(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
		$(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
		$(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
		$(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");
		
		$( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");
		
		$( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");
		
		$( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");
		
		$( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
		
		
		$(window).on('resize.jqGrid', function () {
		    $("#jqgridrestore").jqGrid( 'setGridWidth', 975 );
		})    

}


//复制监控列表
function monitorReplicationStatusGrid(data){
        var option = {};
        var dataArray=new Array();
    	for(var i=0;i<data['data'].length;i++){
    		for(var k=0;k<data['data'][i].length;k++){
    			dataArray.push(data['data'][i][k]);
    		}
    	}
		var jqGrid_user_template = {
				datatype : "local",
				height : 'auto',
				sortname : 'name',
				sortorder : "asc",
				multiselect:false,
				autowidth : true,
				pager : '#pjqgridRelationMonitor',
				hidegrid: false,
				rowNum: 10,
		        rowList: [10, 20, 30],
		        viewrecords: true
		}
		$.extend(true, option, jqGrid_user_template);
		option.caption = "";
		option.data = dataArray;
		option.colNames = [ '实例单元', 'master IP', '端口号', 'slave_sql状态', 'slave_io状态', '延迟','读写模式','服务id','备库文件名','备库位置','主库文件名','主库位置'];
		option.colModel = [
            { name : 'relate_name', index : 'relate_name', editable : false},
            { name : 'replication_master_host', index : 'replication_master_host', editable : false},
            { name : 'replication_master_port', index : 'replication_master_port', editable : false},
            { name : 'replication_slave_sql_running', index : 'replication_slave_sql_running', editable : false},
            { name : 'replication_slave_io_running', index : 'replication_slave_io_running', editable : false},
            { name : 'replication_seconds_behind_master', index : 'replication_seconds_behind_master', editable : false},
            { name : 'replication_read_write_mode', index : 'replication_read_write_mode', editable : false},
            { name : 'replication_master_server_id', index : 'replication_master_server_id', editable : false},
            { name : 'replication_slave_binlog_filename', index : 'replication_slave_binlog_filename', editable : false},
            { name : 'replication_slave_binlog_pos', index : 'replication_slave_binlog_pos', editable : false},
            { name : 'replication_master_binlog_filename', index : 'replication_master_binlog_filename', editable : false},
            { name : 'replication_master_binlog_pos', index : 'replication_master_binlog_pos', editable : false}
        ];
		option.onSelectRow = function(id){
		    var s;
		    s = $("#jqgridRelationMonitor").jqGrid('getGridParam', 'selarrrow');
		    if(s.length>1){
		        for(var i=0;i<=s.length;i++){
		            if(s[i]!=id){
		                $("#jqgridRelationMonitor").jqGrid('setSelection', s[i]);
		            }
		        }
		    }
		};
		option.onSelectAll = function(rowids, statue) {
		    $("#jqgridRelationMonitor").jqGrid('resetSelection');
		};
		option.loadComplete = function(){
			$("#jqgridRelationMonitor").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
		};
		
		$("#jqgridRelationMonitor").jqGrid(option);
		
		$("#jqgridRelationMonitor").navGrid('#pjqgridRelationMonitor',
				{add:false, edit:false, view:false, del:false, refresh:false, search:true}, 
				{}, // use default settings for edit
				{}, // use default settings for add
				{},  // delete instead that del:false we need this
				{multipleSearch : true}, // enable the advanced searching
				{closeOnEscape:true} /* allow the view dialog to be closed when user press ESC key*/
			);
		
		// remove classes
		$(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
		$(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
		$(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
		$(".ui-jqgrid-pager").removeClass("ui-state-default");
		$(".ui-jqgrid").removeClass("ui-widget-content");
		
		// add classes
		$(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
		$(".ui-jqgrid-btable").addClass("table table-bordered table-striped");
		
		
		$(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
		$(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
		$(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
		$(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
		$(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
		$(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
		$(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
		$(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");
		
		$( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");
		
		$( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");
		
		$( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");
		
		$( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
		
		
		$(window).on('resize.jqGrid', function () {
		    $("#jqgridRelationMonitor").jqGrid( 'setGridWidth', $("#content").width() );
		})    

}


//字典父类列表
function createGrid_dicts(data){
	var option = {};
	var jqGrid_dicts_template = {
			datatype : "local",
			height : 'auto',
			sortname : 'name',
			sortorder : "asc",
			multiselect:false,
			autowidth : true,
			pager : '#pjqgrid',
			hidegrid: false,
			rowNum: 10,
	        rowList: [10, 20, 30],
	        viewrecords: true
	}
	$.extend(true, option, jqGrid_dicts_template);
	option.caption = "";
	option.data = data['data'];
	option.colNames = [ '类型代码','类型名称', '类型配置'];
	option.colModel = [
	  { name : 'code', index : 'code',align : "center", editable : false },
      { name : 'name', index : 'name',align : "center", editable : false },
      { name : 'setting', index : 'setting',align : "center", editable : false,
    	  formatter: function (cellvalue, options, rowObject) {
              return "<a href='javascript:void(0)' onclick=\"setDict('"+rowObject.code+"')\"><span class='pull-left' style='margin-left: 48%;'>&nbsp;<i class='fa fa-lg fa-cog'></i></span></a>";
          }  
      }
  ];
	option.onSelectRow = jqGrid_OnSelectRow;
	option.onSelectAll = jqGrid_OnSelectAll;
	option.loadComplete = jqGrid_LoadComplete;
	
	$("#jqgrid").jqGrid(option);
	
	jqGrid_ResetClass();
}

//字典子类型列表
function createGrid_dict_type(data){
        var option = {};
		var jqGrid_user_template = {
				datatype : "local",
				height : 'auto',
				sortname : 'name',
				sortorder : "asc",
				multiselect:true,
				autowidth : true,
				pager : '#pjqgriddicts',
				hidegrid: false,
				rowNum: 10,
		        rowList: [10, 20, 30],
		        viewrecords: true
		}
		$.extend(true, option, jqGrid_user_template);
		option.caption = "";
		option.data = data['data'];
		option.colNames = [ '类型项代码', '类型项名称'];
		option.colModel = [
			{ name : 'code', index : 'code',align : "center", editable : false },
		    { name : 'name', index : 'name',align : "center", editable : false }
        ];
		option.onSelectRow = function(id){
		    var s;
		    s = $("#jqgriddicts").jqGrid('getGridParam', 'selarrrow');
		    if(s.length>1){
		        for(var i=0;i<=s.length;i++){
		            if(s[i]!=id){
		                $("#jqgriddicts").jqGrid('setSelection', s[i]);
		            }
		        }
		    }
		};
		option.onSelectAll = function(rowids, statue) {
		    $("#jqgriddicts").jqGrid('resetSelection');
		};
		option.loadComplete = function(){
			$("#jqgriddicts").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
		};
		
		$("#jqgriddicts").jqGrid(option);
		
		$("#jqgriddicts").navGrid('#pjqgriddicts',
				{add:false, edit:false, view:false, del:false, refresh:false, search:true}, 
				{}, // use default settings for edit
				{}, // use default settings for add
				{},  // delete instead that del:false we need this
				{multipleSearch : true}, // enable the advanced searching
				{closeOnEscape:true} /* allow the view dialog to be closed when user press ESC key*/
			);
		
		// remove classes
		$(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
		$(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
		$(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
		$(".ui-jqgrid-pager").removeClass("ui-state-default");
		$(".ui-jqgrid").removeClass("ui-widget-content");
		
		// add classes
		$(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
		$(".ui-jqgrid-btable").addClass("table table-bordered table-striped");
		
		
		$(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
		$(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
		$(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
		$(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
		$(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
		$(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
		$(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
		$(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");
		
		$( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");
		
		$( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");
		
		$( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");
		
		$( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
		
		
		$(window).on('resize.jqGrid', function () {
		    $("#jqgriddicts").jqGrid( 'setGridWidth', $("#content").width() );
		})    

}


//metricclassInfos监控项配置列表
function metricclassInfosGrid(data){
        var option = {};
		var jqGrid_user_template = {
				datatype : "local",
				height : 'auto',
				sortname : 'name',
				sortorder : "asc",
				multiselect:true,
				autowidth : true,
				pager : '#pjqgridMetricclass',
				hidegrid: false,
				rowNum: 10,
		        rowList: [10, 20, 30],
		        viewrecords: true
		}
		$.extend(true, option, jqGrid_user_template);
		option.caption = "";
		option.data = data['data'];
		option.colNames = [ '监控项', '监控名称','监控状态','监控采样间隔(单位:秒)','描述','metric_class'];
		option.colModel = [
		    { name : 'metric_class', index : 'metric_class', editable : false },
		    { name : 'name', index : 'name', editable : false },
		    { name : 'enable', index : 'enable', editable : false,
		    	formatter: function (cellvalue, options, rowObject) {
		    		if(cellvalue){
		    			return "开启";
		    		}else{
		    			return "关闭";
		    		}
		        } 
		    },
		    { name : 'interval_time', index : 'interval_time', editable : false },
		    { name : 'description', index : 'description', editable : false },
		    { name : 'metric_class', index : 'metric_class',hidden:true }
        ];
		option.onSelectRow = function(id){
		    var s;
		    s = $("#jqgridMetricclass").jqGrid('getGridParam', 'selarrrow');
		    if(s.length>1){
		        for(var i=0;i<=s.length;i++){
		            if(s[i]!=id){
		                $("#jqgridMetricclass").jqGrid('setSelection', s[i]);
		            }
		        }
		    }
		};
		option.onSelectAll = function(rowids, statue) {
		    $("#jqgridMetricclass").jqGrid('resetSelection');
		};
		option.loadComplete = function(){
			$("#jqgridMetricclass").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
		};
		
		$("#jqgridMetricclass").jqGrid(option);
		
		$("#jqgridMetricclass").navGrid('#pjqgridMetricclass',
				{add:false, edit:false, view:false, del:false, refresh:false, search:true}, 
				{}, // use default settings for edit
				{}, // use default settings for add
				{},  // delete instead that del:false we need this
				{multipleSearch : true}, // enable the advanced searching
				{closeOnEscape:true} /* allow the view dialog to be closed when user press ESC key*/
			);
		
		// remove classes
		$(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
		$(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
		$(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
		$(".ui-jqgrid-pager").removeClass("ui-state-default");
		$(".ui-jqgrid").removeClass("ui-widget-content");
		
		// add classes
		$(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
		$(".ui-jqgrid-btable").addClass("table table-bordered table-striped");
		
		
		$(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
		$(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
		$(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
		$(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
		$(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
		$(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
		$(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
		$(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");
		
		$( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");
		
		$( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");
		
		$( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");
		
		$( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
		
		
		$(window).on('resize.jqGrid', function () {
		    $("#jqgridMetricclass").jqGrid( 'setGridWidth', $("#content").width() );
		})    

}

//eventInfos事件项配置列表
function eventInfosGrid(data){
        var option = {};
		var jqGrid_user_template = {
				datatype : "local",
				height : 'auto',
				sortname : 'name',
				sortorder : "asc",
				multiselect:true,
				autowidth : true,
				pager : '#pjqgridEvent',
				hidegrid: false,
				rowNum: 10,
		        rowList: [10, 20, 30],
		        viewrecords: true
		}
		$.extend(true, option, jqGrid_user_template);
		option.caption = "";
		option.data = data['data'];
		option.colNames = [ '事件名称', '监控项','开始阀值','结束阀值','事件等级','事件状态','监控项状态','是否报警','说明','event_level','metric'];
		option.colModel = [
			{ name : 'event_name', index : 'event_name', editable : false },
		    { name : 'metric_name', index : 'metric_name', editable : false },
		    { name : 'start', index : 'start', editable : false },
		    { name : 'end', index : 'end', editable : false },
		    { name : 'level_name', index : 'level_name', editable : false },
		    { name : 'event_enable', index : 'event_enable', editable : false,
		    	formatter: function (cellvalue, options, rowObject) {
		    		if(cellvalue){
		    			return "开启";
		    		}else{
		    			return "关闭";
		    		}
		        } 
		    },
		    { name : 'event', index : 'event', editable : false,
		    	formatter: function (cellvalue, options, rowObject) {
		    		if(cellvalue){
		    			return "开启";
		    		}else{
		    			return "关闭";
		    		}
		        } 
		    },
		    { name : 'alarm_enable', index : 'alarm_enable', editable : false,
		    	formatter: function (cellvalue, options, rowObject) {
		    		if(cellvalue){
		    			return "是";
		    		}else{
		    			return "否";
		    		}
		        } 
		    },
		    { name : 'event_description', index : 'event_description', editable : false },
		    { name : 'event_level', index : 'event_level',hidden:true },
		    { name : 'metric', index : 'metric',hidden:true }
        ];
		option.onSelectRow = function(id){
		    var s;
		    s = $("#jqgridEvent").jqGrid('getGridParam', 'selarrrow');
		    if(s.length>1){
		        for(var i=0;i<=s.length;i++){
		            if(s[i]!=id){
		                $("#jqgridEvent").jqGrid('setSelection', s[i]);
		            }
		        }
		    }
		};
		option.onSelectAll = function(rowids, statue) {
		    $("#jqgridEvent").jqGrid('resetSelection');
		};
		option.loadComplete = function(){
			$("#jqgridEvent").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'hidden','overflow-x':'hidden' });
		};
		
		$("#jqgridEvent").jqGrid(option);
		
		$("#jqgridEvent").navGrid('#pjqgridEvent',
				{add:false, edit:false, view:false, del:false, refresh:false, search:true}, 
				{}, // use default settings for edit
				{}, // use default settings for add
				{},  // delete instead that del:false we need this
				{multipleSearch : true}, // enable the advanced searching
				{closeOnEscape:true} /* allow the view dialog to be closed when user press ESC key*/
			);
		
		// remove classes
		$(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
		$(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
		$(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
		$(".ui-jqgrid-pager").removeClass("ui-state-default");
		$(".ui-jqgrid").removeClass("ui-widget-content");
		
		// add classes
		$(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
		$(".ui-jqgrid-btable").addClass("table table-bordered table-striped");
		
		
		$(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
		$(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
		$(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
		$(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
		$(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
		$(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
		$(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
		$(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");
		
		$( ".ui-icon.ui-icon-seek-prev" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");
		
		$( ".ui-icon.ui-icon-seek-first" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");
		
		$( ".ui-icon.ui-icon-seek-next" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");
		
		$( ".ui-icon.ui-icon-seek-end" ).wrap( "<div class='btn btn-sm btn-default'></div>" );
		$(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
		
		
		$(window).on('resize.jqGrid', function () {
		    $("#jqgridEvent").jqGrid( 'setGridWidth', $("#content").width() );
		})    

}