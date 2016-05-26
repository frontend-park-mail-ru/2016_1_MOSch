define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/game'),
		BABYLON = require('babylon'),
		Game = require('models/game'),
		SelectTmpl = require('tmpl/select'),
		RulesTmpl = require('tmpl/rules'),
		GameScreenTmpl = require('tmpl/gamescreen'),
		modes = require('models/modes');

	var gameView = Backbone.View.extend({

		template: tmpl,
		initialize: function (options) {
			this._user = options.user;
			this._game = null;
			this._mode = null;
			this.$el.hide();
		},
		render: function () {
			this.$el.html(this.template());
			return this;
		},
		show: function () {
			this.render();
			this.$el.show();
			this._mode = modes.unlogged;
			Backbone.Events.once('startGame', this.startGame, this);
			if (this._user.loggedIn()) {
				this.$('.gameWrap').html(SelectTmpl());
				this.$('#single').click(function (bb, modes) {
					bb.Events.trigger('startGame', modes.singleplayer);
				}.bind(null, Backbone, modes));
				this.$('#multi').click(function (bb, modes) {
					bb.Events.trigger('startGame', modes.multiplayer);
				}.bind(null, Backbone, modes));
			} else {
				Backbone.Events.trigger('startGame', modes.unlogged);
			}
			return this;
		},
		hide: function () {
			this.$el.hide();
			if (this._game) {
				this._game.destroy();
			}
			this.$('.gameWrap').html('');
			this._game = null;
			this._mode = null;
			return this;
		},
		startGame: function (mode) {
			this._mode = mode || modes.unlogged;
			Backbone.Events.once('start', this.start, this);
			this.$('.gameWrap').html(RulesTmpl());
			this.$('#start').click(function (bb) {
				bb.Events.trigger('start');
			}.bind(null, Backbone));
		},
		start: function () {
			console.log('Play ' + this._mode + ' mode!');
			this.$('.gameWrap').html(GameScreenTmpl());
			this._game = new Game(this._mode, this._user);
			this._game.start();
		}
	});

	return gameView;
});
