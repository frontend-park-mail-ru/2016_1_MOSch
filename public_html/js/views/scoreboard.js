define(function(
	require
) {

	var Backbone = require('backbone'),
		getExample = require('getExampleScoresCollection'),
		tmpl = require('tmpl/scoreboard');

	var scoreboardView = Backbone.View.extend({

		template: tmpl,
		initialize: function ( options ) {
			this._session = options.session;
			this.$el.hide();
		},
		render: function () {
			var data = {
				items: getExample().toJSON()
			};
			this.$el.html(this.template(data));
			return this;
		},
		show: function () {
			this.render();
			this.$el.show();
			return this;
		},
		hide: function () {
			this.$el.hide();
			return this;
		}
	});

	return scoreboardView;
});
