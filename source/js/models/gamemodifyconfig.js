define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		_ = require('underscore'),
		$ = require('jquery');

	var modifyConfigFunc = function () {
		if (!this._user.loggedIn()) {
			return;
		}
		console.log(this.cfg);
		for (var i = 0; i < this.cfg.bafs.length; i++) {
			var entity = this.cfg.bafs[i];
			if (this._user.get(entity)) {
				_.extend(this.cfg, this.cfg[entity]);
			}
		}
		console.log('after');
		console.log(this.cfg);
	};

	return modifyConfigFunc;

});
