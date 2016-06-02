define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/game'),
		BABYLON = require('babylon'),
		Game = require('models/game'),
		SelectTmpl = require('tmpl/select'),
		RulesTmpl = require('tmpl/rules'),
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
				this.$('#single').click(function () {
					Backbone.Events.trigger('startGame', modes.singleplayer);
				});
				this.$('#multi').click(function () {
					Backbone.Events.trigger('startGame', modes.multiplayer);
				});
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
			if ('ontouchstart' in window) {
				if (this._mode === modes.multiplayer) {
					this.$('.rules--multi--mobile').show();
				} else {
					this.$('.rules--single--mobile').show();
				}
			} else {
				if (this._mode === modes.multiplayer) {
					this.$('.rules--multi--pc').show();
				} else {
					this.$('.rules--single--pc').show();
				}
			}
			this.$('#start').click(function () {
				Backbone.Events.trigger('start');
			});
		},
		start: function () {
			console.log('Play ' + this._mode + ' mode!');
			this._game = new Game(this._mode, this._user);
			if (this._mode === modes.multiplayer) {
				this.$('#start').hide();
				this.ws = new WebSocket("wss://buildthetower.ru/api/gameplay");

				this.ws.onopen = function() {
					alert("wss: соединение установлено.");
				};

				this.ws.onerror = function (error) {
					alert('wss error');
					console.log(error);
					console.log("Error " + error.message);
					Backbone.Events.trigger('showToast', {
						'type': 'alert',
						'text': 'No connection to the server, please, try later'
					});
					Backbone.history.navigate('menu', {trigger: true});
				}.bind(this);

				this.ws.onclose = function (event) {
					alert('wss close');
					console.log(event);
					console.log("Error " + event.reason);
					Backbone.Events.trigger('showToast', {
						'type': 'alert',
						'text': 'No connection to the server, please, try later'
					});
					Backbone.history.navigate('menu', {trigger: true});
				}.bind(this);

				this.ws.onmessage = function (event) {
					alert('wss message');
					console.log(event);
					var message = JSON.parse(event.data);
					if (message.action === 'startGame') {
						this._game.opponent = message.enemy.toUpperCase();
					}
					this._game._ws = this.ws;
					this._game.start();
				}.bind(this);

				this.$('.rules').html('Please wait. We are looking for your opponent.<br/>If waiting is too long, return to the menu and try to play in singleplayer mode.');
			} else {
				this._game.start();
			}
		}
	});

	return gameView;
});
