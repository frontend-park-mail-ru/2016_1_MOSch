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
			this._price = _.clone(require('models/price'));
			for (var pos = 0; pos < price.length; pos++) {
				this._price[pos].money = true;
				this._price[pos].sold = !this._user.get(this._price[pos].name);
				if (this._price[pos].sold) {
					if (this._price[pos].cost_int > this._user.get('points')) {
						this._price[pos].money = false;
						this._price[pos].sold = false;
					}
				}

			}
			this.$el.html(this.template(this._price));
			return this;
		},
		show: function () {
			if (!this._user.loggedIn()) {
				Backbone.history.navigate('main', {trigger: true});
				return;
			}
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
			this.$el.html('');
			this.$el.hide();
			return this;
		},
		tryToBuy: function (item) {
			if (this._user.get('points') >= this._price[item].cost_int && !this._user.get(this._price[item].name)) {
				var obj = {};
				obj[this._price[item].name] = true;
				this._user.updateData(obj);
				Backbone.history.navigate('main', {trigger: true});
			}
		}
	});

	return upgradeView;
});
