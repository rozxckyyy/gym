<template>
	<v-card class="card">
		<span :class="icon"></span>
		<div class="card-inner">
			<template v-if="upTitle">
				<p class="up-title">{{ upTitle }}</p>
			</template>
			<p class="title">{{ title }}</p>
		</div>
	</v-card>
</template>

<script>
export default {
	name: "Card",
	props: {
		icon: { type: String },
		title: { type: String },
		upTitle: { type: String }
	}
}
</script>

<style lang="scss" scoped>
.card {
	display: flex;
	gap: 10px;
	padding: 10px 40px;
	align-items: center;
}
.card-inner {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}
span {
	color: #fff;
	font-size: 40px;
}
.title {
	font-size: large;
	color: #2196F3 !important;
}
</style>