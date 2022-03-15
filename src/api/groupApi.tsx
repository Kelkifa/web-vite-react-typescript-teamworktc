import {DataResponse} from "../models";
import {Group} from "../models/group";
import axiosClient from "./axiosClient";

const groupApi = {
	getGroupList() {
		const url = "/groups/get";
		return axiosClient.get(url);
	},
	addMembers(groupId: string, users: string[]): Promise<DataResponse<Group>> {
		const url = "/groups/addMember";
		return axiosClient.post(url, {groupId, users});
	},
};

export default groupApi;
