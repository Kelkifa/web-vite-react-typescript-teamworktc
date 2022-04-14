import {DataResponse, DefaultResponse} from "../models";

import {Note} from "../models/Note";
import axiosClient from "./axiosClient";

const noteApi = {
	get(
		groupId: string,
		year: number,
		month: number
	): Promise<DataResponse<Note[]>> {
		const url = "/note/get";
		return axiosClient.post(url, {groupId, year, month});
	},
	create(groupId: string, newNote: Note): Promise<DataResponse<Note>> {
		const url = "/note/create";
		return axiosClient.post(url, {groupId, data: newNote});
	},
	update(noteId: string, data: Note): Promise<DataResponse<Note>> {
		const url = "/note/update";
		return axiosClient.patch(url, {noteId, data});
	},
	add(groupId: string, data: Note): Promise<DataResponse<Note>> {
		const url = "/note/add";
		return axiosClient.post(url, {groupId, data});
	},
	delete: (groupId: string, noteId: string): Promise<DefaultResponse> => {
		// console.log(`[api data]`, data);
		const url = "/note/delete";
		return axiosClient.delete(url, {data: {groupId, noteId}});
	},
	deleteMulti: (groupId: string, noteList: string[]) => {
		const url = "/note/delete-multi";
		return axiosClient.delete(url, {data: {groupId, noteList}});
	},

	getPassedNotes(groupId: string): Promise<DataResponse<Note[]>> {
		const url = "/note/get-passed";
		return axiosClient.post(url, {groupId});
	},

	search: (groupId: string, search: string): Promise<DataResponse<Note[]>> => {
		const url = "/note/search";
		return axiosClient.post(url, {groupId, search});
	},
};

export default noteApi;
