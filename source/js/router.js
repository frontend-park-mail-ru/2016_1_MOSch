define(function (require) {

	var Backbone = require('backbone'),
		Session = require('models/session'),
		appView = require('views/application');

	var Router = Backbone.Router.extend({
		routes: {
			'about': 'show',
			'scoreboard': 'show',
			'login': 'show',
			'register': 'show',
			'game/upgrade': 'show',
			'game/multi': 'show',
			'game/single': 'show',
			'main': 'show',
			'menu': 'show', // когда пользователь залогинился
			'*default': 'showMain'
		},
		initialize: function (options) {
			options = options || {};
			this._view = new appView();
			this._view.render();
		},

		show: function (options) {
			options = options || {};
			var route = Backbone.history.getFragment();
			console.log('The \"%s\" route', route);
			this._view.show({'view': route});
		},

		showMain: function (options) {
			options = options || {};
			console.log('The \"main\" route');
			this._view.show({'view': 'main'});
		}
	});

	return Router;
});
