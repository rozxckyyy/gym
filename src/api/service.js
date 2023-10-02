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