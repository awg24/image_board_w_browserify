var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

var Comments = require("./collections/Comments-Collection.js")
var comments = new Comments();
module.exports = Backbone.Model.extend({
	defaults:{
		imageUrl: null,
		theCaption: null,
		id: null,
		comment: comments
	},
	validate: function(attr, options){
		var checkForHttp = attr.imageUrl.substring(0,7);
		var checkForHttps = attr.imageUrl.substring(0,8);
		var checkForPic = attr.imageUrl.substring(attr.imageUrl.length-4,attr.imageUrl.length);

		if(attr.theCaption.length === 0 || attr.imageUrl.length === 0){
			return "*Both fields must not be empty";
		} else if(checkForHttp === "http://" || checkForHttps === "https://"){
			if(checkForPic === ".png" || checkForPic === ".jpg" ){
				return false;
			} else {
				return "*Only .png and .jpg formats are supported"
			}
		} else {
			return "*Must begin with https:// or http://";
		}

		return false;
		
	},
	urlRoot: "https://tiny-pizza-server.herokuapp.com/collections/awg-imagboard/",
	idAttribute: "_id"
});