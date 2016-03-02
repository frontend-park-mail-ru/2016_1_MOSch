define([
	'backbone',
	'tmpl/wrapper'
], function(
	Backbone,
	wrapper
){

	var mainView = Backbone.View.extend({

		wrap: wrapper,
		//template: tmpl,
		initialize: function () {
			// TODO
		},
		render: function (options) {
			for (var key in options) {
				alert( "Ключ: " + key + " значение: " + options[key] );
			}
			this.$el.html(this.wrap());
			//this.$('.content').html(this.template());
			return this;
		},
		show: function () {
			// TODO
		},
		hide: function () {
			// TODO
		}

	});

	return mainView;
});
