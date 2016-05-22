define(function (require) {
	var func = function (engine, canvas) {
		var Backbone = require('backbone'),
			BABYLON = require('babylon'),
			modes = require('models/modes');

		var Vector2 = BABYLON.Vector2;
		var Vector3 = BABYLON.Vector2;
		var Color4 = BABYLON.Color4;
		var Rectangle2D = BABYLON.Rectangle2D;
		var Size = BABYLON.Size;
		var Text2D = BABYLON.Text2D;
		var PrimitivePointerInfo = BABYLON.PrimitivePointerInfo;
		var ArcRotateCamera = BABYLON.ArcRotateCamera;
		var Canvas2D = BABYLON.Canvas2D;
		var ActionManager = BABYLON.ActionManager;
		var ExecuteCodeAction = BABYLON.ExecuteCodeAction;

		var scene = new BABYLON.Scene(engine);
		var DPR = window.getDevicePixelRatio();
		if (!DPR) {
			DPR = 1;
		}
		var width = engine.getRenderWidth(false) / DPR;
		var height = engine.getRenderHeight(false) / DPR;
		var canvas2D = Canvas2D.CreateScreenSpace(scene, 'ScreenCanvas', new Vector2(0, 0), new Size(width * DPR, height * DPR), Canvas2D.CACHESTRATEGY_DONTCACHE);
		canvas2D.backgroundFill = Canvas2D.GetSolidColorBrushFromHex('#031423FF');
		canvas2D.backgroundRoundRadius = 0;
		var buttonRectSingle, buttonRectMulti;
		if (width >= 1024) {
			var y = height - 450;
			var x1 = ((width - 290 - 120) / 2) | 0;
			var x2 = 120 + ((width + 290 - 120) / 2) | 0;
			buttonRectSingle = Rectangle2D.Create(canvas2D, 'button1', x1 * DPR, y * DPR, 290 * DPR, 85 * DPR, Canvas2D.GetSolidColorBrushFromHex('#BA2F19FF'));
			buttonRectMulti = Rectangle2D.Create(canvas2D, 'button2', x2 * DPR, y * DPR, 290 * DPR, 85 * DPR, Canvas2D.GetSolidColorBrushFromHex('#BA2F19FF'));
			var text3 = Text2D.Create(canvas2D, 'question', ((width / 2) | 0) * DPR, (height - 250) * DPR, ((28 * DPR) | 0) + 'pt Arial', 'Select game mode:', Color4.FromHexString('#FFFFFFFF'));
		} else {
			var sh = ((height - 350) / 2) | 0;
			var x = (width / 2) | 0;
			var y1 = height - 120 - sh;
			var y2 = y1 - 40 - 85;
			buttonRectSingle = Rectangle2D.Create(canvas2D, 'button1', x * DPR, y1 * DPR, 290 * DPR, 85 * DPR, Canvas2D.GetSolidColorBrushFromHex('#BA2F19FF'));
			buttonRectMulti = Rectangle2D.Create(canvas2D, 'button2', x * DPR, y2 * DPR, 290 * DPR, 85 * DPR, Canvas2D.GetSolidColorBrushFromHex('#BA2F19FF'));
			var text3 = Text2D.Create(canvas2D, 'question', ((width / 2) | 0) * DPR, (height - 40 - sh) * DPR, ((28 * DPR) | 0) + 'pt Arial', 'Select game mode:', Color4.FromHexString('#FFFFFFFF'));
		}
		buttonRectSingle.roundRadius = 10 * DPR;
		buttonRectMulti.roundRadius = 10 * DPR;
		var text1 = Text2D.Create(buttonRectSingle, 'buttonText1', 0, 0, 'bold ' + ((22 * DPR) | 0) + 'pt Arial', 'SINGLEPLAYER', Color4.FromHexString('#FFFFFFFF'));
		var text2 = Text2D.Create(buttonRectMulti, 'buttonText2', 0, 0, 'bold ' + ((22 * DPR) | 0) + 'pt Arial', 'MULTIPLAYER', Color4.FromHexString('#FFFFFFFF'));


		buttonRectSingle.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, function (modes, bb, evt) {
			bb.Events.trigger('startGame', modes.singleplayer);
		}.bind(null, modes, Backbone)));

		buttonRectMulti.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, function (modes, bb, evt) {
			bb.Events.trigger('startGame', modes.multiplayer);
		}.bind(null, modes, Backbone)));

		var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
		camera.setTarget(BABYLON.Vector3.Zero());
		camera.attachControl(canvas, true);
		return scene;
	};

	return func;
});
