export default {
	state: {
		coachAll: [],
		selectedCoach: {}
	},
	getters: {
		getCoachAll: state => {
			return state.coachAll;
		},
		getSelectedCoach: state => {
			return state.selectedCoach;
		},
	},
	mutations: {
		setCoachAll(state, user) {
			state.coachAll = (user ?? []);
		},
		setSelectedCoach(state, user) {
			state.selectedCoach = (user ?? {});
		},
	},
	actions: {
		saveCoachAll(context, user) {
			context.commit('setCoachAll', user);
		},
		saveSelectedCoach(context, user) {
			context.commit('setSelectedCoach', user);
		},
	}
}