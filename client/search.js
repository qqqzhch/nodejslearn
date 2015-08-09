// var _ = require('underscore')
var $ = require('jquery');
$(document).ready(function(argument) {


	$(".header-search").submit(function(e){
		  
		  if($('#searchBox').val()!=''){
		  	$(".header-search").attr('action','/search/'+$('#searchBox').val()+'/')
		  	// alert('/search/'+$('#searchBox').val()+'/');
		  }
		  
	});
})