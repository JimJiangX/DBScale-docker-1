function getXlsFromTbl(inTblId, inTblContainerId, title, rownumbers) {  
    try {  
        var allStr = "";  
        var curStr = "";  
        //alert("getXlsFromTbl");  
        if (inTblId != null && inTblId != "" && inTblId != "null") {  
            curStr = getTblData($('#' + inTblId), $('#' + inTblContainerId), rownumbers);  
        }  
        if (curStr != null) {  
            allStr += curStr;  
        }  
        else {  
            alert("你要导出的表不存在！");  
            return;  
        }  
        var fileName = getExcelFileName(title);  
        doFileExport(fileName, allStr);  
    }  
    catch (e) {  
        alert("导出发生异常:" + e.name + "->" + e.description + "!");  
    }  
}  
function getTblData(curTbl, curTblContainer, rownumbers) {  
  
    var outStr = "";  
    if (curTbl != null) {  
        var rowdata = curTbl.getRowData();  
        var Lenr = 1;  
  
        for (i = 0; i < Lenr; i++) {  
            //var Lenc = curTbl.rows(i).cells.length;  
            var th;  
            if (rownumbers == true) {  
                th = curTblContainer.find('TH:not(:first-child)');  
            }  
            else {  
                th = curTblContainer.find('TH');  
            }  
            th.each(function(index, element) {  
                //alert($(element).text());  
                //取得每行的列数  
                var j = index + 1;  
                var content = $(element).text();  
                //alert(j + "|" + content);  
                outStr += content + "\t";  
                //赋值  
  
            });  
            outStr += "\r\n";  
        }  
        var tmp = "";  
        for (i = 0; i < rowdata.length; i++) {  
            var row = eval(rowdata[i]);  
            for (each in row) {  
                outStr += row[each] + "\t";  
            }  
            outStr += "\r\n";  
        }  
  
  
    }  
    else {  
        outStr = null;  
        alert(inTbl + "不存在!");  
    }  
    return outStr;  
}  
function getExcelFileName(title) {  
    var d = new Date();  
    var curYear = d.getYear();  
    var curMonth = "" + (d.getMonth() + 1);  
    var curDate = "" + d.getDate();  
    var curHour = "" + d.getHours();  
    var curMinute = "" + d.getMinutes();  
    var curSecond = "" + d.getSeconds();  
    if (curMonth.length == 1) {  
        curMonth = "0" + curMonth;  
    }  
    if (curDate.length == 1) {  
        curDate = "0" + curDate;  
    }  
    if (curHour.length == 1) {  
        curHour = "0" + curHour;  
    }  
    if (curMinute.length == 1) {  
        curMinute = "0" + curMinute;  
    }  
    if (curSecond.length == 1) {  
        curSecond = "0" + curSecond;  
    }  
    var fileName = title + "_" + curYear + curMonth + curDate + "_"  
            + curHour + curMinute + curSecond + ".csv";  
    //alert(fileName);   
    return fileName;  
}  
function doFileExport(inName, inStr) {  
    var xlsWin = null;  
    if (!!document.all("HideFrm")) {  
        xlsWin = HideFrm;  
    }  
    else {  
        var width = 6;  
        var height = 4;  
        var openPara = "left=" + (window.screen.width / 2 - width / 2)  
                + ",top=" + (window.screen.height / 2 - height / 2)  
                + ",scrollbars=no,width=" + width + ",height=" + height;  
        xlsWin = window.open("", "_blank", openPara);  
    }  
    xlsWin.document.write(inStr);  
    xlsWin.document.close();  
    xlsWin.document.execCommand('Saveas', true, inName);  
    xlsWin.close();  
}  