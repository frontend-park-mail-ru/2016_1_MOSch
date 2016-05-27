define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		cfg = require('models/gameconfig'),
		_ = require('underscore');

	var startFunc = function () {
		this._scene = new BABYLON.Scene(this._engine);
		this._scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

		this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(11, 6, -11), this._scene);
		this._camera.setTarget(BABYLON.Vector3.Zero());
		this._camera.attachControl(this._canvas3d, true);

		this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(6, 10, 2), this._scene);
		this._light.intensity = 0.6;

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
		this._env.currentColor = startColor;
		this._env.colorStep = 0;
		this._env.colorStepH = 0;
		this._state = states.play;
		this._engine.runRenderLoop(require('models/gamerender').bind(this));


		window.addEventListener('resize', this.updateSize.bind(null, this._canvas2d, this._engine));
		window.addEventListener('keydown', this.keyGrabber.bind(null, this));
		this._pauseButton.addEventListener('click', this.pause.bind(this));

		this._canvas3d.addEventListener('click', this.action.bind(this));
	};

	return startFunc;

});
