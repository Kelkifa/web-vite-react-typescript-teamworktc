import {DataResponse, DefaultResponse} from "../models";

import {Note} from "../models/Note";
import {Todo} from "../models/Todo";
import axiosClient from "./axiosClient";

const todoApi = {
	get(groupId: string, noteId: string): Promise<DataResponse<Todo[]>> {
		const url = "/todo/get";
		return axiosClient.post(url, {groupId, noteId});
	},
	create(
		groupId: string,
		noteId: string,
		todoName: string
	): Promise<DataResponse<Note>> {
		const url = "/todo/create";
		return axiosClient.post(url, {groupId, noteId, todoName});
	},
	changeState(
		groupId: string,
		noteId: string,
		todoId: string,
		state: boolean
	): Promise<DataResponse<DefaultResponse>> {
		const url = "/todo/change-state";
		return axiosClient.post(url, {groupId, noteId, todoId, state});
	},
	delete(
		groupId: string,
		noteId: string,
		todoId: string
	): Promise<DataResponse<Note>> {
		const url = "/todo/delete";
		return axiosClient.delete(url, {data: {groupId, noteId, todoId}});
	},
};

export default todoApi;
