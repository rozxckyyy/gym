import axios from "axios";

export const request = axios.create({
	baseURL: 'http://localhost:4444/'
})

request.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem('token')
	return config
})

// Axios для связывание клиента и сервака. Чтобы запросы можно было юзать
// конфг - туда мы закидываем наш токен. Если выполинться запрос, то в его Headers будет переменная Authorization,
// в которой хранится токен 