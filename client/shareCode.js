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


