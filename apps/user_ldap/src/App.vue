<template>
	<section data-app-id="user_ldap" class="uk-padding">
		<h1>LDAP integration</h1>
		<wizard></wizard>
	</section>
</template>
<script>
var pack = require('../package.json');

import Wizard from "../components/Wizard.vue";

export default {
	data () {
		return {

		}
	},
	components: {
		Wizard
	}
}
</script>
