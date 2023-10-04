export default {
	state: {
		user: {},
		myServices: [],
		myServicesDate: [],
		myHistoryService: [],
		favorite: [],
	},
	getters: {
		getUser: state => {
			return state.user;
		},
		getMyServices: state => {
			return state.myServices;
		},
		getMyServicesDate: state => {
			return state.myServicesDate;
		},
		getMyHistoryService: state => {
			return state.myHistoryService;
		},
		getFavorite: state => {
			return state.favorite;
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
		},
		setMyServicesDate(state, service) {
			state.myServicesDate.push(service)
		},
		setMyServicesDateAll(state, service) {
			state.myServicesDate = (service ?? [])
		},
		setMyHistoryService(state, service) {
			state.myHistoryService = (service ?? [])
		},
		setDeliteMyServicesDate(state, service) {
			state.myServicesDate = state.myServicesDate.filter(e => e._id !== service._id)
		},
		setFavorite(state, user) {
			state.favorite = (user ?? [])
		},
		setAddFavorite(state, user) {
			state.favorite.push(user)
		},
		setRemoveFavorite(state, user) {
			state.favorite = state.favorite.filter(e => e._id !== user._id)
		},
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
		saveMyServicesDate(context, service) {
			context.commit('setMyServicesDate', service);
		},
		saveMyServicesDateAll(context, service) {
			context.commit('setMyServicesDateAll', service);
		},
		saveMyHistoryService(context, service) {
			context.commit('setMyHistoryService', service);
		},
		saveDeliteMyServicesDate(context, service) {
			context.commit('setDeliteMyServicesDate', service);
		},
		saveFavorite(context, user) {
			context.commit('setFavorite', user);
		},
		saveAddFavorite(context, user) {
			context.commit('setAddFavorite', user);
		},
		saveRemoveFavorite(context, user) {
			context.commit('setRemoveFavorite', user);
		},
	}
}