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
			'refresh': 'refreshWindow',
			'*default': 'showMenu'
		},
		initialize: function (argument) {
			this.view = argument;
			this.last = null;
		},
		refreshWindow:function () {
			this.showMenu({forced:true});
		},
		showMenu: function (options) {
			options = options || { 'forced': false };
			if (this.last !== this.showMenu || options['forced'] === true) {
				console.log('The default route. We show main menu');
				$('body').html(this.view.render({ 'view': 'mainMenu' }).$el);
				this.last = this.showMenu;
			}
		},
		showAbout: function (options) {
			options = options || { 'forced': false };
			if (this.last !== this.showAbout || options['forced'] === true) {
				console.log('The #about route. We show about screen');
				$('body').html(this.view.render({ 'view': 'about' }).$el);
				this.last = this.showAbout;
			}
		},
		showScore: function (options) {
			options = options || { 'forced': false };
			if (this.last !== this.showScore || options['forced'] === true) {
				console.log('The #scoreboard route. We show scores');
				$('body').html(this.view.render({ 'view': 'scoreboard' }).$el);
				this.last = this.showScore;
			}
		},
		showLoginForm: function (options) {
			options = options || { 'forced': false };
			if (this.last !== this.showLoginForm || options['forced'] === true) {
				console.log('The #login route. We show login form');
				$('body').html(this.view.render({ 'view': 'login' }).$el);
				this.last = this.showLoginForm;
			}
		},
		showRegisterForm: function (options) {
			options = options || { 'forced': false };
			if (this.last !== this.showRegisterForm || options['forced'] === true) {
				console.log('The #register route. We show registration form');
				$('body').html(this.view.render({ 'view': 'register' }).$el);
				this.last = this.showRegisterForm;
			}
		},
		upgradeActions: function () {
			console.log('The #upgrade route. We show upgrade screen');
			$('body').html(this.view.render({ 'view': 'game', 'action': 'upgrade' }).$el);
			this.last = this.upgradeActions;
		},
		multiplayerActions: function () {
			console.log('The #multi route. We start multiplayer game');
			$('body').html(this.view.render({ 'view': 'game', 'action': 'play', 'mode': 'multiplayer' }).$el);
			this.last = this.multiplayerActions;
		},
		singleplayerActions: function () {
			console.log('The #single route. We start singleplayer game');
			$('body').html(this.view.render({ 'view': 'game', 'action': 'play', 'mode': 'singleplayer' }).$el);
			this.last = this.singleplayerActions;
		}
	});

	return Router;
});
