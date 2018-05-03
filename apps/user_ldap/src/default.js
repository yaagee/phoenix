// ------------------------------------------------------------- Vue plugins ---

import Vue from 'vue';
import App from './App.vue';

const app = new Vue({
	name: "user_ldap",
	render: h => h(App),
	mounted () {
		this.$emit('mounted')
	}
});

export default define(app);
