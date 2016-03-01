define([
	'backbone',
	'views/about',
	'views/login',
	'views/main',
	'views/game',
	'views/scoreboard',
	'views/menu',
	'views/register'
], function(
	Backbone,
	aboutView,
	loginView,
	mainView,
	gameView,
	scoreboardView,
	menuView,
	registerView
) {
	var Router = Backbone.Router.extend({
		routes: {
			'': 'defaultActions',
			'scoreboard': 'scoreboardActions',
			'register': 'registerActions',
			'login': 'loginActions',
			'about': 'aboutActions',
			'upgrade': 'upgradeActions',
			'multi': 'multiActions',
			'single': 'singleActions',
			'menu': 'menuActions',
			'main': 'mainActions',
			'*default': 'defaultActions'
		},
		initialize: function (argument) {
			argument.inittt = "test";
		},
		defaultActions: function () {
			console.log('the default route');
			alert("!!!");
			//var view = new mainView();
			$('body').html((new mainView()).render().$el);
		},
		menuActions: function () {
			console.log('the #menu route');
			$('body').html((new menuView()).render().$el);
		},
		mainActions: function () {
			console.log('the #menu route');
			$('body').html((new mainView()).render().$el);
		},
		scoreboardActions: function () {
			console.log('the #scoreboard route');
			$('body').html((new scoreboardView()).render().$el);
		},
		registerActions: function () {
			console.log('the #register route');
			$('body').html((new registerView()).render().$el);
		},
		loginActions: function () {
			console.log('the #login route');
			$('body').html((new loginView()).render().$el);
		},
		aboutActions: function () {
			console.log('the #about route');
			$('body').html((new aboutView()).render().$el);
		},
		upgradeActions: function () {
			console.log('the #upgrade route');
			$('body').html((new gameView({mode: "upgrade"})).render().$el);
		},
		multiActions: function () {
			console.log('the #multi route');
			$('body').html((new gameView({mode: "multi"})).render().$el);
		},
		singleActions: function () {
			console.log('the #single route');
			$('body').html((new gameView({mode: "route"})).render().$el);
		}
	});

	return Router;
});
