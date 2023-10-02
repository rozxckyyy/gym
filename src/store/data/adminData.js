export default {
	state: {
		users: [],
		usersRangs: []
	},
	getters: {
		getUsersAdmin: state => {
			return state.users;
		},
		getUsersRangAdmin: state => {
			return state.usersRangs;
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
		
	}
}