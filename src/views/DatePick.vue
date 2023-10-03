<template>
	<div>
		<v-date-picker
		input-mode="keyboard">

		</v-date-picker>
	</div>
</template>

<script>
import { VDatePicker } from 'vuetify/labs/VDatePicker'

export default {
	name: "DatePick",
	data() {
		return {
			// datePicker: ''
		}
	},
	components: {
		VDatePicker
	}
}
</script>

<style lang="scss" scoped>

</style>