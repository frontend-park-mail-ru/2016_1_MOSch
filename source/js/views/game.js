define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/game'),
		BABYLON = require('babylon'),
		Game = require('models/game'),
		CreateSelectScene = require('models/scenes/select'),
		CreateRulesScene = require('models/scenes/rules'),
		modes = require('models/modes');

	var gameView = Backbone.View.extend({

		template: tmpl,
		initialize: function (options) {
			this._user = options.user;
			this._canvas = null;
			this._engine = null;
			this._game = null;
			this._scene = null;
			this._mode = null;
			this._action = null;
			this.$el.hide();
		},
		render: function () {
			this.$el.html(this.template());
			return this;
		},
		show: function () {
			this.render();
			this.$el.show();
			this._canvas = document.getElementById('3dcanvas');
			this._engine = new BABYLON.Engine(this._canvas, true);
			this._mode = modes.unlogged;
			Backbone.Events.once('startGame', this.startGame, this);
			if (1 || this._user.loggedIn()) {
				this._action = CreateSelectScene;
				this._scene = CreateSelectScene(this._engine, this._canvas);
				this._engine.runRenderLoop(this.renderFunction.bind(this));
			} else {
				Backbone.Events.trigger('startGame', modes.unlogged);
			}
			window.addEventListener('resize', this.resizeView.bind(this));
			return this;
		},
		hide: function () {
			this.$el.hide();
			window.removeEventListener('resize', this.resizeView.bind(this));
			if (this._game) {
				this._game.destroy();
			}
			if (this._scene) {
				this._scene.dispose()
			}
			if (this._engine) {
				this._engine.clear(new BABYLON.Color3(0, 0, 0), true, true);
				this._engine.dispose()
			}
			this._canvas = null;
			this._engine = null;
			this._game = null;
			this._scene = null;
			this._mode = null;
			this._action = null;
			return this;
		},
		resizeView: function () {
			if (this._engine) {
				this._engine.resize();
				if (this._scene) {
					this._engine.stopRenderLoop(this.renderFunction.bind(this));
					this._engine.clear(new BABYLON.Color3(0, 0, 0), true, true);
					this._scene.dispose();
					this._scene = this._action(this._engine, this._canvas);
					this._engine.runRenderLoop(this.renderFunction.bind(this));
				}
			}
		},
		startGame: function (mode) {
			this._mode = mode || modes.unlogged;
			alert(this._mode);
			this._engine.stopRenderLoop(this.renderFunction.bind(this));
			if (this._scene) {
				this._scene.dispose();
			}
			if (this._engine) {
				this._engine.clear(new BABYLON.Color3(0, 0, 0), true, true);
			}
			this._scene = null;
		},
		renderFunction: function () {
			this._scene.render();
		}

	});

	return gameView;
});
