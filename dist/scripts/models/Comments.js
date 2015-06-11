var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults:{
		text: null,
		postID: null
	},
	validate: function(attr,options){
		return false;
	},
	urlRoot: "https://tiny-pizza-server.herokuapp.com/collections/awg-comments/",
	idAttribute: "_id"
});