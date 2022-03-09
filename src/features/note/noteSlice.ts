import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {Note} from "../../models/Note";
import {todoApi} from "../../api/todoApi";

// Get passed notes
// data: {groupId}
export const getPassedNotes = createAsyncThunk(
	"todo/getPassedNotes",
	async (data: any) => {
		const response = await todoApi.getPassedNotes(data);
		return response;
	}
);

// data : {groupId, todoName, todoId}
export const todoAdd = createAsyncThunk("todo/todoAdd", async (data: any) => {
	const response = await todoApi.addTodo(data);
	return response;
});

// data: {groupId, noteId, todoId, state}
export const todoChangeState = createAsyncThunk(
	"todo/todoChangeState",
	async (data: any) => {
		const {todoId, noteId, state} = data;
		const response: any = await todoApi.changeState(data);
		response.todoId = todoId;
		response.noteId = noteId;
		response.state = state;

		return response;
	}
);

// Delete a note
export const todoDelete = createAsyncThunk(
	"todo/todoDelete",
	async (data: any) => {
		// console.log(`[slice data]`, data);
		const response = await todoApi.delete(data);
		return response;
	}
);

// data: {groupId, noteList}
export const todoDeleteMulti = createAsyncThunk(
	"todo/todoDeleteMulti",
	async (data: any) => {
		const response = await todoApi.deleteMulti(data);
		return response;
	}
);

// Delete a todo
// data: {groupId, todoId, noteId}
export const todoDeleteTodo = createAsyncThunk(
	"todo/todoDeleteTodo",
	async (data: any) => {
		const response = await todoApi.deleteTodo(data);
		// response.noteId = data.noteId;
		// response.todoId = data.todoId;
		return response;
	}
);

// Search a todo in group
// data: {groupId, search}
export const todoSearch = createAsyncThunk(
	"todo/todoSearch",
	async (data: any) => {
		const response = await todoApi.search(data);
		return response;
	}
);

export interface GetNotePayload {
	year: number;
	month: number;
}

export interface NoteState {
	loading: boolean;
	error?: string;
	data?: Note[];
	selectedNote?: Note;
}

const initialState: NoteState = {
	loading: true,
	error: undefined,
};

const noteSlice = createSlice({
	name: "note",
	initialState,
	reducers: {
		setSelectedNote: (state, action: PayloadAction<Note | undefined>) => {
			state.selectedNote = action.payload;
		},

		// Saga
		getNote(state, action: PayloadAction<GetNotePayload>) {
			state.loading = true;
			state.error = undefined;
		},
		getNoteSuccess(state: any, action: PayloadAction<Note[]>) {
			state.loading = false;
			state.error = undefined;
			state.data = action.payload;
		},
		getNoteFailed(state: any, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},

		createNote(state, action: PayloadAction<Note>) {
			if (state.data) {
				action.payload.loading = true;
				// action.payload._id = "sadkj";
				state.data.push(action.payload);
				return state;
			}
			state.data = [action.payload];
		},
		createNoteSuccess(state, action: PayloadAction<Note>) {
			// console.log(action.payload);
			const foundNoteIndex = state.data?.findIndex(
				note => note.loading === true && note.title === action.payload.title
			);
			if (foundNoteIndex === undefined || foundNoteIndex !== -1) return;

			state.data && (state.data[foundNoteIndex] = action.payload);
		},
		createNoteFailed(state, action: PayloadAction<string>) {
			state.data = state.data?.filter(note => note.loading !== true);
		},

		// ADD TODO
		addTodo(state, action: PayloadAction<{noteId: string; todoName: string}>) {
			const {payload} = action;
			if (!state.selectedNote || state.selectedNote._id !== payload.noteId)
				return state;

			if (!state.selectedNote.todoList) {
				state.selectedNote.todoList = [
					{todo: payload.todoName, state: false, loading: true},
				];
			} else {
				state.selectedNote.todoList.push({
					todo: payload.todoName,
					state: false,
					loading: true,
				});
			}
			return state;
		},
		addTodoSuccess(state, action: PayloadAction<Note>) {
			const {payload} = action;
			if (state.data) {
				const foundNote = state.data.findIndex(
					note => note._id === payload._id
				);
				if (foundNote !== -1) {
					state.data[foundNote] = payload;
				}
			}

			if (
				!state.selectedNote?.todoList ||
				state.selectedNote._id !== payload._id
			)
				return state;

			state.selectedNote = payload;
			return state;
		},
		addTodoFailed(
			state,
			action: PayloadAction<{noteId: string; todoName: string}>
		) {
			const {payload} = action;
			if (!state.selectedNote?.todoList) return state;

			state.selectedNote.todoList = state.selectedNote.todoList.filter(
				todo => !(todo.loading === true && todo.todo === payload.todoName)
			);

			return state;
		},

		// TODO CHANGE STATE
		todoChangeState(
			state,
			action: PayloadAction<{noteId: string; todoId: string; state: boolean}>
		) {
			const {payload} = action;
			if (
				state.selectedNote?._id !== payload.noteId ||
				!state.selectedNote ||
				!state.selectedNote.todoList
			)
				return state;

			const foundIndex = state.selectedNote.todoList.findIndex(
				todo => todo._id === payload.todoId
			);
			if (foundIndex !== -1) {
				state.selectedNote.todoList[foundIndex].state = payload.state;
			}

			return state;
		},
		todoChangeStateSuccess(state, action: PayloadAction<Note>) {
			if (state.data === undefined) return state;
			const foundNoteIndex = state.data.findIndex(
				note => note._id === action.payload._id
			);
			if (foundNoteIndex !== -1) {
				state.data[foundNoteIndex] = action.payload;
			}
		},
		todoChangeStateFailed(
			state,
			action: PayloadAction<{
				noteId: string;
				todoId: string;
				state: boolean;
				message: string;
			}>
		) {
			const {payload} = action;
			if (
				state.selectedNote?._id !== payload.noteId ||
				!state.selectedNote ||
				!state.selectedNote.todoList
			)
				return state;

			const foundIndex = state.selectedNote.todoList.findIndex(
				todo => todo._id === payload.todoId
			);
			if (foundIndex !== -1) {
				state.selectedNote.todoList[foundIndex].state = !payload.state;
			}

			return state;
		},

		// REMOVE
		removeTodo(state, action: PayloadAction<{noteId: string; todoId: string}>) {
			const {payload} = action;
			if (
				state.selectedNote?._id !== payload.noteId ||
				!state.selectedNote ||
				!state.selectedNote.todoList
			)
				return state;

			const foundIndex = state.selectedNote.todoList.findIndex(
				todo => todo._id === payload.todoId
			);

			if (foundIndex !== -1) {
				state.selectedNote.todoList.splice(foundIndex, 1);
			}

			return state;
		},
		removeTodoSuccess(
			state,
			action: PayloadAction<{noteId: string; todoId: string}>
		) {
			const {payload} = action;
			if (state.data === undefined) return state;
			const foundNoteId = state.data.findIndex(
				note => note._id === payload.noteId
			);

			if (foundNoteId !== -1) {
				state.data[foundNoteId].todoList = state.data[
					foundNoteId
				].todoList?.filter(todo => todo._id !== payload.todoId);
			}

			return state;
		},
		removeTodoFailed(
			state,
			action: PayloadAction<{noteId: string; todoId: string}>
		) {
			const {payload} = action;
			if (!state.data || state.selectedNote?._id !== payload.noteId)
				return state;

			const foundNote = state.data.find(note => note._id === payload.noteId);
			if (!foundNote) return state;

			state.selectedNote = foundNote;

			return state;
		},
	},
	extraReducers: {
		// GET
		// [todoGet.pending]: (state:any, action:PayloadAction<any>) => {
		// 	state.user = {loading: true, error: null, data: []};
		// 	return state;
		// },
		// [todoGet.rejected]: (state:any, action:PayloadAction<any>) => {
		// 	state.user.loading = false;
		// 	state.user.error = true;
		// },
		// [todoGet.fulfilled]: (state:any, action:PayloadAction<any>) => {
		// 	state.user.loading = false;
		// 	if (!action.payload.success) {
		// 		state.user.error = action.payload.message;
		// 		return state;
		// 	}
		// 	state.user.error = false;
		// 	state.user.data = action.payload.response;
		// },
		// // ADD
		// [todoCreate.pending]: (state:any, action:PayloadAction<any>) => {},
		// [todoCreate.rejected]: (state:any, action:PayloadAction<any>) => {},
		// [todoCreate.fulfilled]: (state:any, action:PayloadAction<any>) => {
		// 	if (!action.payload.success) return state;
		// 	state.user.data.push(action.payload.response);
		// 	return state;
		// },
		// // ADD TODO
		// [todoAdd.pending]: (state:any, action:PayloadAction<any>) => {
		// 	const payload = action.meta.arg;
		// 	// if (state:any.user.selectedNote._id === payload.noteId)
		// 	state.user.selectedNote.todoList.push({
		// 		todo: payload.todoName,
		// 		state: false,
		// 		loading: true,
		// 	});
		// 	return state;
		// },
		// [todoAdd.rejected]: (state:any, action:PayloadAction<any>) => {},
		// [todoAdd.fulfilled]: (state:any, action:PayloadAction<any>) => {
		// 	if (!action.payload.success) {
		// 		const payload = action.meta.arg;
		// 		if (state:any.user.selectedNote._id === payload.todoId) {
		// 			const foundTodoIndex = state.user.selectedNote.todoList.findIndex(
		// 				todo => todo.todo === payload.todoName && todo.loading === true
		// 			);
		// 			if (foundTodoIndex === -1) return state;
		// 			state.user.selectedNote.todoList[foundTodoIndex].error = action
		// 				.payload.message
		// 				? true
		// 				: action.payload.message;
		// 		}
		// 		return state;
		// 	}
		// 	const noteIndex = state.user.data.findIndex(
		// 		note => note._id === action.payload.response._id
		// 	);
		// 	if (noteIndex !== -1) {
		// 		state.user.data[noteIndex] = action.payload.response;
		// 	}
		// 	if (state:any.user.selectedNote._id === action.payload.response._id) {
		// 		state.user.selectedNote = action.payload.response;
		// 	}
		// 	return state;
		// },
		// // CHANGE STATE
		// [todoChangeState.pending]: (state:any, action:PayloadAction<any>) => {
		// 	const payload = action.meta.arg;
		// 	if (state:any.user.selectedNote._id !== payload.noteId) return state;
		// 	const todoIndex = state.user.selectedNote.todoList.findIndex(
		// 		todo => todo._id === payload.todoId
		// 	);
		// 	if (todoIndex === -1) return state;
		// 	state.user.selectedNote.todoList[todoIndex].state = payload.state;
		// 	return state;
		// },
		// [todoChangeState.rejected]: (state:any, action:PayloadAction<any>) => {},
		// [todoChangeState.fulfilled]: (state:any, action:PayloadAction<any>) => {
		// 	if (!action.payload.success) {
		// 		if (state:any.user.selectedNote._id === action.payload.noteId) {
		// 			const todoIndex = state.user.selectedNote.todoList.findIndex(
		// 				todo => todo._id === action.payload.todoId
		// 			);
		// 			state.user.setSelectedNote.todoList[todoIndex].state = action.payload
		// 				.state
		// 				? false
		// 				: true;
		// 			return state;
		// 		}
		// 		return state;
		// 	}
		// 	const noteIndex = state.user.data.findIndex(
		// 		note => note._id === action.payload.noteId
		// 	);
		// 	if (noteIndex === -1) return state;
		// 	state.user.data[noteIndex] = action.payload.response;
		// 	if (state:any.user.selectedNote._id !== action.payload.noteId) return state;
		// 	return state;
		// },
		// // DELETE
		// [todoDelete.pending]: (state:any, action:PayloadAction<any>) => {},
		// [todoDelete.rejected]: (state:any, action:PayloadAction<any>) => {},
		// [todoDelete.fulfilled]: (state:any, action:PayloadAction<any>) => {
		// 	if (!action.payload.success) return state;
		// 	state.user.data = state.user.data.filter(
		// 		value => value._id !== action.payload.response
		// 	);
		// 	return state;
		// },
		// // DELETE MULTI
		// [todoDeleteMulti.pending]: (state:any, action:PayloadAction<any>) => {
		// 	const {noteList} = action.meta.arg;
		// 	state.user.data = state.user.data.map((note, index) => {
		// 		return {...note, loading: noteList[index] === note._id ? true : false};
		// 	});
		// 	return state;
		// },
		// [todoDeleteMulti.fulfilled]: (state:any, action:PayloadAction<any>) => {
		// 	const {noteList} = action.meta.arg;
		// 	if (!action.payload.success) {
		// 		state.user.data = state.user.data.map((note, index) => {
		// 			return {...note, loading: undefined};
		// 		});
		// 		return state;
		// 	}
		// 	state.user.data = state.user.data.filter(
		// 		(note, index) => note._id !== noteList[index]
		// 	);
		// 	return state;
		// },
		// // DELETE TODO
		// [todoDeleteTodo.pending]: (state:any, action:PayloadAction<any>) => {
		// 	const payload = action.meta.arg;
		// 	if (state:any.user.selectedNote._id !== payload.noteId) return state;
		// 	state.user.selectedNote.todoList =
		// 		state.user.selectedNote.todoList.filter(
		// 			todo => todo._id !== payload.todoId
		// 		);
		// 	return state;
		// },
		// [todoDeleteTodo.fulfilled]: (state:any, action:PayloadAction<any>) => {
		// 	if (!action.payload.success) return state;
		// 	const {noteId} = action.payload.response;
		// 	const todoIndex = state.user.data.findIndex(note => note._id === noteId);
		// 	if (todoIndex === -1) return state;
		// 	state.user.data[todoIndex].todoList = state.user.data[
		// 		todoIndex
		// 	].todoList.filter(todo => todo._id !== todo.id);
		// 	return state;
		// },
		// // SEARCH
		// [todoSearch.pending]: (state:any, action:PayloadAction<any>) => {},
		// [todoSearch.fulfilled]: (state:any, action:PayloadAction<any>) => {},
	},
});

function isExistTodoList(note: Note | undefined) {
	if (!note || !note.todoList) return false;
	return true;
}

const {reducer: noteReducer, actions} = noteSlice;

export const noteActions = noteSlice.actions;
export const {addTodo, setSelectedNote} = actions;
// console.log('[redux action]', addTodo)

export default noteReducer;
