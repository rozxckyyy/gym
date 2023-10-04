import { request } from "./index";

export const authLogin = params => {
	return request({
		url: '/auth/login',
		method: 'post',
		data: params
	})
}

export const authReg = params => {
	return request({
		url: '/auth/reg',
		method: 'post',
		data: params
	})
}

export const authMe = params => {
	return request({
		url: '/auth/me',
		method: 'get',
		data: params
	})
}

export const getAllUsersAdmin = params => {
	return request({
		url: '/admin/allUsers',
		method: 'get',
		data: params
	})
}

export const getAllUsersRangAdmin = params => {
	return request({
		url: '/admin/allUsersRang',
		method: 'get',
		data: params
	})
}

export const upRoleAdmin = params => {
	return request({
		url: '/admin/upRole',
		method: 'post',
		data: params
	})
}

export const downRoleAdmin = params => {
	return request({
		url: '/admin/downRole',
		method: 'post',
		data: params
	})
}

export const upRangAdmin = params => {
	return request({
		url: '/admin/upRang',
		method: 'post',
		data: params
	})
}

export const downRangAdmin = params => {
	return request({
		url: '/admin/downRang',
		method: 'post',
		data: params
	})
}

export const getAllCoach = params => {
	return request({
		url: '/getAllCoach',
		method: 'get',
		data: params
	})
}

export const addFavoriteCoach = params => {
	return request({
		url: '/addFavoriteCoach',
		method: 'post',
		data: params
	})
}

export const getFavoriteCoach = params => {
	return request({
		url: '/getFavoriteCoach',
		method: 'post',
		data: params
	})
}

export const removeFavoriteCoach = params => {
	return request({
		url: '/removeFavoriteCoach',
		method: 'post',
		data: params
	})
}