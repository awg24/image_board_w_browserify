var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

var AnImage = require("../Image.js");

module.exports = Backbone.Collection.extend({
	model: AnImage,
	url: "https://tiny-pizza-server.herokuapp.com/collections/awg-imagboard/"
});