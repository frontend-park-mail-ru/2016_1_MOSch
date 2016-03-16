define(function(
	require
) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/main');

	var mainView = Backbone.View.extend({

		template: tmpl,
		initialize: function ( options ) {
			this._session = options.session;
			this.$el.hide();
		},
		render: function () {
			var templatee = this.template();
			this.$el.html(templatee);
			return this;
		},
		show: function () {
			if (this._session.get('logged_in')) {
				Backbone.history.navigate('menu', { trigger: true });
				return;
			}
			this.render();
			this.$el.show();
			return this;
		},
		hide: function () {
			this.$el.hide();
			return this;
		}

	});

	return mainView;
});
