import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

import queryString from "query-string";

const baseUrlList = [
	"https://thuongvachon.herokuapp.com/api",
	"http://localhost:8080/api",
];

enum ProjectStatus {
	Product = 0,
	Dev = 1,
}
const axiosClient = axios.create({
	baseURL: baseUrlList[ProjectStatus.Product],
	headers: {
		"Content-Type": "application/json",
	},
	paramsSerializer: params => queryString.stringify(params),
});

// APi Resquest
axiosClient.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const token = localStorage.getItem("token");
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => Promise.reject(error)
);
// API Response
axiosClient.interceptors.response.use(
	function (response: AxiosResponse) {
		return response.data;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default axiosClient;
