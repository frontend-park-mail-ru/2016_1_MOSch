define(function(
	require
) {

	var Backbone = require('backbone'),
		Session = require('models/session'),
		appView = require('views/application');

	var Router = Backbone.Router.extend({
		routes: {
			'': 'showMenu',
			'about': 'showAbout',
			'scoreboard': 'showScore',
			'login': 'showLoginForm',
			'register': 'showRegisterForm',
			'upgrade': 'upgradeActions',
			'multi': 'multiplayerActions',
			'single': 'singleplayerActions',
			'*default': 'showMenu'
		},
		initialize: function () {
			this._view = new appView();
		},
		showMenu: function (options) {
			console.log('The default route. We show main menu');
			this._view.render({ 'view': 'mainMenu' });
		},
		showAbout: function (options) {
			console.log('The #about route. We show about screen');
			this._view.render({ 'view': 'about' });
		},
		showScore: function (options) {
			console.log('The #scoreboard route. We show scores');
			this._view.render({ 'view': 'scoreboard' });
		},
		showLoginForm: function (options) {
			console.log('The #login route. We show login form');
			this._view.render({ 'view': 'login' });
		},
		showRegisterForm: function (options) {
			console.log('The #register route. We show registration form');
			this._view.render({ 'view': 'register' });
		},
		upgradeActions: function () {
			console.log('The #upgrade route. We show upgrade screen');
			this._view.render({ 'view': 'game', 'action': 'upgrade' });
		},
		multiplayerActions: function () {
			console.log('The #multi route. We start multiplayer game');
			this._view.render({ 'view': 'game', 'action': 'play', 'mode': 'multiplayer' });
		},
		singleplayerActions: function () {
			console.log('The #single route. We start singleplayer game');
			this._view.render({ 'view': 'game', 'action': 'play', 'mode': 'singleplayer' });
		}
	});

	return Router;
});
