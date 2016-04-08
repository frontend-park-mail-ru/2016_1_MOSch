define(function(
	require
) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/game');

	var gameView = Backbone.View.extend({

		template: tmpl,
		initialize: function ( options ) {
			this._session = options.session;
			this.$el.hide();
		},
		render: function () {
			this.$el.html(this.template());
			return this;
		},
		show: function () {
			// if (!this._session.get('logged_in')) {
			// 	Backbone.Events.trigger('showToast', {
			// 		'type': 'info',
			// 		'text': 'You are not registered'
			// 	});
			// 	Backbone.history.navigate('main', { trigger: true });
			// 	return;
			// }
			this.render();
			this.$el.show();
			return this;
		},
		hide: function () {
			this.$el.hide();
			return this;
		}

	});

	return gameView;
});
