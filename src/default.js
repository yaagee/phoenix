// --- Libraries ---

import Vue      from 'vue';
import _        from 'lodash';
import $        from 'jquery';
import filesize from 'filesize';


// --- Components ---

import TopBar   from './components/Top-Bar.vue';
import Menu     from './components/Menu.vue';
import Login    from './components/Login.vue';


// --- Plugins ---

import VueBus from 'vue-bus';
Vue.use(VueBus);

// --- Mixins ---

import Helper from './mixins/helper.js';

// --- Store ---

// import Vuex from 'vuex';
// Vue.use(Vuex);
import Store from './store.js'

// --- Adding global libraries ---

import UIkit  from 'uikit';
import Client from 'js-owncloud-client';

Vue.prototype.$uikit  = UIkit;
Vue.prototype.$client = new Client();
Vue.prototype.$store  = Store;

OC = new Vue({
	el       : "#oc-scaffold",
	name     : "phoenix",
	mixins   : [Helper],
	components: {
		'top-bar'   : TopBar,
		'side-menu' : Menu,
		'login'    : Login
	},
	data     : {
		appPath : '/apps',

		// config settings
		config  : {},
		server : {},

		// models
		nav     : [],
		apps    : [],
	},

	mounted () {
		// Start with loading the config
		this._loadConfig();

		this.$bus.on('phoenix:config-loaded', () => {
			this._setupApps()
		});

		this.$bus.on('phoenix:apps-setup', () => {
			this._bootApp(_.head(this.apps))
		});

		// setTimeout(() => {
		// 	this.$store.commit('increment')
		// }, 2000)
	},

	methods: {

		/**
		 * Write apps.json to this.apps
		 *
		 * @return Promise
		 */

		_loadConfig () {
			$.getJSON('config.json', (config) => {
				this.config = config;
				this.apps   = config.apps;
				this.$bus.emit('phoenix:config-loaded');
			}).fail((err) => {
				if (err.status === 404) {
					this.$uikit.notification({
						message: '<strong>config.json missing!</strong><br>Make sure to have this file in your root folder.',
						status: 'danger',
						timeout: 0
					});
				}

			});
		},


		/**
		 * Setup all available apps
		 *
		 * @return Promise
		 */

		_setupApps () {

			_.forEach(this.apps, (app, i) => {

				// TODO: Find better var name for 'foo'
				requirejs([this.appJS(app.id, 'boot')], ( foo ) => {
					let defaults = {
						enabled : true,
						running : false,
					};

					this.apps[i] = _.assignIn(defaults, foo.info);

					// inject self
					foo.setup(foo).then(() => {
						if (this.apps.length === ++i) {
							this.$bus.emit('phoenix:apps-setup')
						}
					})

				}, (err) => {
					this.warn(err);
				});
			});
		},


		/**
		 * Boot an application
		 *
		 * @param obj app with appId as key
		 * @return Promise
		 */

		_bootApp (app) {
			requirejs([this.appJS(app.id, 'boot')], ( App ) => {
				App.boot(this._spawnAppContainer(), App).then( () => {
					this._appSet(app.id, { 'running' : true });
					this.$bus.emit(app.id + ':booted');
				})
			})
		},

		_spawnAppContainer () {

			let attr = {
				id    : this.createRandom(),
				class : 'oc-app-container',
				text  : 'Loading ...'
			};

			// Reset app container
			$('#oc-content').html( $('<div>', attr ) );
			return `#${attr.id}`;
		},

		/**
		 * Change the model object of an app
		 *
		 * @param id appId
		 * @param payload object
		 */

		_appSet (id, payload) {

			let app   = this.getAppById(id),
				index = _.findIndex(app);

			this.apps[index] = _.assignIn(app, payload);
		},

		// ---------------------------------------------------------- helper ---

		getAppById( id ) {
			return _.find(this.apps, ["id", id] );
		},

		appJS( app, file ) {
			return ['apps', app, 'js', file + '.js'].join('/');
		},

		// -------------------------------------------- registration methods ---

		registerNavItem ( app, payload ) {
			this.nav.push(_.assign( { app }, payload ));
		},
	},
	computed : {
		userDisplayname () {
			return this.$store.getters.userDisplayname;
		},
		say () {
			return this.$store.getters.getSay;
		}
	}
})

export default OC;
