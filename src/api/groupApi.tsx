import axiosClient from "./axiosClient";

const groupApi = {
	getGroupList() {
		const url = "/groups/get";
		return axiosClient.get(url);
	},
};

export default groupApi;
