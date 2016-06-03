define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		_ = require('underscore'),
		$ = require('jquery');

	var Game = function (mode, user) {
		this.start = require('models/gamestart').bind(this);
		this.finish = require('models/gamefinish').bind(this);
		this.pause = require('models/gamepause').bind(this);
		this.action = require('models/gameaction').bind(this);
		this.addBlock = require('models/gameaddblock').bind(this);
		this.fixBlock = require('models/gamefixblock').bind(this);
		this.prettyClose = require('models/gameprettyclose').bind(this);
		this.modifyConfig = require('models/gamemodifyconfig').bind(this);
		this.trash = require('models/gametrash').bind(this);
		var config = require('models/gameconfig');
		this.cfg = _.clone(config);
		this.destroy = destroy;
		this.updateSize = updateSize;
		this.keyGrabber = keyGrabber;
		this.showScore = showScore.bind(this);

		this._mode = mode || modes.unlogged;
		this._user = user;

		this._scene = null;
		this._state = null;
		this._score = 0;
		this._opScore = 0;
		this._env = {};
		this._blocks = [];
		this._trash = [];
	};

	var destroy = function () {
		if (this._engine) {
			this._engine.dispose();
		}
		window.removeEventListener('resize', this.updateSize);
		window.removeEventListener('keydown', this.keyGrabber);
		if (this._ws) {
			if (this._state === states.finish) {
				this._ws.close(1000, 'Finish the game');
			} else {
				this._ws.close(1000, 'Leave the game');
			}
		}
		this._ws = null;
		this._user.fetchData();
	};

	var updateSize = function (canvas, engine, evt) {
		var displayWidth = Math.floor(window.innerWidth);
		var displayHeight = Math.floor(window.innerHeight);
		if (canvas.width != displayWidth || canvas.height != displayHeight) {
			canvas.width = displayWidth;
			canvas.height = displayHeight;
		}
		engine.resize();
	};

	var keyGrabber = function (game, evt) {
		const KEYS = {
			'ESC': 27,
			'SPACE': 32,
			'PAUSE': 80,
			'ENTER': 13
		};
		switch (evt.keyCode) {
			case KEYS.ESC:
			case KEYS.PAUSE:
				evt.preventDefault();
				game.pause();
				break;
			case KEYS.SPACE:
				evt.preventDefault();
				game.action();
				break;
		}
	};

	var showScore = function () {
		this._scoresElem.innerHTML = this._score;
		if (this._mode === modes.multiplayer) {
			this._scoresElem.innerHTML = '<span class="opname">YOU vs ' + this.opponent + '!</span><br/>' + this._score + ' &ndash; ' + this._opScore;
		}
	};

	return Game;
});
