export default {
	state: {
		users: [],
		usersRangs: [],
		services: [],
		serviceDate: []
	},
	getters: {
		getUsersAdmin: state => {
			return state.users;
		},
		getUsersRangAdmin: state => {
			return state.usersRangs;
		},
		getServices: state => {
			return state.services;
		},
		getServicesDate: state => {
			return state.serviceDate;
		},
	},
	mutations: {
		setUsersAdmin(state, users) {
			state.users = (users ?? []);	
		},
		setUsersRangAdmin(state, users) {
			state.usersRangs = (users ?? []);	
		},
		setUserUpdateType(state, user) {
			state.users.forEach(e => {
				if (e._id === user._id) {
					e.type = user.type
				}
			});
		},
		setDelUserUpdateRang(state, user) {
			if (user.type === 'user') {
				state.usersRangs = state.usersRangs.filter(e => e._id !== user._id)
			} else if (user.rang === 'Тренер') {
				state.usersRangs.forEach((e) => {
					if (e._id === user._id) {
						e.rang = user.rang
					}
				})
			}
		},
		setCreateUserUpdateRang(state, user) {
			state.usersRangs.forEach(e => {
				if (e._id === user._id) {
					e.rang = user.rang
				}
			});
		},
		setServices(state, services) {
			state.services = (services ?? []);	
		},
		setEditService(state, service) {
			state.services.forEach(e => {
				if (e._id === service._id) {
					e.name = service.name
					e.info = service.info
					e.price = service.price
				}
			});	
		},
		setServicesDate(state, services) {
			state.serviceDate = (services ?? []);	
		},
		setEditServiceDate(state, service) {
			state.services.forEach(e => {
				if (e._id === service._id) {
					e.time = service.time
					e.date = service.date
				}
			});	
		},
	}, 
	actions: {
		saveUsersAdmin(context, users) {
			context.commit('setUsersAdmin', users);
		},
		saveUsersRangAdmin(context, users) {
			context.commit('setUsersRangAdmin', users);
		},
		saveUserUpdateType(context, user) {
			context.commit('setUserUpdateType', user);
		},
		saveDelUserUpdateRang(context, user) {
			context.commit('setDelUserUpdateRang', user);
		},
		saveCreateUserUpdateRang(context, user) {
			context.commit('setCreateUserUpdateRang', user);
		},
		saveServices(context, services) {
			context.commit('setServices', services);
		},
		saveEditService(context, service) {
			context.commit('setEditService', service);
		},
		saveServicesDate(context, services) {
			context.commit('setServicesDate', services);
		},
		saveEditServiceDate(context, service) {
			context.commit('setEditServiceDate', service);
		},
	}
}