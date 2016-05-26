define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		cfg = require('models/gameconfig'),
		_ = require('underscore');

	var Game = function (mode, user) {
		this.start = start;
		this.animate = animate;
		this.destroy = destroy;
		this.updateSize = updateSize;
		this._canvas2d = document.getElementById('2dcanvas');
		this._canvas3d = document.getElementById('3dcanvas');
		this._scoresElem = document.getElementById('scores');
		this._pauseButton = document.getElementById('pause');
		this._ctx = this._canvas2d.getContext('2d');
		this._engine = new BABYLON.Engine(this._canvas3d, true);
		this._scene = null;
		this.updateSize(this._canvas2d, this._engine);
		this._mode = mode;
		this._user = user;
		this._objs = null;
		this._score = 0;
		this._state = null;
	};

	var start = function () {
		this._objs = {};
		window.addEventListener('resize', this.updateSize.bind(null, this._canvas2d, this._engine));

		this._scene = new BABYLON.Scene(this._engine);
		this._scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

		this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(12, 6, -12), this._scene);
		this._camera.setTarget(BABYLON.Vector3.Zero());
		this._camera.attachControl(this._canvas3d, true);

		this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(6, 10, 2), this._scene);
		this._light.intensity = 0.4;

		// this._skyboxMaterial = new BABYLON.StandardMaterial('skyBox', this._scene);
		// this._skyboxMaterial.backFaceCulling = false;
		// this._skyboxMaterial.disableLighting = true;
		// this._skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
		// this._skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
		// this._skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('/img/textures/skybox', this._scene);
		// this._skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
		// this._skybox = BABYLON.Mesh.CreateBox('skyBox', 200.0, this._scene);
		// this._skybox.material = this._skyboxMaterial;
		// this._skybox.infiniteDistance = true;
		// this._skybox.renderingGroupId = 0;


		this._blocks = [];
		var startColorH = _.random(360);
		var startColor = ColorJS({hue: startColorH, saturation: 0, lightness: cfg.colorL});
		cfg.cntColoredStartBlocks = cfg.cntColoredStartBlocks || 1;
		var stepS = cfg.colorS / cfg.cntColoredStartBlocks;
		for (var i = -cfg.cntStartBlocks; i < 0; i++) {
			var block = BABYLON.Mesh.CreateBox('box', 1.0, this._scene, true);
			block.scaling = cfg.defaultBoxScaling;
			block.position.y = i * cfg.defaultBoxScaling.y;
			if (i >= -cfg.cntColoredStartBlocks) {
				startColor = startColor.setSaturation(startColor.getSaturation() + stepS);
			}
			block.material = new BABYLON.StandardMaterial("texture", this._scene);
			block.material.diffuseColor = new BABYLON.Color3(startColor.getRed(), startColor.getGreen(), startColor.getBlue());
			this._blocks.push(block);
		}
		this._color = startColor;
		this._colorJumpStep = 0;

		this.addBlock = addBlock;
		this._state = states.play;

		this._scene.registerBeforeRender(function (skybox) {
			//skybox.rotation.y += 0.0002;
		}.bind(null, this._skybox));

		this._engine.runRenderLoop(function () {
			if (this._state === states.play) {
				this._scoresElem.innerHTML = this._score;
				this._pauseButton.innerHTML = 'pause';
			}
			if (this._state === states.pause) {
				this._scoresElem.innerHTML = 'paused';
			}
			if (this._state === states.finish) {
				this._scoresElem.innerHTML = 'your score: ' + this._score;
			}

			this._scene.render();
		}.bind(this));

		this.addBlock();
		this.addBlock();
		this.addBlock();
		this.addBlock();
		this.addBlock();
		this.addBlock();
		this.addBlock();
		this.addBlock();
		this.addBlock();
		this.addBlock();
		this.addBlock();
		this.addBlock();
		this.addBlock();
		this.addBlock();
		this.addBlock();
	};

	var destroy = function () {
		this._engine.dispose();
	};

	var animate = function () {
		console.log('animate');
	};

	var addBlock = function () {
		this._score++;
		if (this._colorJumpStep == 0 && _.random(100000) / 100000 <= cfg.colorJumpProbability) {
			var rnd = _.random(-500, 500) / 1000;
			var sign = 1;
			if (rnd < 0) {
				sign = -1;
			}
			var chng = rnd * cfg.bigColorStepH + sign * cfg.colorStepH;
			this._color = this._color.setHue((this._color.getHue() + chng) % 360);
			this._colorJumpStep = cfg.stepCnt;
		} else {
			this._color = this._color.setHue((this._color.getHue() + cfg.colorStepH) % 360);
			if (this._colorJumpStep > 0) {
				this._colorJumpStep--;
			}
		}
		var block = BABYLON.Mesh.CreateBox('box', 1.0, this._scene, true);

		block.scaling = cfg.defaultBoxScaling;
		block.position.y = this._blocks[this._blocks.length - 1].position.y + cfg.defaultBoxScaling.y;
		this._camera.position.y += cfg.defaultBoxScaling.y;
		block.material = new BABYLON.StandardMaterial("texture", this._scene);
		block.material.diffuseColor = new BABYLON.Color3(this._color.getRed(), this._color.getGreen(), this._color.getBlue());
		this._blocks.push(block);
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
