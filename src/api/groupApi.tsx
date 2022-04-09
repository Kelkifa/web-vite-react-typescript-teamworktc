import {DataResponse, DefaultResponse} from "../models";

import {Group} from "../models/group";
import {User} from "../models/user";
import axiosClient from "./axiosClient";

const groupApi = {
	getGroupList() {
		const url = "/group/get";
		return axiosClient.get(url);
	},
	getMember(
		groupId: string
	): Promise<DataResponse<{userId: {username: string}}[]>> {
		const url = "/group/get-members";
		return axiosClient.post(url, {groupId});
	},
	addMembers(groupId: string, users: string[]): Promise<DataResponse<Group>> {
		const url = "/group/addMember";
		return axiosClient.post(url, {groupId, users});
	},
	create(name: string): Promise<DataResponse<Group>> {
		const url = "/group/create";
		return axiosClient.post(url, {name});
	},
	invite(groupId: string, username: string): Promise<DefaultResponse> {
		const url = "/group/invite";
		return axiosClient.post(url, {groupId, username});
	},
	outGroup(groupId: string) {
		const url = "/group/out";
		return axiosClient.post(url, {groupId});
	},
	deleteMemeber(groupId: string, memberId: string) {
		const url = "/group/delete-member";
		return axiosClient.delete(url, {data: {groupId, memberId}});
	},
	delete(groupId: string) {
		const url = "/group/delete-group";
		return axiosClient.delete(url, {data: {groupId}});
	},
};

export default groupApi;
