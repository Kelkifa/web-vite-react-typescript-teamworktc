import {DataResponse} from "../models";
import {Note} from "../models/Note";
import axiosClient from "./axiosClient";

const noteApi = {
	get(
		groupId: string,
		year: number,
		month: number
	): Promise<DataResponse<Note[]>> {
		const url = "/todos/get";
		return axiosClient.post(url, {groupId, year, month});
	},
	add(groupId: string, data: Note): Promise<DataResponse<Note>> {
		const url = "/todos/add";
		return axiosClient.post(url, {groupId, data});
	},

	getPassedNotes(groupId: string): Promise<DataResponse<Note[]>> {
		const url = "/todos/getPassed";
		return axiosClient.post(url, {groupId});
	},

	changeState(groupId: string, noteId: string, todoId: string, state: boolean) {
		const url = "/todos/changeState";
		return axiosClient.post(url, {noteId, todoId, state});
	},
};

export default noteApi;
