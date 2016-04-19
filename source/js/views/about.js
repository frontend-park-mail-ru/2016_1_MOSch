define(function(
	require
) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/about');


	var aboutView = Backbone.View.extend({

		template: tmpl,
		initialize: function ( options ) {
			this._session = options.session;
			this.$el.hide();
		},
		render: function () {
			var data = {
				reqrating: 72000,
				onlinerating: 666
			};
			this.$el.html(this.template(data));
			return this;
		},
		show: function () {
			this.render();
			this.$el.show();
			return this;
		},
		hide: function () {
			this.$el.hide();
			return this;
		}
	});

	return aboutView;
});
