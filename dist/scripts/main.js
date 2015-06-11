var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

$(document).ready(function(){
	var Imageboard = require("./models/collections/Imageboard.js");
	var AnImage = require("./models/Image.js");
	var Comments = require("./models/Comments.js")
	var CommentsCollection = require("./models/collections/Comments-Collection.js");
	var commentsCollection = new CommentsCollection();
	var imageBoard = new Imageboard();


	var templateString = $("#image-holder").html();
	var imageHolderBuilder = _.template(templateString);

	// var templateStringForComment = $("#comment-holder").html();
	// var commentHolderBuilder = _.template(templateStringForComment);


	imageBoard.fetch({
		success: function(imageObj){
			var theId;
			imageObj.forEach(function(model){
				$("#place-image-here").append(imageHolderBuilder(model.attributes));
				$("#place-image-here").fadeIn(3000);
			});
			imageBoard.on("add", function(image){
				$("#place-image-here").prepend(imageHolderBuilder(image.attributes));
				$("#place-image-here").fadeIn(3000);
			});
			var html = "";
			if(imageObj.length !== 0){
				// for(var i = 0; i < imageObj.models.length; i++){
				// 	for(var j = 0; j < imageObj.models[i].attributes.comment.length; j++){
				// 		console.log(imageObj.models[i].attributes.comment[j]);
				// 		html += "<div>"+imageObj.models[i].attributes.comment[j]+"</div>";
				// 	}	
				// }
				// console.log(html);
				// $("#place-comment-"+theId).html(comment.split(","));
			}

			for(var i = 0; i < imageObj.models.length; i++){
				$("#submit-comment-form-"+imageObj.models[i].cid).on("submit", function(event){
					event.preventDefault();
					theId = $(this).attr("id").substring($(this).attr("id").length - 2)
					var comment = new Comments();
					comment.set("text",$("#input-"+theId).val());
					comment.set("postID", theId);
					commentsCollection.add(comment);
					var imageComment = imageBoard.get(theId);
					imageComment.attributes.comment.push(comment.get("text"));
					imageComment.save()
					comment.save();
				});
			}
		}
	});

	$buttonExpand = $("#expand-to-menu");
	$imageUrl = $("#image-url");
	$caption = $("#caption");
	$imageForm = $("#image-form");
	$submitImage = $("#submit-image");
	$cancel = $("#cancel");
	$sendError = $("#error-message");
	$sendSuccess = $("#success-message");
	$deleteAllPics = $("#delete-all-pics");
	$deleteAllComments = $("#delete-all-comments")
	
	$imageForm.hide();

	$deleteAllPics.on("click", function(){
		var myDeleteArray = [];
		$.get("https://tiny-pizza-server.herokuapp.com/collections/awg-imagboard/", function(data){
			for(var i = 0; i < data.length; i++){
				myDeleteArray.push(data[i]._id);
			}
		for(var j = 0; j < myDeleteArray.length; j++){
			$.ajax({
				type: "DELETE",
				url: "https://tiny-pizza-server.herokuapp.com/collections/awg-imagboard/"+myDeleteArray[j],
				success: function(){
					console.log("all gone");
				}
			})
		}
			
		});
	});

	$deleteAllComments.on("click", function(){
		var myDeleteArray = [];
		$.get("https://tiny-pizza-server.herokuapp.com/collections/awg-comments/", function(data){
			for(var i = 0; i < data.length; i++){
				myDeleteArray.push(data[i]._id);
			}
		for(var j = 0; j < myDeleteArray.length; j++){
			$.ajax({
				type: "DELETE",
				url: "https://tiny-pizza-server.herokuapp.com/collections/awg-comments/"+myDeleteArray[j],
				success: function(){
					console.log("all gone");
				}
			})
		}
			
		});
	});

	$submitImage.on("click", function(){
		$sendError.html("");
		var anImage = new AnImage();

		anImage.set("imageUrl", $("#image-url").val()); 
		anImage.set("theCaption", $("#caption").val());
		anImage.set("id", anImage.cid);

		if(anImage.isValid()){
			imageBoard.add(anImage);
			$("#image-url").val("");
			$("#caption").val("");
			$sendSuccess.hide().html("Successfully Uploaded!").fadeIn(1000);
			setTimeout(function(){
				$sendSuccess.fadeOut("slow")
			},3000);
			anImage.save();

				$("#submit-comment-form-"+anImage.cid).on("submit", function(event){
					event.preventDefault();
					var comment = new Comments();
					comment.set("text", $("#input-"+anImage.cid).val());
					comment.set("postID", anImage.cid);
					commentsCollection.add(comment);
					var imageComment = imageBoard.get(anImage.cid);
					imageComment.attributes.comment.push(comment.get("text"));
					imageComment.save()
					comment.save();
				});
			
		} else {
			$sendError.html(anImage.validationError);
		}
		
	});

	$cancel.on("click", function(){
		$imageForm.slideUp("slow");
	});
	
	$buttonExpand.on("click", function(){
		$imageForm.slideToggle("slow");		
	});
});