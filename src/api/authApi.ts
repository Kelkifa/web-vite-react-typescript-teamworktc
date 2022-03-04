import {Auth, AuthLogin} from "../models";
import {DataResponse, DefaultResponse} from "../models/commons";

import {User} from "../models/user";
import axiosClient from "./axiosClient";

const authApi = {
	login(data: {data: AuthLogin}): Promise<DefaultResponse> {
		const url = "/auth/login";
		return axiosClient.post(url, data);
	},
	register(data: {data: Auth}): Promise<DefaultResponse> {
		const url = "/auth/register";
		return axiosClient.post(url, data);
	},
	firstAccess(): Promise<DataResponse<User>> {
		const url = "/auth/firstAccess";
		return axiosClient.get(url);
	},
};

export default authApi;
