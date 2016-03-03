define([
	'underscore',
	'backbone',
	'models/user'
], function(
	_,
	Backbone,
	UserModel
){

	var Session = Backbone.Model.extend({
		url: function(){ return this.options.host + '/session' },

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
			var localSession = this.store.get('session');
			
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
		
		sync: function( method, model, options ) {
			// fallbacks
			options = options || {};
			console.log("method", method);
			// intercept local store actions
			switch(method){
				case "read":

				break;
				case "update":
					//this.store.set("session", JSON.stringify( model.toJSON() ) );
				break;
			}
			return Backbone.sync.call(this, method, model, options);
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

		// Stores
		cookie : {
			get : function( name ) {
				var i,key,value,cookies=document.cookie.split(";");
				for (i=0;i<cookies.length;i++){
					key=cookies[i].substr(0,cookies[i].indexOf("="));
					value=cookies[i].substr(cookies[i].indexOf("=")+1);
					key=key.replace(/^\s+|\s+$/g,"");
					if (key==name){
						return unescape(value);
					}
				}
			},

			set : function( name, val ){
				// automatically expire session in a day
				var expiry = 86400000;
				var date = new Date( ( new Date() ).getTime() + parseInt(expiry) );
				var value=escape(val) + ((expiry==null) ? "" : "; expires="+date.toUTCString());
				document.cookie=name + "=" + value;
			},

			check : function( name ){
				var cookie=this.get( name );
				if (cookie!=null && cookie!=""){
					return true;
				} else {
					return false;
				}
			},

			clear: function( name ) {
				document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			}
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
