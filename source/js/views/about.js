define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/about');


	var aboutView = Backbone.View.extend({

		events: {
			'click .spec': 'special'
		},
		template: tmpl,
		initialize: function (options) {
			this._user = options.user;
			this._special = 0;
			this.$el.hide();
		},
		render: function () {
			this.$el.html(this.template());
			this.$('.rectangle__question').text('Do you like JavaScript?');
			this.$('.rectangle__answers--yes').text('Yes');
			this.$('.rectangle__answers--no').text('No');
			return this;
		},
		show: function () {
			Backbone.Events.trigger('setBlur', {
				'status': 'dark'
			});
			this.render();
			this.$el.show();
			return this;
		},
		hide: function () {
			Backbone.Events.trigger('setBlur', {
				'status': 'light'
			});
			this.$el.hide();
			return this;
		},

		special: function (e) {
			this._special++;
			if (this._special === 13) {
				this.$('.rectangle').show();
				this.$('.rectangle__answers--yes').click(function () {
					this.$('.rectangle').remove();
				}.bind(this));
				this.$('.rectangle__answers--no').click(function () {
					this.$('.rectangle__question').remove();
					this.$('.rectangle__answers').remove();
					this.$('.rectangle__img').show();
					var width = 1000;
					var height = 837;
					var windowWidth = window.innerWidth;
					var windowHeight = window.innerHeight;
					var Left = (width - windowWidth) / -2;
					var Top = (height - windowHeight) / -2;

					this.$('.rectangle__img').animate({
						width: '1000px',
						top: Top + 'px',
						left: Left + 'px'
					}, 1500);
					this.$('.rectangle__img').animate({
						width: '0',
						top: '50%',
						left: '50%'
					}, 1500, null, function () {
						this.$('.rectangle').remove();
					}.bind(this));
				}.bind(this));
			}
		}
	});

	return aboutView;
});
