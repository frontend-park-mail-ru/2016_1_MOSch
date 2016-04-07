define(function(
	require
) {

	var Backbone = require('backbone');

	var MetricksModel = Backbone.Model.extend({
		urlRoot: '/api/metricks',

		defaults: {
			attendance: 0,
			max_online: 0
		},


		validate: function(attrs, options) {
			if (attes.attendance < 0) {
				return 'Значение параметра \"attendance\" должно быть больше нуля';
			}

			if (attes.max_online < 0) {
				return 'Значение параметра \"max_online\" должно быть больше нуля';
			}
		}
	});

	return MetricksModel;
});
