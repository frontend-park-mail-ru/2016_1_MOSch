define(function (require) {

	var Backbone = require('backbone'),
		_ = require('underscore'),
		tmpl = require('tmpl/upgrade');

	var upgradeView = Backbone.View.extend({

		template: tmpl,
		initialize: function (options) {
			this._user = options.user;
			this.$el.hide();
		},
		render: function () {
			var price = _.clone(require('models/price'));
			this._user.set('points', 310000);
			this._user.set('speedBf', true);
			for (var pos = 0; pos < price.length; pos++) {
				price[pos].money = true;
				price[pos].sold = !this._user.get(price[pos].name);
				if (price[pos].sold) {
					if (price[pos].cost_int > this._user.get('points')) {
						price[pos].money = false;
						price[pos].sold = false;
					}
				}
			}
			this.$el.html(this.template(price));
			return this;
		},
		show: function () {
			// if (!this._user.loggedIn()) {
			// 	Backbone.history.navigate('main', {trigger: true});
			// 	return;
			// }
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
		}
	});

	return upgradeView;
});
