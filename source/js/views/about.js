define(function(
	require
) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/about');


	var aboutView = Backbone.View.extend({

		events: {
			'click .spec': 'special'
		},
		template: tmpl,
		initialize: function ( options ) {
			this._session = options.session;
			this._special = 0;
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
			Backbone.Events.trigger('setBlur', {
				'status': 'dark'
			});
			this.render();
			this.$el.show();
			return this;
		},
		hide: function () {
			Backbone.Events.trigger('setBlur', {
				'status': 'light'
			});
			this.$el.hide();
			return this;
		},

		special: function(e) {
			this._special++;
			if (this._special === 13) {
				alert("grats!!!");
			}
		}
	});

	return aboutView;
});
