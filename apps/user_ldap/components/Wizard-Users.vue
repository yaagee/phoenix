<template>
	<div class="uk-card uk-card-default">
	    <div class="uk-card-header">
	        <h3 class="uk-card-title">Users</h3>
	    </div>
		<div class="uk-card-body" v-if="expanded">
			<p>
				ownCloud access is limited to users meeting these criteria:
			</p>
			<div class="uk-grid-small" uk-grid>
				<div class="uk-width-1-1">
					<label class="uk-form-label">Only these object classes:</label>
					<select class="uk-select" v-model="users.filterObjectclass">
						<option v-for="(option, oid) in options.filterObjectclass" :value="option.value"> {{ option.text }}</option>
					</select>
					<span class="uk-text-meta">
						The most common object classes for users are organizationalPerson, person, user, and inetOrgPerson. If you are not sure which object class to select, please consult your directory admin.
					</span>
				</div>
				<div class="uk-width-1-1">
					<input class="uk-input" type="text" value="uid" disabled>
				</div>
				<div class="uk-width-1-1">
					<label class="uk-form-label">User Display Name Field:</label>
					<input class="uk-input" type="text" v-model="users.displayNameField">
				</div>
				<div class="uk-width-1-1">
					<label class="uk-form-label">2nd User Display Name Field:</label>
					<input class="uk-input" type="text" v-model="users.displayNameField2">
				</div>
				<div class="uk-width-1-1">
					<label class="uk-form-label">Only from these groups:</label>
					<select class="uk-select" v-model="users.filterGroups" placeholder="Only from these groups:">
						<option v-for="(option, oid) in options.filterGroups" :value="option.value"> {{ option.text }}</option>
					</select>
				</div>
				<div class="uk-width-1-1 uk-margin-large-bottom">
					<textarea class="uk-textarea" placeholder="LDAP Filter" style="font-family:Courier" v-model="users.filter"></textarea>
				</div>
	    	</div>
		</div>
	</div>
</template>
<script>
export default {
	props: ["users"],
	data () {
		return {
			expanded: false,
			options : {
				filterObjectclass : [
					{ value : "max_mustermann", text : "Max Mustermann" },
					{ value : "felix_heidecke", text : "Felix Heidecke" }
				],
				filterGroups : [
					{ value : "admins", text : "Admins" },
					{ value : "stupid", text : "Blödis" }
				]
			}
		}
	},
}
</script>
