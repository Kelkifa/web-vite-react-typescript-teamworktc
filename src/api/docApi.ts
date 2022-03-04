import {DataResponse} from "../models";
import {Doc} from "../models/doc";
import axiosClient from "./axiosClient";

const docApi = {
	create(
		groupId: string,
		paperName: string,
		paperTitle: string,
		paperContent: string
	) {
		const url = "/papers/createPaper";
		return axiosClient.post(url, {
			groupId,
			paperName,
			paperTitle,
			paperContent,
		});
	},
	getDocList(groupId?: string): Promise<DataResponse<Doc[]>> {
		const url = "/papers/getPaperList";
		return axiosClient.post(url, {groupId});
	},
	getDetail(groupId?: string, docId?: string): Promise<DataResponse<Doc>> {
		const url = "/papers/getDetail";
		return axiosClient.post(url, {groupId, docId});
	},
};

export default docApi;
