define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		crosses = require('models/crosses'),
		ColorJS = require('color'),
		GameScreenTmpl = require('tmpl/gamescreen'),
		_ = require('underscore'),
		$ = require('jquery'),
		GameCaptureTmpl = require('tmpl/gamecapture');

	var startFunc = function () {
		$('.gameWrap').html(GameScreenTmpl());
		$('#fade').hide();
		this._canvas2d = document.getElementById('2dcanvas');
		this._canvas3d = document.getElementById('3dcanvas');
		this._pauseButton = document.getElementById('pause');
		this._fadeElem = document.getElementById('fade');
		this._ctx = this._canvas2d.getContext('2d');
		this._engine = new BABYLON.Engine(this._canvas3d, true);
		this.updateSize(this._canvas2d, this._engine);
		this.modifyConfig();


		this._scene = new BABYLON.Scene(this._engine);
		this._scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

		this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(11, 6, 11), this._scene);
		this._camera.setTarget(BABYLON.Vector3.Zero());

		this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(6, 10, 2), this._scene);
		this._light.intensity = 0.6;

		var startColorH = _.random(360);
		var startColor = ColorJS({hue: startColorH, saturation: 0, lightness: this.cfg.colorL});
		this.cfg.cntColoredStartBlocks = this.cfg.cntColoredStartBlocks || 1;
		var stepS = this.cfg.colorS / this.cfg.cntColoredStartBlocks;
		for (var i = -this.cfg.cntStartBlocks; i < 0; i++) {
			var block = BABYLON.Mesh.CreateBox('box', 1.0, this._scene, true);
			block.scaling = this.cfg.defaultBoxScaling.clone();
			block.position.y = i * this.cfg.defaultBoxScaling.y;
			if (i >= -this.cfg.cntColoredStartBlocks) {
				startColor = startColor.setSaturation(startColor.getSaturation() + stepS);
			}
			block.material = new BABYLON.StandardMaterial("texture", this._scene);
			block.material.diffuseColor = new BABYLON.Color3(startColor.getRed(), startColor.getGreen(), startColor.getBlue());
			this._blocks.push(block);
		}
		var block2 = this._blocks[this._blocks.length - 1];
		block2.x_cross = crosses.x;
		block2.x_dir = crosses.px;
		block2.position.x = -5;
		this._color = startColor;
		this._colorJumpStep = this.cfg.stepCnt;
		this._env.currentColor = startColor;
		this._env.colorStep = 0;
		this._env.colorStepH = 0;
		this._env.hp = 0;
		this._iters = 0;
		this._trimRatio = this.cfg.trimPixels;
		this._state = states.pause;
		this.pause();


		this._scene.registerBeforeRender(require('models/gameanimation').bind(this));
		this._engine.runRenderLoop(require('models/gamerender').bind(this));
		this.updateSize = this.updateSize.bind(null, this._canvas2d, this._engine);
		this.keyGrabber = this.keyGrabber.bind(null, this);
		window.addEventListener('resize', this.updateSize);
		window.addEventListener('keydown', this.keyGrabber);
		if ('ontouchstart' in window) {
			// mobile device (work only in modern browsers)
			this._pauseButton.addEventListener('touchstart', this.pause);
			this._fadeElem.addEventListener('touchstart', this.pause);
			this._canvas3d.addEventListener('touchstart', this.action);
		} else {
			this._pauseButton.addEventListener('mousedown', this.pause);
			this._fadeElem.addEventListener('mousedown', this.pause);
			this._canvas3d.addEventListener('mousedown', this.action);
		}

		if (this._mode === modes.multiplayer) {
			$('#pause').hide();
			this._ws.onmessage = function (event) {
				console.log(event);
				var message = JSON.parse(event.data);
				switch (message.action) {
					case 'buildOK':
					{
						if (this.opponent === message.username.toUpperCase()) {
							this._opScore = message.height;
							this.showScore();
						}
						break;
					}
					case 'finishGame':
					{
						console.log('finish the game');
						this._score = message.myScore;
						this._opScore = message.enemyScore;
						this.finish();
						console.log('game finished');
						break;
					}
					case 'enemyLeft':
					{
						this._state = states.finish;
						$('#fade').show();
						$('#pause').hide();
						var data = {
							exitText: false,
							mainSize: 'small',
							mainText: this.opponent + ' leave the game',
							helpSize: 'small',
							helpText: false
						};
						window.removeEventListener('keydown', this.keyGrabber);
						if ('ontouchstart' in window) {
							// mobile device (work only in modern browsers)
							this._fadeElem.removeEventListener('touchstart', this.pause);
							this._fadeElem.addEventListener('touchstart', this.prettyClose);
							data.exitText = 'Tap to exit';
						} else {
							this._fadeElem.removeEventListener('mousedown', this.pause);
							this._fadeElem.addEventListener('mousedown', this.prettyClose);
							data.exitText = 'Click to exit';
						}

						window.removeEventListener('keydown', this.keyGrabber);
						$('#gameStatus').html(GameCaptureTmpl(data));
						break;
					}

				}
			}.bind(this);

			this._ws.onclose = function (event) {
				console.log('wss closed due to ' + event.reason);
				if (this._state !== states.finish) {
					this._state = states.finish;
					$('#fade').show();
					$('#pause').hide();
					var data = {
						exitText: false,
						mainSize: 'small',
						mainText: 'Unexpected error occurred',
						helpSize: 'small',
						helpText: false
					};
					window.removeEventListener('keydown', this.keyGrabber);
					if ('ontouchstart' in window) {
						// mobile device (work only in modern browsers)
						this._fadeElem.removeEventListener('touchstart', this.pause);
						this._fadeElem.addEventListener('touchstart', this.prettyClose);
						data.exitText = 'Tap to exit';
					} else {
						this._fadeElem.removeEventListener('mousedown', this.pause);
						this._fadeElem.addEventListener('mousedown', this.prettyClose);
						data.exitText = 'Click to exit';
					}

					window.removeEventListener('keydown', this.keyGrabber);
					$('#gameStatus').html(GameCaptureTmpl(data));
				}
			}.bind(this);

			this._ws.onerror = function (error) {
				console.log('wss error');
				console.log(error);
				console.log("Error " + error.message);
			}.bind(this);
		}
	};

	return startFunc;

});
