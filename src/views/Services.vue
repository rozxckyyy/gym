<template>
	<div class="menu">
		<router-link to="/menu/services/coaches">
			<Card icon="mdi mdi-account-multiple" title="Выбрать тренера"></Card>
		</router-link>
	</div>
 </template>
 
 <script>
 import Card from '../components/Card.vue';
 
 export default {
	name: 'Services',
	components: {
	  Card
	},
 }
 </script>
 
 <style lang="scss" scoped>
 .menu {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
 }
 </style>
 