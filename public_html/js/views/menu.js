define(function(
	require
) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/menu');

	var menuView = Backbone.View.extend({

		template: tmpl,
		initialize: function () {

		},
		render: function () {
			this.$el.html(this.template());
			return this;
		},
		show: function () {

		},
		hide: function () {

		}

	});

	return menuView;
});
