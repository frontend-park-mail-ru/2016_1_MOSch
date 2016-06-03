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
			if (window.innerWidth < 1024) {
				this.special = function () {
				};
			}
			this.$el.hide();
		},
		render: function () {
			this.$el.html(this.template());
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
			if (this._special !== 13) {
				return;
			}

			this.$('.rectangle').show();
			this.$('.rectangle__answers--yes').click(function () {
				this.$('.rectangle').remove();
				if (this._user.loggedIn()) {
					var ans = this._user.get('answer');
					if (ans !== 'yes' && ans !== 'no') {
						this._user.updateData({
							answer: 'no'
						});
					}
				}
			}.bind(this));
			this.$('.rectangle__answers--no').click(this.joke.bind(this));
		},

		joke: function () {
			if (this._user.loggedIn()) {
				var ans = this._user.get('answer');
				if (ans !== 'yes' && ans !== 'no') {
					this._user.updateData({
						answer: 'yes'
					});
				}
			}
			this.$('.rectangle__question').remove();
			this.$('.rectangle__answers').remove();
			this.$('.rectangle__img').show();
			var Left = (1000 - window.innerWidth) / -2;
			var Top = (837 - window.innerHeight) / -2;

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
		}
	});

	return aboutView;
});
