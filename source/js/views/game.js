define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/game');

	var gameView = Backbone.View.extend({

		template: tmpl,
		initialize: function (options) {
			this._user = options.user;
			this.$el.hide();
		},
		render: function () {
			this.$el.html(this.template());
			return this;
		},
		show: function () {
			this.render();
			this.$el.show();
			if (this._user.loggedIn()) {
				var newScore = prompt('Представьте, что вы играли в игру. Введите сколько очков вы заработали:', '20');
				if (newScore && newScore !== '') {
					newScore = newScore | 0;
					this._user.set('rate', newScore);
					this._user.fetchData();
				}
			} else {
				alert('Game was here!')
			}
			Backbone.history.navigate('menu', {trigger: true});
			return this;
		},
		hide: function () {
			this.$el.hide();
			return this;
		}

	});

	return gameView;
});
