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
		window.addEventListener('resize', this.updateSize.bind(null, this._canvas2d, this._engine));
		this._scene = new BABYLON.Scene(this._engine);
		this._scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
		this._camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), this._scene);
		this._camera.setTarget(BABYLON.Vector3.Zero());
		this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0),  this._scene);
		this._light.intensity = 0.4;
		this._sphere = BABYLON.Mesh.CreateSphere("sphere1", 32, 2, this._scene);
		this._sphere.position.y = 1;
		this._ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, this._scene);
		this._engine.runRenderLoop(function () {
			this._scene.render();
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
