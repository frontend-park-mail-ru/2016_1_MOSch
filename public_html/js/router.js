define([
	'backbone'
], function(Backbone) {
	var Backbone = require('backbone'),
		loginView = require('views/login'),
		mainView = require('views/main'),
		gameView = require('views/game'),
		scoreboardView = require('views/scoreboard');
		menuView = require('views/menu'),
		registerView = require('views/register'),
		aboutView = require('views/about'),
		upgradeView = require('views/game'),
		multiView = require('views/game'),
		singleView = require('views/game');

	var Router = Backbone.Router.extend({
		routes: {
			'scoreboard': 'scoreboardAction',
			'register': 'registerAction',
			'login': 'loginAction',
			'about': 'aboutAction',
			'upgrade': 'upgradeAction',
			'multi': 'multiAction',
			'single': 'singleAction',
			'menu': 'menuAction',
			'*default': 'defaultActions'
		},
		defaultActions: function () {
			console.log(mainView);
			$('.content').html(mainView.render().$el);
		},
		menuActions: function () {
			console.log(menuView);
			$('.content').html(menuView.render().$el);
		},
		scoreboardAction: function () {
			console.log('the #scoreboard route');
			$('.content').html(scoreboardView.render().$el);
		},
		registerAction: function () {
			console.log('the #register route');
			$('.content').html(registerView.render().$el);
		},
		loginAction: function () {
			console.log('the #login route');
			$('.content').html(loginView.render().$el);
		},
		aboutAction: function () {
			console.log('the #about route');
			$('.content').html(aboutView.render().$el);
		},
		upgradeAction: function () {
			console.log('the #upgrade route');
			$('body').html(upgradeView.render().$el);
		},
		multiAction: function () {
			console.log('the #multi route');
			$('body').html(multiView.render().$el);
		},
		singleAction: function () {
			console.log('the #single route');
			$('body').html(singleView.render().$el);
		}
	});

	return new Router();
});
