<template>
	<div class="menu">
		<v-alert title="404" text="Page not found" type="info" variant="tonal">
		</v-alert>
	</div>
</template>

<script>
export default {
	name: "NotFound"
}
</script>

<style lang="scss" scoped>
.menu {
	display: flex;
	flex-direction: column;
	text-align: left;
}
</style>