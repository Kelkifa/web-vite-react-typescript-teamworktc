import {DataResponse} from "../models";
import {Note} from "../models/Note";
import axiosClient from "./axiosClient";

export const todoApi = {
	get(
		groupId: string,
		year: number,
		month: number
	): Promise<DataResponse<Note[]>> {
		const url = "/todos/get";
		return axiosClient.post(url, {groupId, year, month});
	},
	createNote(groupId: string, newNote: Note): Promise<Note> {
		const url = "/todos/add";
		return axiosClient.post(url, {groupId, data: newNote});
	},

	getPassedNotes: (data: object) => {
		const url = "/todos/getPassed";
		return axiosClient.post(url, data);
	},
	changeState: (data: object) => {
		const url = "/todos/changeState";
		return axiosClient.post(url, data);
	},
	addTodo: (data: object) => {
		const url = "/todos/addTodo";
		return axiosClient.post(url, data);
	},
	delete: (data: object) => {
		// console.log(`[api data]`, data);
		const url = "/todos/delete";
		return axiosClient.delete(url, {data});
	},
	deleteMulti: (data: object) => {
		const url = "/todos/deleteMulti";
		return axiosClient.delete(url, {data});
	},
	deleteTodo: (data: object) => {
		const url = "/todos/deleteTodo";
		return axiosClient.delete(url, {data});
	},

	// data: {groupId, search}
	search: (data: object) => {
		const url = "/todos/search";
		return axiosClient.post(url, data);
	},
};
