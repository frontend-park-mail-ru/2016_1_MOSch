define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes');

	var Game = function (mode, user) {
		this.start = start;
		this.animate = animate;
		this.destroy = destroy;
		this.updateSize = updateSize;
		this._canvas2d = document.getElementById('2dcanvas');
		this._canvas3d = document.getElementById('3dcanvas');
		this._ctx = this._canvas2d.getContext('2d');
		this._engine = new BABYLON.Engine(this._canvas3d, true);
		this._scene = null;
		this.updateSize(this._canvas2d, this._engine);
		this._mode = mode;
		this._user = user;
		this._objs = null;
	};

	var start = function () {
		this._objs = {};
		this._objs.bgc = {};
		this._objs.bgc._ctx = this._ctx;
		this._objs.bgc.draw = drawBgc;
		window.addEventListener('resize', this.updateSize.bind(null, this._canvas2d, this._engine));
		this._scene = new BABYLON.Scene(this._engine);
		this._scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
		this._engine.runRenderLoop(function () {
			this._objs.bgc.draw();
			//this._scene.render();
		}.bind(this));
	};


	var destroy = function () {
		this._engine.dispose();
	};

	var animate = function () {
		console.log('animate');
	};

	var updateSize = function (canvas, engine) {
		var displayWidth = Math.floor(window.innerWidth);
		var displayHeight = Math.floor(window.innerHeight);
		if (canvas.width != displayWidth || canvas.height != displayHeight) {
			canvas.width = displayWidth;
			canvas.height = displayHeight;
		}
		engine.resize();
	};

	return Game;
});
