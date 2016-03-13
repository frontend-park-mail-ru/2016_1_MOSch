define(function(
	require
) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/about'),
		metriks = require('models/metricks');


	var aboutView = Backbone.View.extend({

		el: '.content',

		template: tmpl,
		initialize: function () {

		},
		render: function () {
			var metrik = new metriks();
			metrik.fetch({
				success: function(coll) {},
				error: function(coll, error) {
					console.log("Error: " + error.status+" "+error.statusText);
				}
			});

			var data = {
				reqrating: metrik.get('attendance'),
				onlinerating: metrik.get('max_online')
			};
			console.log(data);
			data.reqrating = 72000;
			data.onlinerating = 666;
			this.$el.html(this.template(data));
			return this;
		},
		show: function () {

		},
		hide: function () {

		}

	});

	return aboutView;
});
