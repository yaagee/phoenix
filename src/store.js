import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const Store = new Vuex.Store({
	state: {
		user : {
			displayname : "Anonymous",
			email       : null,
			enabled     : false,
			quota       : null
		},
		config : {}
	},
	mutations: {
		setUser: state, user => {
			state.user = user;
			OC.$bus.emit('store:set-user', user);
		},
		setConfig: state, config => {
			state.config = config;
			OC.$bus.emit('store:set-config', config);
		}
	},
	getters : {
		userIsEnabled: state => {
			return state.user.enabled;
		},
		userDisplayname: state => {
			return state.user.displayname;
		},
		userEmail: state => {
			return state.user.email;
		},
		userQuota : state => {
			if (!this.user.quota)
				return null

			if (!formatted)
				return this.user.quota;

			let form = {
				free  : filesize(this.user.quota.free),
				total : filesize(this.user.quota.total),
				used  : filesize(this.user.quota.used)
			};

			return _.assignIn(this.user.quota, form);
		},
	}
})

export default Store;
