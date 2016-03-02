define([
	'backbone'
], function(
	Backbone
) {
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
		initialize: function (argument) {
			this.view = argument;
		},
		showMenu: function () {
			console.log('The default route. We show main menu');
			$('body').html(this.view.render({ 'view': 'mainMenu' }).$el);
		},
		showAbout: function () {
			console.log('The #about route. We show about screen');
			$('body').html(this.view.render({ 'view': 'about' }).$el);
		},
		showScore: function () {
			console.log('The #scoreboard route. We show scores');
			$('body').html(this.view.render({ 'view': 'scoreboard' }).$el);
		},
		showLoginForm: function () {
			console.log('The #login route. We show login form');
			$('body').html(this.view.render({ 'view': 'login' }).$el);
		},
		showRegisterForm: function () {
			console.log('The #register route. We show registration form');
			$('body').html(this.view.render({ 'view': 'register' }).$el);
		},

		upgradeActions: function () {
			console.log('The #upgrade route. We show upgrade screen');
			$('body').html(this.view.render({ 'view': 'game', 'action': 'upgrade' }).$el);
		},
		multiplayerActions: function () {
			console.log('The #multi route. We start multiplayer game');
			$('body').html(this.view.render({ 'view': 'game', 'action': 'play', 'mode': 'multiplayer' }).$el);
		},
		singleplayerActions: function () {
			console.log('The #single route. We start singleplayer game');
			$('body').html(this.view.render({ 'view': 'game', 'action': 'play', 'mode': 'singleplayer' }).$el);
		}
	});

	return Router;
});
