define(function(
	require
) {

	var Backbone = require('backbone'),
		_ = require('underscore'),
		UserModel = require('models/user');

	var Session = Backbone.Model.extend({
		url: function() { return this.options.host + '/session'; },

		defaults: {
			session_uid: '',
			logged_in: false,
			user_id: '',
			user: null
		},

		options: {
			host: "/api"
		},

		initialize: function( options ){
			_.bindAll(this, "logout");

			// Singleton user object
			// Access or listen on this throughout any module with app.session.user
			this.set({ 'user': new UserModel({})});
			this.set({ 'session_uid': this.generateUid()});
			// default vars
			options = options || {};
			// parse options
			this.options = _.extend(this.options, options);
			// replace the whole URL if supplied
			if( !_.isUndefined(options.url) ) this.url = options.url;

			// we need to store data in a cookie
			this.store = this.cookie;

			// try loading the session
			// var localSession = this.store.get('session');
			var localSession = null;

			if( !(_.isNull(localSession) || _.isUndefined(localSession))) {
				this.set( JSON.parse( localSession ) );
				console.log(this.get('session_uid'));
				// reset the updated flag
				this.set({ logged_in: false });
				this.set({ user_id: '' });
				// fetch if not authenticated (every time)
				this.fetch( this.get('user') );
			}
			this.on('logout', this.logout);
		},


		// Fxn to update user attributes after recieving API response
		update: function( userData ){
			this.user.set(_.pick(userData, _.keys(this.user.defaults)));
		},

		cache: function(){
			// update the local session
			this.store.set('session', JSON.stringify( this.toJSON() ) );
		},

		// Destroy session
		logout: function( options ) {
			var self = this;
			options = options || {};
			// delete local version
			this.store.clear('session');
			this.set({ 'logged_in': false});
			this.set({ 'user_id': ''});
			this.set({ 'user': new UserModel({})});
			// notify remote
			Backbone.history.navigate('refresh', {trigger: true});
		},

		login: function() {

		},

		signup: function() {

		},

		// if data request fails request offline mode.
		error: function( model, req, options, error ){
			// consider redirecting based on statusCode
			console.log( req );
		},

		// Helpers
		// - Creates a unique id for identification purposes
		generateUid: function (separator) {

			var delim = separator || "-";

			function S4() {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			}

			return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
		}
	});

	return Session;
});
