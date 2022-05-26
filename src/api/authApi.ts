import {Auth, AuthLogin, InvitesResponse} from "../models";
import {DataResponse, DefaultResponse} from "../models/commons";

import {User} from "../models/user";
import axiosClient from "./axiosClient";

const authApi = {
	login(username: string, password: string): Promise<DefaultResponse> {
		const url = "/auth/login";
		return axiosClient.post(url, {data: {username, password}});
	},
	register(data: {data: Auth}): Promise<DefaultResponse> {
		const url = "/auth/register";
		return axiosClient.post(url, data);
	},
	getInvites(): Promise<DataResponse<InvitesResponse[]>> {
		const url = "/auth/get-invites";
		return axiosClient.get(url);
	},
	acceptInvite(inviteId: string): Promise<DataResponse<DefaultResponse>> {
		const url = "/auth/accept-invite";
		return axiosClient.post(url, {inviteId});
	},
	disagreeInvite(inviteId: string): Promise<DefaultResponse> {
		const url = "/auth/disagree-invite";
		return axiosClient.delete(url, {data: {inviteId}});
	},
	disagreeAllInvite(): Promise<DefaultResponse> {
		const url = "/auth/disagree-all-invite";
		return axiosClient.delete(url);
	},
	firstAccess(): Promise<DataResponse<User>> {
		const url = "/auth/firstAccess";
		return axiosClient.get(url);
	},

	checkExistUsernameOrEmail(
		email?: string,
		username?: string
	): Promise<DataResponse<{username: boolean; email: boolean}>> {
		const url = "/auth/check-email-and-username";

		return axiosClient.post(url, {username, email});
	},
};

export default authApi;
