import {PayloadAction, createSlice} from "@reduxjs/toolkit";

import {ErrorStatus} from "../../models";
import {RootState} from "../../app/store";
import {Todo} from "../../models/Todo";
import {toast} from "react-toastify";

export interface TodoState {
	loading: boolean;
	error?: string;
	data: Todo[];
	status: {
		create?: ErrorStatus;
		changeState?: ErrorStatus;
		delete?: ErrorStatus;
	};
}

const initialState: TodoState = {
	loading: true,
	data: [],
	status: {},
};

const todoSlice = createSlice({
	name: "todo",
	initialState,

	reducers: {
		// GET TODO
		get(state, action: PayloadAction<{noteId: string}>) {
			state.error = undefined;
			state.data = [];
			state.loading = true;

			return state;
		},
		getSuccess(state, action: PayloadAction<{todoList: Todo[]}>) {
			state.loading = false;
			state.data = action.payload.todoList;

			return state;
		},
		getFailed(state, action: PayloadAction<{message: string}>) {
			state.loading = false;
			state.error = action.payload.message;
			state.data = [];

			return state;
		},

		// CREATE
		create(state, action: PayloadAction<{noteId: string; todoName: string}>) {
			const {payload} = action;
			state.status.create = {loading: true};
			if (state.loading || state.error) {
				return state;
			}

			const newData = {name: payload.todoName, state: false, loading: true};
			if (!state.data) {
				state.data = [newData];
			} else {
				state.data.push(newData);
			}

			return state;
		},

		createSuccess(state, action: PayloadAction<{todo: Todo}>) {
			const {payload} = action;

			state.status.create = {loading: false, error: false};

			if (state.loading || state.error) return state;

			const foundTodoIndex = state.data.findIndex(
				todo => todo.loading === true && todo.name === payload.todo.name
			);
			if (foundTodoIndex !== -1) {
				state.data[foundTodoIndex] = payload.todo;
			} else {
				state.data.push(payload.todo);
			}
			return state;
		},
		createFailed(
			state,
			action: PayloadAction<{todoName: string; message: string}>
		) {
			const {todoName, message} = action.payload;
			toast.error(`Tạo công việc thất bại (${message})`);

			state.status.create = {loading: false, error: true, message};

			if (state.loading || state.error) return state;

			if (state.data) {
				const foundTodoIndex = state.data.findIndex(
					todo => todo.loading === true && todo.name === todoName
				);
				if (foundTodoIndex === -1) return state;
				state.data.splice(foundTodoIndex, 1);
			}
			return state;
		},

		// CHANGE STATE
		changeState(
			state,
			action: PayloadAction<{noteId: string; todoId: string; state: boolean}>
		) {
			if (state.loading || state.error || !state.data) return state;
			const {payload} = action;

			const foundTodoIndex = state.data.findIndex(
				todo => todo._id === payload.todoId
			);
			if (foundTodoIndex === -1) return state;
			state.data[foundTodoIndex].state = payload.state;

			return state;
		},
		changeStateSuccess(state, action: PayloadAction<{todo: Todo}>) {
			state.status.changeState = undefined;
			if (state.loading || state.error || !state.data) return state;

			const foundTodoIndex = state.data.findIndex(
				todo => todo._id === action.payload.todo._id
			);
			if (foundTodoIndex !== -1)
				state.data[foundTodoIndex] = action.payload.todo;
			return state;
		},
		changeStateFailed(
			state,
			action: PayloadAction<{todoId: string; message: string; state: boolean}>
		) {
			const {payload} = action;
			toast.error(`Không thể sửa trạng thái (${payload.message})`);
			state.status.changeState = {error: true, message: payload.message};

			if (state.loading || state.error || !state.data) return state;

			const foundTodoIndex = state.data.findIndex(
				todo => todo._id === payload.todoId
			);
			state.data[foundTodoIndex].state = !payload.state;
		},

		// DELETE
		delete(state, action: PayloadAction<{noteId: string; todoId: string}>) {
			const {payload} = action;

			if (state.loading || state.error || !state.data) return state;

			const foundTodoIndex = state.data.findIndex(
				todo => todo._id === payload.todoId
			);
			if (foundTodoIndex !== -1) {
				state.data[foundTodoIndex].loading = true;
			}

			return state;
		},
		deleteSuccess(state, action: PayloadAction<{todoId: string}>) {
			if (state.loading || state.error || !state.data) return state;
			state.data = state.data.filter(
				todo => todo._id !== action.payload.todoId
			);
			return state;
		},
		deleteFailed(
			state,
			action: PayloadAction<{todoId: string; message: string}>
		) {
			toast.error(`Xóa công việc thất bại (${action.payload.message})`);

			if (state.loading || state.error || !state.data) return state;
			state.status.delete = {error: true, message: action.payload.message};
			const foundTodoIndex = state.data.findIndex(
				todo => todo._id === action.payload.todoId
			);
			if (foundTodoIndex !== -1) state.data[foundTodoIndex].loading = false;
		},
		// CLEAR
		clearStatus(state) {
			state.status = {};
		},
		clearState(state) {
			state = initialState;
			return state;
		},
	},
});

export const getTodoLoad = (state: RootState) => state.todo.loading;
export const getTodoError = (state: RootState) => state.todo.error;
export const getTodoData = (state: RootState) => state.todo.data;

export const getTodoStatus = (state: RootState) => state.todo.status;

export const getTodoStatusCreateLoading = (state: RootState) =>
	state.todo.status.create?.loading;

const {reducer: todoReducer} = todoSlice;
export const todoActions = todoSlice.actions;
export default todoReducer;
