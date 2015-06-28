var _ = require('underscore')
var markdown = require('markdown-it');
var $ = require('jquery');
var md = new markdown({
	html: true,
	linkify: true,
	typographer: true
});
$(document).ready(function(argument) {
	$('#codesharetextarea').on('keyup', function() {
		console.log($('#codesharetextarea').val())
		var height = $('#resultForPreview').height();
		console.log($('#resultForPreview').height());


		var result = md.render($('#codesharetextarea').val());
		$("#resultForPreview").html(result);
	})

	$('#Generated_image').on('click', function(argument) {
		var result = md.render($('#codesharetextarea').val());
		var height = $('#resultForPreview').height();
		console.log($('#resultForPreview').height());
		var time = new Date();
		$.ajax({
			type: 'POST',
			url: "sharecodeToimg/?v=" + time.getTime(),
			data: {
				codeMark: result,
				height: height
			},
			success: function(data) {
				console.log(data);
				$("#resultForPreview").html("<img  id='codeimg'/>");
				$('#codeimg').attr('src', data + "?v=" + time.getTime());
				var a = $("<a>").attr("href", data + "?v=" + time.getTime())
				.attr("download", "codeshare.png")
				.appendTo("body");
				a[0].click();

				a.remove();
			},
			error: function(data) {
				console.log(data)
			}
		});

	})
})


// (function  () {
// 	var link= document.querySelectorAll('head>link')
// 	var urlS={}
// 	var lastTIme=0;
// 	for(item in link){
// 	     if(link[item].href!=""&&link[item].href!=undefined){
// 	     	urlS[link[item].href]=1
//                       }
// 	}
	
// 	var script= document.querySelectorAll('head>script');
// 	for(item in script){
// 	     if(script[item].src!=""&&script[item].src !=undefined){
// 	     	urlS[script[item].src]=1
//                       }
// 	}
// 	var res=window.performance.getEntriesByType('resource');
// 	for(item in res){
// 		if(urlS[res[item].name]==1){
// 			if(res[item].responseEnd>0&& res[item].responseEnd>=lastTIme){
// 				lastTIme=res[item].responseEnd;
// 			}
// 		}
	      	
// 	}

// 	return lastTIme
	
// })();


// (function () {
// 	var time0=window.performance.timing.domLoading- window.performance.timing.navigationStart;
// 	var time=window.performance.timing.domInteractive- window.performance.timing.navigationStart;
// 	var time2=window.performance.timing.domContentLoadedEventStart- window.performance.timing.navigationStart;
// 	var time3=window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart;
// 	console.log('baiping0:'+time0/1000)
// 	console.log('baiping:'+time/1000)
// 	console.log('shouping:'+time2/1000)
// 	console.log('kecaozuo:'+time3/1000)
// 	console.log('baiping3:'+(time0+(time-time0)/3)/1000)
// 	console.log('baiping4:'+time0*1.3/1000)
// 	console.log('ganzhi:'+(function  () {
// 	var link= document.querySelectorAll('head>link')
// 	var urlS={}
// 	var lastTIme=0;
// 	for(item in link){
// 	     if(link[item].href!=""&&link[item].href!=undefined){
// 	     	urlS[unescape(link[item].href)]=1
//                       }
// 	}
	
// 	var script= document.querySelectorAll('head>script');
// 	for(item in script){
// 	     if(script[item].src!=""&&script[item].src !=undefined){
// 	     	urlS[unescape(script[item].src)]=1
//                       }
// 	}
// 	var res=window.performance.getEntriesByType('resource');
// 	for(item in res){
// 		if(urlS[unescape(res[item].name)]==1){
// 			if(res[item].responseEnd>0&& res[item].responseEnd>=lastTIme){
// 				lastTIme=res[item].responseEnd;
// 			}
// 		}else{
			
// 		}
	      	
// 	}
// 	console.log(urlS)
			

// 	return lastTIme
	
// })()/1000)

// })()
	
//  	var res=window.performance.getEntriesByType('resource');
// 	for(item in res){
// 	   if(res[item].initiatorType=="script"){
// 	   	if(res[item].responseEnd>(window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart)){
// 	   		console.log(res[item])
// 	   	}
	   	
// 	   }
	      	
// 	  }
