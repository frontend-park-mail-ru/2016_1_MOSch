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
		this.trash = require('models/gametrash').bind(this);
		this.cfg = require('models/gameconfig');
		this.destroy = destroy;
		this.updateSize = updateSize;
		this.keyGrabber = keyGrabber;

		this._mode = mode || modes.unlogged;
		this._user = user;
		this._canvas2d = document.getElementById('2dcanvas');
		this._canvas3d = document.getElementById('3dcanvas');
		this._scoresElem = document.getElementById('scores');
		this._pauseButton = document.getElementById('pause');
		this._fadeElem = document.getElementById('fade');
		this._ctx = this._canvas2d.getContext('2d');
		this._engine = new BABYLON.Engine(this._canvas3d, true);

		this._scene = null;
		this._state = null;
		this._score = 0;
		this._env = {};
		this._blocks = [];
		this._trash = [];

		$('#fade').hide();
		updateSize(this._canvas2d, this._engine);
	};

	var destroy = function () {
		this._engine.dispose();
		window.removeEventListener('resize', this.updateSize);
		window.removeEventListener('keydown', this.keyGrabber);
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

	return Game;
});
