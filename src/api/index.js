import axios from "axios";

export const request = axios.create({
	baseURL: 'http://localhost:4444/'
})

request.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem('token')
	return config
})