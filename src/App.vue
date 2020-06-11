<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<style>

</style>
<script>
	import storage from './storage';

	export default {
		name: 'app',
		components: {},
		data() {
			return {}
		},
		mounted() {
			storage.clear()
		}
	}
</script>
