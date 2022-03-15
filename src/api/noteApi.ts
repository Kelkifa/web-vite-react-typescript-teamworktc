import {DataResponse, DefaultResponse} from "../models";

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
	deleteNote: (groupId: string, noteId: string): Promise<DefaultResponse> => {
		// console.log(`[api data]`, data);
		const url = "/todos/delete";
		return axiosClient.delete(url, {data: {groupId, noteId}});
	},
	deleteMulti: (groupId: string, noteList: string[]) => {
		const url = "/todos/deleteMulti";
		return axiosClient.delete(url, {data: {groupId, noteList}});
	},
	addTodo(
		groupId: string,
		noteId: string,
		todoName: string
	): Promise<DataResponse<Note>> {
		const url = "/todos/addTodo";
		return axiosClient.post(url, {groupId, todoId: noteId, todoName});
	},

	getPassedNotes(groupId: string): Promise<DataResponse<Note[]>> {
		const url = "/todos/getPassed";
		return axiosClient.post(url, {groupId});
	},

	changeState(
		groupId: string,
		noteId: string,
		todoId: string,
		state: boolean
	): Promise<DataResponse<DefaultResponse>> {
		const url = "/todos/changeState";
		return axiosClient.post(url, {groupId, noteId, todoId, state});
	},

	removeTodo(
		groupId: string,
		noteId: string,
		todoId: string
	): Promise<DataResponse<Note>> {
		const url = "/todos/deleteTodo";
		return axiosClient.delete(url, {data: {groupId, noteId, todoId}});
	},

	search: (groupId: string, search: string): Promise<DataResponse<Note[]>> => {
		const url = "/todos/search";
		return axiosClient.post(url, {groupId, search});
	},
};

export default noteApi;
