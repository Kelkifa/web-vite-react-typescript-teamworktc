import {
	LOCALSTORAGE_REFRESH_TOKEN_NAME,
	LOCALSTORAGE_TOKEN_NAME,
} from "../features/auth/authSlice";
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

import jwtDecode from "jwt-decode";
import queryString from "query-string";

const baseUrlList = [
	"https://teamwork-tc.herokuapp.com/api",
	"http://localhost:8080/api",
];
enum ProjectStatus {
	Product = 0,
	Dev = 1,
}

export const SERVER_URL = baseUrlList[ProjectStatus.Product];

const axiosClient = axios.create({
	baseURL: SERVER_URL,
	headers: {
		"Content-Type": "application/json",
	},
	paramsSerializer: params => queryString.stringify(params),
});

// Store promise to call refresh token api
let requestPromise: Promise<AxiosResponse> | undefined = undefined;

// APi Resquest
axiosClient.interceptors.request.use(
	async (config: AxiosRequestConfig) => {
		let token = localStorage.getItem(LOCALSTORAGE_TOKEN_NAME);
		if (token && config.headers) {
			const {exp} = jwtDecode(token) as {exp: number};

			// Token expired
			if (exp * 1000 - Date.now() <= 0) {
				const refreshToken = localStorage.getItem(
					LOCALSTORAGE_REFRESH_TOKEN_NAME
				);
				try {
					if (requestPromise === undefined) {
						requestPromise = axios.post(SERVER_URL + "/auth/refresh-token", {
							refreshToken,
						});
						// console.log("refresh token");
					}

					const response = await requestPromise;

					token = response.data.token;
					const newRefreshToken = response.data.refreshToken;

					if (response.data.success) {
						token && localStorage.setItem(LOCALSTORAGE_TOKEN_NAME, token);
						newRefreshToken &&
							localStorage.setItem(
								LOCALSTORAGE_REFRESH_TOKEN_NAME,
								newRefreshToken
							);
					}
				} catch (err) {
					console.error("Cann't refresh token");
				}

				requestPromise = undefined;
			}
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
		return Promise.reject(error.response);
	}
);

export default axiosClient;
