define(function (require) {

	var Backbone = require('backbone'),
		_ = require('underscore'),
		tmpl = require('tmpl/upgrade'),
		tmplUserbar = require('tmpl/userbar');

	var upgradeView = Backbone.View.extend({

		template: tmpl,
		initialize: function (options) {
			this._user = options.user;
			this._user.on('change', this.render.bind(this));
			this.$el.hide();
		},
		render: function () {
			this._price = _.clone(require('models/price'));
			var pos;
			for (pos = 0; pos < this._price.length; pos++) {
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
			for (pos = 0; pos < this._price.length; pos++) {
				if (this._price[pos].sold) {
					var elemID = '#ocard' + pos;
					console.log(elemID);
					this.$(elemID).click(this.tryToBuy.bind(this, +pos));
				}
			}
			var info = {};
			if (this._user.loggedIn()) {
				info = this._user.getInfo();
			}
			this.$('.userbar').html(tmplUserbar(info));
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
			console.log(+item);
			var diff = this._user.get('points') >= this._price[item].cost_int;
			console.log(+diff);
			if (diff >= 0 && !this._user.get(this._price[item].name)) {
				var obj = {};
				obj[this._price[item].name] = true;
				this._user.set(this._price[item].name, true);
				this._user.set('points', diff);
				console.log(obj);
				this._user.updateData(obj);
			}
			this.render();
		}
	});

	return upgradeView;
});
