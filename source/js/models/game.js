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

		this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(10, 6, -10), this._scene);
		this._camera.setTarget(BABYLON.Vector3.Zero());
		this._camera.attachControl(this._canvas3d, true);

		this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(6, 10, 2), this._scene);
		this._light.intensity = 0.4;

		this._skyboxMaterial = new BABYLON.StandardMaterial('skyBox', this._scene);
		this._skyboxMaterial.backFaceCulling = false;
		this._skyboxMaterial.disableLighting = true;
		this._skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
		this._skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
		this._skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('/img/textures/skybox', this._scene);
		this._skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
		this._skybox = BABYLON.Mesh.CreateBox('skyBox', 200.0, this._scene);
		this._skybox.material = this._skyboxMaterial;
		this._skybox.infiniteDistance = true;
		this._skybox.renderingGroupId = 0;


		this._blocks = [];
		for (var i = -20; i < 0; i++) {
			var block = BABYLON.Mesh.CreateBox('box', 1.0, this._scene, true);
			block.scaling = new BABYLON.Vector3(4, 1, 4);
			block.position.y = i * 0.5;
			this._blocks.push(block);
		}
		this._scene.registerBeforeRender(function (skybox) {
			skybox.rotation.y += 0.0002;
		}.bind(null, this._skybox));
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
