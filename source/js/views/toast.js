define(function (require) {

	var Backbone = require('backbone'),
		$ = require('jquery');

	var toastView = Backbone.View.extend({

		initialize: function () {

		},
		render: function (options) {
			this.$el.addClass('notice__toast');
			if (options.type === 'alert') {
				this.$el.addClass('notice__toast--alert');
			} else {
				this.$el.addClass('notice__toast--info');
			}
			this.$el.html(options.text);
			this.$el.fadeIn(500).delay(3000).fadeOut(500, function () {
				this.remove();
			});
			return this;
		},
		show: function () {

		},
		hide: function () {

		}

	});

	return toastView;
});
