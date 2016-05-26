define(function (require) {

	var BABYLON = require('babylon');
	//var dpr = window.getDevicePixelRatio();
	var dpr = 1;
	return {
		colorS: 70 / 100,
		colorL: 65 / 100,
		colorStepH: 11,
		bigColorStepH: 79,
		cntStartBlocks: 25,
		stepCnt: 5,
		cntColoredStartBlocks: 15,
		defaultBoxScaling: new BABYLON.Vector3(4 * dpr, 0.5 * dpr, 4 * dpr),
		colorJumpProbability: 0.2
	};
});
