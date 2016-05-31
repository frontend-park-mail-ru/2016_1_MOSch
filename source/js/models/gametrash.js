define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		_ = require('underscore'),
		$ = require('jquery');

	var trushFunc = function (position, scaling, color) {
		var block = BABYLON.Mesh.CreateBox('box', 1.0, this._scene, true);
		block.scaling = scaling.clone() || this.cfg.defaultBoxScaling.clone();
		block.position = position.clone() || BABYLON.Vector3.Zero();
		// TODO
		block.position.y -= 100;
		block.material = new BABYLON.StandardMaterial("texture", this._scene);
		color = color ? color.darkenByAmount(0.5) : new ColorJS(50, 50, 50);
		block.material.diffuseColor = new BABYLON.Color3(color.getRed(), color.getGreen(), color.getBlue());
		this._trash.push(block);
	};

	return trushFunc;

});