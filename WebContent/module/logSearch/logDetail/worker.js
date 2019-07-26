onmessage = function(evt){
	var contentData = evt.data.contentData;
	var lenNum = evt.data.lenNum;
	var  html = '';
	var logTypes = {};
	for(var i = 0; i < contentData.length; i++) {
		/*if(i % 50 == 0){
			postMessage(html);
			html = '';
		}*/
//		html += '<p id="logDetailP'+ (i + 1) +'" style="margin:0 0 0 '+ lenNum +'em;"><span style="width: '+ lenNum +'em;left: -'+ lenNum +'em;">' + (i + 1) + '</span>' + (contentData[i]['__log__']||' ') + '</p>';
		html += '<p data-acqtime="'+contentData[i]['ACQTIME']+'" id="logDetailP'+ (i + 1) +'" style="padding:0 0 0 '+ lenNum +'em;">' + (contentData[i]['LOG']||' ') + '</p>';
		if(!logTypes[contentData[i]['LEVEL']] && contentData[i]['LEVEL']){
			logTypes[contentData[i]['LEVEL']] = contentData[i]['LEVEL'];
		}
	}
	postMessage({
		html:html,
		logTypes:logTypes
	});
	postMessage({end:true})
}
