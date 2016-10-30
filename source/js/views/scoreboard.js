define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/scoreboard'),
		Users = require('collections/users'),
		$ = require('jquery'),
		PAGINATOR = 7;

	var scoreboardView = Backbone.View.extend({

		template: tmpl,
		initialize: function (options) {
			this._user = options.user;
			this.$el.hide();
			this.page = 0;
			this.pages = 0;
		},
		render: function () {
			this.users = new Users();
			var data = {
				items: []
			};
			this.$el.html(this.template(data));
			this.$('.scoreboard__title--before').hide();
			this.$('.scoreboard__title--after').hide();
			Backbone.sync("read", this.users, {
				success: this.updateScores.bind(this),
				error: function (model, xhr, options) {
					xhr.responseJSON = xhr.responseJSON || {'message': 'please, try later'};
					console.log('Error: ' + xhr.statusText + '. Message: ' + xhr.responseJSON.message);
					Backbone.Events.trigger('showToast', {
						'type': 'alert',
						'text': 'Unable to load scores: ' + xhr.responseJSON.message.toLowerCase()
					});
				}.bind(this)
			});

			return this;
		},

		updateScores: function (users, data, opts) {
			this.users = users;
			for (var i = 0; i < users.length; i++) {
				users[i].n = i + 1;
			}
			var a = users.length / PAGINATOR;
			var b = ((users.length / PAGINATOR) | 0);
			this.pages = (a === b) ? a : b + 1;
			if (this.pages > 0) {
				this.showPage(1);
			} else {
				this.$('.scoreboard__title--before').hide();
				this.$('.scoreboard__title--after').hide();
			}
		},

		show: function () {
			this.render();
			this.$el.show();
			return this;
		},
		hide: function () {
			this.$el.hide();
			return this;
		},
		showPage: function (page) {
			var data = {
				items: []
			};
			for (var i = (page - 1) * PAGINATOR; i < page * PAGINATOR; i++) {
				data.items.push(this.users[i]);
			}
			this.page = page;
			this.$el.html(this.template(data));
			if (this.page === 1) {
				this.$('.scoreboard__title--before').html('');
			} else {
				this.$('.scoreboard__title--before').click(this.showPrev.bind(this));
			}
			if (this.page === this.pages) {
				this.$('.scoreboard__title--after').html('');
			} else {
				this.$('.scoreboard__title--after').click(this.showNext.bind(this));
			}
		},
		showNext: function () {
			if (this.page < this.pages) {
				this.showPage(this.page + 1);
			}
		},
		showPrev: function () {
			if (this.page > 1) {
				this.showPage(this.page - 1);
			}
		}
	});

	return scoreboardView;
});
