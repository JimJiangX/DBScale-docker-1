var graphWidth = 850, 
	nodeWidth = 720,
	proxyHeight = 100,
	proxyDistance = 100,
	graphAddHeight = 200;

var shardCountLimit = 10, 
	shardWidth, 
	shardHeight,
	shardHeightOneLine,
	shardHeightFactor = 1,
	shardHeightAll;

var proxySize = 80,
	masterFactor = 0.5,
	standbyFactor = 0.5,
	slaveFactor = 0.5;
	
var graphInterval = 20000,
	graphIntervalFlg = 0;

var proxyNormalUrl = 'image://images/proxy_normal.png';
var proxyAbnormalUrl = 'image://images/proxy_abnormal.png';
var proxyUnknownUrl = 'image://images/proxy_unknown.png';
var redisProxyNormalUrl = 'image://images/Redis_proxy_normal.png';
var redisProxyAbnormalUrl = 'image://images/Redis_proxy_abnormal.png';
var redisProxyUnknownUrl = 'image://images/Redis_proxy_unknown.png';
var dbNormalUrl = 'image://images/db_normal.png';
var dbAbnormalUrl = 'image://images/db_abnormal.png';
var dbUnknownUrl = 'image://images/db_unknown.png';
var redisNormalUrl = 'image://images/Redis_normal.png';
var redisAbnormalUrl = 'image://images/Redis_abnormal.png';
var redisUnknownUrl = 'image://images/Redis_unknown.png';

function drawUpsqlGraph(jsonData) {
	if(graphIntervalFlg != 0){
		clearInterval(graphIntervalFlg);
	}
	
	var nodeData = [];
	var markAreaData = [];
	var links = [];
	
	if (!jsonData.data || !jsonData.data.subServs) {
		alert("get empty data");
		return;
	}
	
	var shardCount = 0, shardList = [];
	var dbaasType;
	$.each(jsonData.data.subServs, function(indexServ, serv) {
		if (serv.type == "upsql") {
			shardList.push(serv);
			shardCount++;
		}
	});
	if (shardList.length == 0) {
		alert("获取节点信息失败");
		return;
	}
	
	var dbaasCnt = 0;
	for(var i = 0; i < shardList[0].units.length; i++){
		if(shardList[0].units[i].role == "master" || shardList[0].units[i].role == "standby" || shardList[0].units[i].role == "slave"){
			dbaasCnt ++;
		}
	}
	if (dbaasCnt == 1) {
		dbaasType = "M";		
	} else if (dbaasCnt == 2) {
		dbaasType = "Sb";
	} else {
		dbaasType = "Sl";
	}
	setVariables(dbaasType, shardCount);
	
	shardWidth = shardCount > shardCountLimit ? nodeWidth / (shardCountLimit + 1) : nodeWidth / (shardCount + 1);
	shardHeightOneLine = shardWidth * shardHeightFactor;
	
	if (shardList[0].units.length == 1) {
		shardHeight = shardWidth;		
	} else if (shardList[0].units.length == 2) {
		shardHeight = shardWidth * 2;
	} else {
		shardHeight = shardWidth * 3;
	}
	
	// proxy node start
	var proxyCount = 0, proxyList = [];
	$.each(jsonData.data.subServs, function(indexServ, serv) {
		if (serv.type == "upproxy") {
			$.each(serv.units, function(indexUnit, unit) {
				proxyList.push(unit);
				proxyCount++;
			});
		}
	});
	for (var i = 0; i < proxyCount; i++) {
		var symbolUrl = "";
		if(proxyList[i].status == "passing"){
			symbolUrl = proxyNormalUrl;
		} else if(proxyList[i].status == "critical") {
			symbolUrl = proxyAbnormalUrl;
		} else {
			symbolUrl = proxyUnknownUrl;
		}
		nodeData.push({
			name : proxyList[i].serverIp,
			category : 1,
			x : nodeWidth / (proxyCount + 1) * (i + 1),
			y : proxyHeight / 2,
			symbol: symbolUrl,
			symbolSize: proxySize,
			type: proxyList[i].type,
			rawData: proxyList[i],
			label: renderProxyLabel(proxyList[i])
		});
	}
	// proxy node end
	
	// upsql node start
	shardHeight = shardHeight * shardHeightFactor;
	shardHeightAll = shardHeight * Math.ceil(shardCount / shardCountLimit);

	for (var i = 0; i < shardCount; i++) {
		var m, sb, slList = [];
		var symbolSize = 0;
		$.each(shardList[i].units, function(indexUnit, unit) {
			if (unit.role == "master") {
				m = unit;
			} else if (unit.role == "standby") {
				sb = unit;
			} else if (unit.role == "slave"){
				slList.push(unit);
			}
		});
		if (dbaasType == "M" || dbaasType == "Sb" || dbaasType == "Sl") {
			var symbolUrl = "";
			if(m.status == "passing" && m.availableStatus == "normal"){
				symbolUrl = dbNormalUrl;
			} else if(m.status == "critical" || m.availableStatus == "abnormal") {
				symbolUrl = dbAbnormalUrl;
			} else {
				symbolUrl = dbUnknownUrl;
			}
			nodeData.push({
				name : m.serverIp,
				category : 2,
				x : shardWidth * ((i % shardCountLimit) + 1),
				y : proxyHeight + proxyDistance + Math.floor(i / shardCountLimit) * shardHeight + (shardHeightOneLine / 2),
				symbol: symbolUrl,
				symbolSize: shardWidth * masterFactor,
				type: m.type,
				rawData: m,
				label: renderLabel(m, shardWidth * masterFactor, dbaasType)
			});
			if(m.replicationMasterIp != ""){
				links.push({
			        source: m.replicationMasterIp,
			        target: m.serverIp,
			        lineStyle: {
			        	normal: {
			        		color: (m.replicationSlaveIoStatus == "Yes" && m.replicationSlaveSqlStatus == "Yes") ? "green" : "red",
			        		width: 3
			        	}
			        },
			        symbolSize: [1, 10]
			    });
			}
		}
		if (dbaasType == "Sb" || dbaasType == "Sl") {
			var symbolUrl = "";
			if(sb.status == "passing" && sb.availableStatus == "normal"){
				symbolUrl = dbNormalUrl;
			} else if(sb.status == "critical" || sb.availableStatus == "abnormal") {
				symbolUrl = dbAbnormalUrl;
			} else {
				symbolUrl = dbUnknownUrl;
			}
			nodeData.push({
				name : sb.serverIp,
				category : 2,
				x : shardWidth * ((i % shardCountLimit) + 1),
				y : proxyHeight + proxyDistance + Math.floor(i / shardCountLimit) * shardHeight + shardHeightOneLine + (shardHeightOneLine / 2),
				symbol: symbolUrl,
				symbolSize: shardWidth * standbyFactor,
				type: sb.type,
				rawData: sb,
				label: renderLabel(sb, shardWidth * standbyFactor, dbaasType)
			});
			if(sb.replicationMasterIp != ""){
				links.push({
			        source: sb.replicationMasterIp,
			        target: sb.serverIp,
			        lineStyle: {
			        	normal: {
			        		color: (sb.replicationSlaveIoStatus == "Yes" && sb.replicationSlaveSqlStatus == "Yes") ? "green" : "red",
			        		width: 3
			        	}
			        },
			        symbolSize: [1, 10]
			    });
			}
		}
		if (dbaasType == "Sl") {
			var slWidth = shardWidth / (slList.length + 1);
			for(var j = 0; j < slList.length; j++){
				var symbolUrl = "";
				if(slList[j].status == "passing" && slList[j].availableStatus == "normal"){
					symbolUrl = dbNormalUrl;
				} else if(slList[j].status == "critical" || slList[j].availableStatus == "abnormal") {
					symbolUrl = dbAbnormalUrl;
				} else {
					symbolUrl = dbUnknownUrl;
				}
				nodeData.push({
					name : slList[j].serverIp,
					category : 2,
					x : shardWidth * (i % shardCountLimit) + (shardWidth / 2) + slWidth * (j + 1),
					y : proxyHeight + proxyDistance + Math.floor(i / shardCountLimit) * shardHeight + (shardHeightOneLine * 2) + (shardHeightOneLine / 2),
					symbol: symbolUrl,
					symbolSize: slWidth * slaveFactor,
					type: slList[j].type,
					rawData: slList[j],
					label: renderLabel(slList[j], slWidth * slaveFactor, dbaasType)
				});
				if(slList[j].replicationMasterIp != ""){
					links.push({
				        source: slList[j].replicationMasterIp,
				        target: slList[j].serverIp,
				        lineStyle: {
				        	normal: {
				        		color: (slList[j].replicationSlaveIoStatus == "Yes" && slList[j].replicationSlaveSqlStatus == "Yes") ? "green" : "red",
				        		width: 3
				        	}
				        },
				        symbolSize: [1, 10]
				    });
				}
			}
		}
	}
	// upsql node end
	
	// link markarea start
	nodeData.push({
		name : "proxyBottom",
		category : 0,
		x : nodeWidth / 2,
		y : proxyHeight,
		symbolSize: 0
	});
	nodeData.push({
		name : "upsqlTop",
		category : 0,
		x : nodeWidth / 2,
		y : proxyHeight + proxyDistance,
		symbolSize: 0
	});
	
	links.push({
        source: "proxyBottom",
        target: "upsqlTop",
        lineStyle: {
        	normal: {
        		color: "green",
        		width: 5
        	}
        },
        symbolSize: [1, 25]
    });
	// link end

	// mark area start
	markAreaData.push([ {
		itemStyle : {
			normal : {
				color : 'grey',
				opacity : 0.2
			}
		},
		coord : [ 0, 0 ]
	}, {
		itemStyle : {
			normal : {
				color : 'grey',
				opacity : 0.2
			}
		},
		coord : [ nodeWidth, proxyHeight ]
	} ]);
	
	markAreaData.push([ {
		itemStyle : {
			normal : {
				color : 'grey',
				opacity : 0.3
			}
		},
		coord : [ 0, proxyHeight + proxyDistance ]
	}, {
		itemStyle : {
			normal : {
				color : 'grey',
				opacity : 0.3			}
		},
		coord : [ nodeWidth, proxyHeight + proxyDistance + shardHeightAll ]
	} ]);
	// mark area end

	var graphChartOption = {
		title : {
			show : false
		},
		tooltip: {},
		series : [ {
			type : 'graph',
			symbolSize : 50,
			roam : false,
			edgeSymbol : [ 'circle', 'arrow' ],
			edgeSymbolSize : [ 4, 10 ],
			edgeLabel : {
				normal : {
					textStyle : {
						fontSize : 20
					}
				}
			},
			data : nodeData,
			links : links,
			lineStyle : {
				normal : {
					opacity : 0.9,
					width : 2,
					curveness : 0
				}
			},
			markArea : {
				silent: true,
				data : markAreaData
			},
			tooltip: {
				formatter: formatterFunc
			}
		} ]
	};
	
	var linksCopy = [];
	for(var i = 0; i < links.length; i++){
		if(links[i].source != "null" && links[i].target == "null"){
			linksCopy.push(links[i]);
		}
	}
	links = linksCopy;
	
//	console.log(nodeData.sort(upsqlNodeSortFunc));
//	console.log(links);
//	console.log(markAreaData);
//	var h = proxyHeight + proxyDistance + shardHeightAll + graphAddHeight;
//	console.log("设定高度=" + h);
//	console.log("shardHeight=" + shardHeight);
//	console.log("shardHeightOneLine=" + shardHeightOneLine);
	
	$("#chartGraph").height(proxyHeight + proxyDistance + shardHeightAll + graphAddHeight);

	upsqlGraphChart.setOption(graphChartOption);
	upsqlGraphChart.resize({height: proxyHeight + proxyDistance + shardHeightAll + graphAddHeight});
	upsqlGraphChart.hideLoading();
	
	graphIntervalFlg = setInterval(function(){
		if($("#graphTab")[0] == undefined){
			clearInterval(graphIntervalFlg);
			return;
		}
		sendGetWithoutLayer("/" + getProjectName() + "/v1.0/servs/"+getSession("serviceUpsqlId"),function(data){
			drawUpsqlGraph(data)
		},ListAlert,null);
	}, graphInterval);
}

function drawRedisGraph(jsonData) {
	console.log(jsonData);
	if(graphIntervalFlg != 0){
		clearInterval(graphIntervalFlg);
	}
	
	var nodeData = [];
	var markAreaData = [];
	var links = [];
	
	if (!jsonData.data || !jsonData.data.subServs) {
		alert("get empty data");
		return;
	}
	
	var shardCount = 0, shardList = [];
	var dbaasType;
	$.each(jsonData.data.subServs, function(indexServ, serv) {
		if (serv.type == "upredis") {
			shardList.push(serv);
			shardCount++;
		}
	});
	if (shardList.length == 0) {
		alert("获取节点信息失败");
		return;
	}
	
	var dbaasCnt = 0;
	for(var i = 0; i < shardList[0].units.length; i++){
		if(shardList[0].units[i].role == "master" || shardList[0].units[i].role == "slave"){
			dbaasCnt ++;
		}
	}
	if (dbaasCnt == 1) {
		dbaasType = "M";		
	} else {
		dbaasType = "Sl";
	}
	setVariables(dbaasType, shardCount);
	
	shardWidth = shardCount > shardCountLimit ? nodeWidth / (shardCountLimit + 1) : nodeWidth / (shardCount + 1);
	shardHeightOneLine = shardWidth * shardHeightFactor;
	
	if (shardList[0].units.length == 1) {
		shardHeight = shardWidth;		
	} else {
		shardHeight = shardWidth * 2;
	}
	
	// proxy node start
	var proxyCount = 0, proxyList = [];
	$.each(jsonData.data.subServs, function(indexServ, serv) {
		if (serv.type == "urproxy") {
			$.each(serv.units, function(indexUnit, unit) {
				proxyList.push(unit);
				proxyCount++;
			});
		}
	});
	for (var i = 0; i < proxyCount; i++) {
		var symbolUrl = "";
		if(proxyList[i].status == "passing"){
			symbolUrl = redisProxyNormalUrl;
		} else if(proxyList[i].status == "critical") {
			symbolUrl = redisProxyAbnormalUrl;
		} else {
			symbolUrl = redisProxyUnknownUrl;
		}
		nodeData.push({
			name : proxyList[i].serverIp,
			category : 1,
			x : nodeWidth / (proxyCount + 1) * (i + 1),
			y : proxyHeight / 2,
			symbol: symbolUrl,
			symbolSize: proxySize,
			type: proxyList[i].type,
			rawData: proxyList[i],
			label: renderProxyLabel(proxyList[i])
		});
	}
	// proxy node end
	
	// upsql node start
	shardHeight = shardHeight * shardHeightFactor;
	shardHeightAll = shardHeight * Math.ceil(shardCount / shardCountLimit);

	for (var i = 0; i < shardCount; i++) {
		var m = undefined;
		var slList = [];
		var symbolSize = 0;
		$.each(shardList[i].units, function(indexUnit, unit) {
			slList.push(unit);
		});
		for(var k = 0; k < slList.length; k++) {
			if(slList[k].role == "master" && slList[k].status == "passing") {
				m = slList[k];
				slList.splice(k, 1);
				break;
			}
		}
		if(m == undefined){
			m = slList.pop();
		}
		console.log(m);
		console.log(slList);
		if (dbaasType == "M" || dbaasType == "Sl") {
			var symbolUrl = "";
			if(m.status == "passing"){
				symbolUrl = redisNormalUrl;
			} else if(m.status == "critical") {
				symbolUrl = redisAbnormalUrl;
			} else {
				symbolUrl = redisUnknownUrl;
			}
			nodeData.push({
				name : m.serverIp,
				category : 2,
				x : shardWidth * ((i % shardCountLimit) + 1),
				y : proxyHeight + proxyDistance + Math.floor(i / shardCountLimit) * shardHeight + (shardHeightOneLine / 2),
				symbol: symbolUrl,
				symbolSize: shardWidth * masterFactor,
				type: m.type,
				rawData: m,
				label: renderLabel(m, shardWidth * masterFactor, dbaasType)
			});
			if(m.replicationMasterIp != ""){
				links.push({
			        source: m.replicationMasterIp,
			        target: m.serverIp,
			        lineStyle: {
			        	normal: {
			        		color: m.status == "passing" ? "green" : "red",
			        		width: 3
			        	}
			        },
			        symbolSize: [1, 10]
			    });
			}
		}
		if (dbaasType == "Sl") {
			var slWidth = shardWidth / (slList.length + 1);
			for(var j = 0; j < slList.length; j++){
				var symbolUrl = "";
				if(slList[j].status == "passing"){
					symbolUrl = redisNormalUrl;
				} else if(slList[j].status == "critical") {
					symbolUrl = redisAbnormalUrl;
				} else {
					symbolUrl = redisUnknownUrl;
				}
				nodeData.push({
					name : slList[j].serverIp,
					category : 2,
					x : shardWidth * (i % shardCountLimit) + (shardWidth / 2) + slWidth * (j + 1),
					y : proxyHeight + proxyDistance + Math.floor(i / shardCountLimit) * shardHeight + shardHeightOneLine + (shardHeightOneLine / 2),
					symbol: symbolUrl,
					symbolSize: slWidth * slaveFactor,
					type: slList[j].type,
					rawData: slList[j],
					label: renderLabel(slList[j], slWidth * slaveFactor, dbaasType)
				});
				if(slList[j].replicationMasterIp != ""){
					links.push({
				        source: slList[j].replicationMasterIp,
				        target: slList[j].serverIp,
				        lineStyle: {
				        	normal: {
				        		color: slList[j].status == "passing" ? "green" : "red",
				        		width: 3
				        	}
				        },
				        symbolSize: [1, 10]
				    });
				}
			}
		}
	}
	// upsql node end
	
	// link markarea start
	nodeData.push({
		name : "proxyBottom",
		category : 0,
		x : nodeWidth / 2,
		y : proxyHeight,
		symbolSize: 0
	});
	nodeData.push({
		name : "upsqlTop",
		category : 0,
		x : nodeWidth / 2,
		y : proxyHeight + proxyDistance,
		symbolSize: 0
	});
	
	links.push({
        source: "proxyBottom",
        target: "upsqlTop",
        lineStyle: {
        	normal: {
        		color: "green",
        		width: 5
        	}
        },
        symbolSize: [1, 25]
    });
	// link end

	// mark area start
	markAreaData.push([ {
		itemStyle : {
			normal : {
				color : 'grey',
				opacity : 0.2
			}
		},
		coord : [ 0, 0 ]
	}, {
		itemStyle : {
			normal : {
				color : 'grey',
				opacity : 0.2
			}
		},
		coord : [ nodeWidth, proxyHeight ]
	} ]);
	
	markAreaData.push([ {
		itemStyle : {
			normal : {
				color : 'grey',
				opacity : 0.3
			}
		},
		coord : [ 0, proxyHeight + proxyDistance ]
	}, {
		itemStyle : {
			normal : {
				color : 'grey',
				opacity : 0.3			}
		},
		coord : [ nodeWidth, proxyHeight + proxyDistance + shardHeightAll ]
	} ]);
	// mark area end
	
	var linksCopy = [];
	for(var i = 0; i < links.length; i++){
		if(links[i].source != "null" && links[i].target != "null"){
			linksCopy.push(links[i]);
		}
	}
	links = linksCopy;
	

	var graphChartOption = {
		title : {
			show : false
		},
		tooltip: {},
		series : [ {
			type : 'graph',
			symbolSize : 50,
			roam : false,
			edgeSymbol : [ 'circle', 'arrow' ],
			edgeSymbolSize : [ 4, 10 ],
			edgeLabel : {
				normal : {
					textStyle : {
						fontSize : 20
					}
				}
			},
			data : nodeData,
			links : links,
			lineStyle : {
				normal : {
					opacity : 0.9,
					width : 2,
					curveness : 0
				}
			},
			markArea : {
				silent: true,
				data : markAreaData
			},
			tooltip: {
				formatter: formatterFunc
			}
		} ]
	};
	
//	console.log(nodeData.sort(upsqlNodeSortFunc));
//	console.log(links);
//	console.log(markAreaData);
//	var h = proxyHeight + proxyDistance + shardHeightAll + graphAddHeight;
//	console.log("设定高度=" + h);
//	console.log("shardHeight=" + shardHeight);
//	console.log("shardHeightOneLine=" + shardHeightOneLine);
	
	$("#chartGraph").height(proxyHeight + proxyDistance + shardHeightAll + graphAddHeight);
	
	console.log(graphChartOption);

	upsqlGraphChart.setOption(graphChartOption);
	upsqlGraphChart.resize({height: proxyHeight + proxyDistance + shardHeightAll + graphAddHeight});
	upsqlGraphChart.hideLoading();
	
	graphIntervalFlg = setInterval(function(){
		if($("#graphTab")[0] == undefined){
			clearInterval(graphIntervalFlg);
			return;
		}
		sendGetWithoutLayer("/" + getProjectName() + "/v1.0/servs/"+getSession("serviceUpsqlId"),function(data){
			drawRedisGraph(data)
		},ListAlert,null);
	}, graphInterval);
}


function upsqlNodeSortFunc(a, b){
	if(a.y < b.y) {
		return -1
	} else if(a.y > b.y) {
		return 1;
	} else {
		if(a.x < b.x) {
			return -1;
		} else if(a.x > b.x){
			return 1;
		} else {
			return 0;
		}
	}
	return 0;
}

function formatterFunc(params, ticket, callback) {
	if(params.seriesType == "graph" && params.componentType == "series" && params.componentSubType == "graph" && params.dataType == "node"){
		return renderUpsqlTooltip(params.data.rawData);
	}
	return "";
}

function renderUpsqlTooltip(rawData){
	var relateName, serverIp, portValue, softwareVersion, role, availableStatus, status;
	for(var key in rawData){
		switch(key){
		case "relateName":
			relateName = rawData[key];
			break;
		case "serverIp":
			serverIp = rawData[key];
			break;
		case "portValue":
			portValue = rawData[key];
			break;
		case "softwareVersion":
			softwareVersion = rawData[key];
			break;
		case "role":
			if(rawData[key] == "master"){
				role = "主库";
			} else if(rawData[key] == "standby"){
				role = "备库";
			} else {
				role = "从库";
			}
			break;
		case "availableStatus":
			if(rawData[key] == "normal" || rawData[key] == "passing"){
				availableStatus = "正常";
			} else {
				availableStatus = "异常";
			}
			break;
		case "status":
			if(rawData[key] == "normal" || rawData[key] == "passing"){
				status = "正常";
			} else {
				status = "异常";
			}
			break;
		default:
		}
	}
	
	if(rawData.type == "upsql"){
		return "单元名称:  " + relateName + "</br>"
		+ "IP地址:  " + serverIp + "</br>"
		+ "端口:  " + portValue + "</br>"
		+ "版本:  " + softwareVersion + "</br>"
		+ "角色:  " + role + "</br>"
		+ "状态:  " + availableStatus;
	}
	
	if(rawData.type == "upredis"){
		return "单元名称:  " + relateName + "</br>"
		+ "IP地址:  " + serverIp + "</br>"
		+ "端口:  " + portValue + "</br>"
		+ "版本:  " + softwareVersion + "</br>"
		+ "角色:  " + role + "</br>"
		+ "状态:  " + status;
	}
	
	return "单元名称:  " + relateName + "</br>"
		+ "IP地址:  " + serverIp + "</br>"
		+ "端口:  " + portValue + "</br>"
		+ "版本:  " + softwareVersion + "</br>"
		+ "状态:  " + status;
}

function renderProxyLabel(rawData){
	return {
		normal: {
        	show: true,
        	position: "bottom",
        	distance: 0,
        	color: "blue",
        	fontSize: proxySize / 5,
            formatter: [
            	"连接数: " + rawData.connectionCnt
            ].join('\n')
		}
	};
}

function renderLabel(rawData, size, dbaasType){
	return {
		normal: {
        	show: true,
        	position: "top",
        	distance: 0,
        	color: "blue",
        	fontSize: size / 5,
            formatter: [
            	"连接数: " + rawData.connectionCnt,
            	"QPS: " + rawData.qps
            ].join('\n')
		}
	};
}

function setVariables(dbaasType, shardCount){
	switch(dbaasType){
	case "Sl":
		if(shardCount >= 4){
			nodeWidth = 720;
			proxyHeight = 100;
			proxyDistance = 50;
			shardHeightFactor = 0.6;
			proxySize = 80;
			masterFactor = 0.4;
			standbyFactor = 0.4;
			slaveFactor = 0.5;
			graphAddHeight = 0;
		} else if(shardCount == 2 || shardCount == 3){
			nodeWidth = 720;
			proxyHeight = 100;
			proxyDistance = 50;
			shardHeightFactor = 0.8;
			proxySize = 70;
			masterFactor = 0.5;
			standbyFactor = 0.5;
			slaveFactor = 0.5;
			graphAddHeight = 0;
		} else {
			nodeWidth = 480;
			proxyHeight = 100;
			proxyDistance = 50;
			shardHeightFactor = 0.5;
			proxySize = 70;
			masterFactor = 0.4;
			standbyFactor = 0.4;
			slaveFactor = 0.5;
			graphAddHeight = 100;
		}
		break;
	case "Sb":
		if(shardCount >= 4){
			nodeWidth = 720;
			proxyHeight = 100;
			proxyDistance = 100;
			shardHeightFactor = 1;
			proxySize = 80;
			masterFactor = 0.6;
			standbyFactor = 0.6;
			slaveFactor = 0;
			graphAddHeight = 100;
		} else if(shardCount == 2 || shardCount == 3){
			nodeWidth = 360;
			proxyHeight = 50;
			proxyDistance = 50;
			shardHeightFactor = 1;
			proxySize = 70;
			masterFactor = 0.9;
			standbyFactor = 0.9;
			slaveFactor = 0;
			graphAddHeight = 240;
		} else {
			nodeWidth = 360;
			proxyHeight = 60;
			proxyDistance =60;
			shardHeightFactor = 0.6;
			proxySize = 70;
			masterFactor = 0.5;
			standbyFactor = 0.5;
			slaveFactor = 0;
			graphAddHeight = 160;
		}
		break;
	case "M":
		if(shardCount >= 4){
			nodeWidth = 120;
			proxyHeight = 20;
			proxyDistance = 60;
			shardHeightFactor = 1;
			proxySize = 80;
			masterFactor = 4;
			standbyFactor = 0.6;
			slaveFactor = 0;
			graphAddHeight = 480;
		} else if(shardCount == 2 || shardCount == 3){
			nodeWidth = 120;
			proxyHeight = 20;
			proxyDistance = 50;
			shardHeightFactor = 1;
			proxySize = 80;
			masterFactor = 3;
			standbyFactor = 0.6;
			slaveFactor = 0;
			graphAddHeight = 360;
		} else {
			nodeWidth = 120;
			proxyHeight = 20;
			proxyDistance = 40;
			shardHeightFactor = 0.4;
			proxySize = 80;
			masterFactor = 1.5;
			standbyFactor = 0.3;
			slaveFactor = 0;
			graphAddHeight = 380;
		}
		break;
	default:
	}
}

