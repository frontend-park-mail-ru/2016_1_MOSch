define(
['configAPI', 'underscore', 'backbone'],
function(configAPI, _, Backbone) {
	function ApiManager() {
		this.LoadAPI();
	}

	_.extend(ApiManager.prototype, Backbone.Events);

	ApiManager.prototype.init = function() {
		var self = this;
	};

	ApiManager.prototype.LoadAPI = function() {
		var self = this;
		return this.init();
	};

	Backbone.sync = function(method, model, options) {
		options || (options = {});
		switch (method) {
			case 'create':
			break;

			case 'update':
			break;

			case 'delete':
			break;

			case 'read':
			break;
		}
	};

	return ApiManager;
});
