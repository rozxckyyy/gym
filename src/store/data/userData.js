export default {
	state: {
		user: {},
		myServices: []
	},
	getters: {
		getUser: state => {
			return state.user;
		},
		getMyServices: state => {
			return state.myServices;
		},
	},
	mutations: {
		setUser(state, user) {
			state.user = (user ?? {});
		},
		setMyServices(state, service) {
			state.myServices.push(service)
		},
		setMyServicesAll(state, service) {
			state.myServices = (service ?? [])
		},
		setDeliteMyService(state, service) {
			state.myServices = state.myServices.filter(e => e._id !== service._id)
		}
	},
	actions: {
		saveUser(context, user) {
			context.commit('setUser', user);
		},
		saveMyServices(context, service) {
			context.commit('setMyServices', service);
		},
		saveMyServicesAll(context, service) {
			context.commit('setMyServicesAll', service);
		},
		saveDeliteMyService(context, service) {
			context.commit('setDeliteMyService', service);
		},
	}
}