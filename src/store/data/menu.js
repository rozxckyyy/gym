export default {
	state: {
		coachAll: [],
		selectedCoach: {},
		servicesAll: [],
		servicesSelected: {}
	},
	getters: {
		getCoachAll: state => {
			return state.coachAll;
		},
		getSelectedCoach: state => {
			return state.selectedCoach;
		},
		getServicesAll: state => {
			return state.servicesAll;
		},
		getServicesSelected: state => {
			return state.servicesSelected;
		},
	},
	mutations: {
		setCoachAll(state, user) {
			state.coachAll = (user ?? []);
		},
		setSelectedCoach(state, user) {
			state.selectedCoach = (user ?? {});
		},
		setServicesAll(state, services) {
			state.servicesAll = (services ?? []);
		},
		setServicesSelected(state, service) {
			state.servicesSelected = (service ?? {});
		},
	},
	actions: {
		saveCoachAll(context, user) {
			context.commit('setCoachAll', user);
		},
		saveSelectedCoach(context, user) {
			context.commit('setSelectedCoach', user);
		},
		saveServicesAll(context, services) {
			context.commit('setServicesAll', services);
		},
		saveServicesSelected(context, service) {
			context.commit('setServicesSelected', service);
		},
	}
}