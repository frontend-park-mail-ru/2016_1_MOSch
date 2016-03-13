define(function(
	require
) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/main');

	var mainView = Backbone.View.extend({

		el: '.content',
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

	return mainView;
});
