define(function (require) {

	var BABYLON = require('babylon');
	return {
		colorS: 70 / 100,
		colorL: 65 / 100,
		colorStepH: 11,
		envColorStepCnt: 13,
		envSpeedHp: 2,
		bigColorStepH: 79,
		cntStartBlocks: 25,
		stepCnt: 5,
		cntColoredStartBlocks: 15,
		defaultBoxScaling: new BABYLON.Vector3(4, 0.5, 4),
		colorJumpProbability: 0.2,
		block_speed: 0.13,
		block_speed_grow: 0.0012,
		specIters: 4,
		trimPixels: 0.005,
		minTrimPixels: 0.001,
		trimFallRatio: 0.000015
	};
});
