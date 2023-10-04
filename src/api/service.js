import { request } from "./index";

export const createService = params => {
	return request({
		url: '/coach/serviceCreate',
		method: 'post',
		data: params
	})
}

export const getMyServices = params => {
	return request({
		url: '/coach/myAllServices',
		method: 'post',
		data: params
	})
}

export const deliteMyService = params => {
	return request({
		url: '/coach/deliteService',
		method: 'post',
		data: params
	})
}

export const ServicesByCoach = params => {
	return request({
		url: '/servicesByCoach',
		method: 'post',
		data: params
	})
}

export const selectServiceForDate = params => {
	return request({
		url: '/servicesDateByCoach',
		method: 'post',
		data: params
	})
}

export const ServicesByCoachAll = params => {
	return request({
		url: '/servicesDateByCoachAll',
		method: 'post',
		data: params
	})
}

export const getServicesDateUser = params => {
	return request({
		url: '/getServicesDateUser',
		method: 'post',
		data: params
	})
}

export const signUpToService = params => {
	return request({
		url: '/signUpToService',
		method: 'post',
		data: params
	})
}

export const getServicesDateByUser = params => {
	return request({
		url: '/getServicesDateByUser',
		method: 'post',
		data: params
	})
}

export const deliteService = params => {
	return request({
		url: '/deliteService',
		method: 'post',
		data: params
	})
}

export const getAllServices = params => {
	return request({
		url: '/admin/allServices',
		method: 'get',
		data: params
	})
}