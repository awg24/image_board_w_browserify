var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

var Comments = require("../Comments.js");

module.exports = Backbone.Collection.extend({
	model: Comments,
	url: "https://tiny-pizza-server.herokuapp.com/collections/awg-comments/"
});