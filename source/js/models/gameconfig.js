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
		colorJumpProbability: 0.2
	};
});
