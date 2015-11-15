// var _ = require('underscore')
var $ = require('jquery');
function getTime() {
	var result={
		time:false,
		domLoading:0,
		domContentLoadedEventStart:0,
		loadEventStart:0

	}
	if (window.performance && window.performance.timing) {
		result.time=true,
		result.dns =window.performance.timing.domainLookupEnd-window.performance.timing.domainLookupStart;
		result.tcp =window.performance.timing.connectEnd-window.performance.timing.connectStart;
		result.domLoading = window.performance.timing.domLoading - window.performance.timing.navigationStart;
		result.domContentLoadedEventStart = window.performance.timing.domContentLoadedEventStart - window.performance.timing.navigationStart;
		result.loadEventStart= window.performance.timing.loadEventStart - window.performance.timing.navigationStart;

	} 
	return  result;

}

function getTimeForShow () {
	var timeResult= getTime();
	if(timeResult.time){
		 if(timeResult.loadEventStart<=0){
		 	timeResult.loadEventStart='loading'
		 	setTimeout(function (argument) {
	                  	getTimeForShow ();
	                  },100)
	 }
	   $('#showTime').html("PageLoadTime(unit:ms )<br/>  dns:"+timeResult.dns+ "<br/>tcp:"+timeResult.tcp+"<br/> domLoading: "+timeResult.domLoading+"<br/>domReady:"+timeResult.domContentLoadedEventStart+"<br/>onLoad:"+timeResult.loadEventStart+"<br/><a id='getTImeNow'>F5 refresh this page</a> <br>twitter:https://twitter.com/qqqzhch")
	}
}


$(document).ready(function(argument) {

	$(".header-search").submit(function(e){
		  
		  if($('#searchBox').val()!=''){
		  	$(".header-search").attr('action','/search/'+$('#searchBox').val()+'/')
		  	// alert('/search/'+$('#searchBox').val()+'/');
		  }
		  
	});
	getTimeForShow () ;

})