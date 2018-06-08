function arrayToString(formArray){
	  return JSON.stringify(arrayToJson(formArray));
}

function arrayToJson(formArray){
	  var dataArray = {};
	  $.each(formArray,function(){
	    if(dataArray[this.name]){
	      if(!dataArray[this.name].push){
	        dataArray[this.name] = [dataArray[this.name]];
	      }
	      dataArray[this.name].push(this.value + '');
	    }else{
	    	switch(this.name){
	    	case "definitionSubServs":
	    		dataArray[this.name] = [this.value + ''];
	    		return;
	    	case "networkings":
	    		dataArray[this.name] = [this.value + ''];
	    		return;
	    	case "maxUsage":
	    		dataArray[this.name] = parseInt(this.value);
	    		return;
	    	case "maxHostCount":
	    		dataArray[this.name] = parseInt(this.value);
	    		return;
	    	default:
	    		dataArray[this.name] = this.value;	
	    	}
	    }
	  });
	  return dataArray;
}
function postSuccess(data){
	alert("传输成功 "+data);
}
