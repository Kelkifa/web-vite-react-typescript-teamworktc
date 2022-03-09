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
};

export default noteApi;
