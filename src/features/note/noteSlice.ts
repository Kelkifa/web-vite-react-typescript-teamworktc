import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {ErrorStatus} from "../../models";
import {Note} from "../../models/Note";
import {RootState} from "../../app/store";
import {toast} from "react-toastify";

export interface GetNotePayload {
	year: number;
	month: number;
}

export interface NoteState {
	loading: boolean;
	error?: string;
	data?: Note[];
	selectedNote?: Note;
	status: {
		createNote?: ErrorStatus;
	};
}

const initialState: NoteState = {
	loading: true,
	error: undefined,
	status: {},
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
		getNoteSuccess(state, action: PayloadAction<Note[]>) {
			state.loading = false;
			state.error = undefined;
			state.data = action.payload;
		},
		getNoteFailed(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},

		// CREATE
		createNote(state, action: PayloadAction<Note>) {
			state.status.createNote = {loading: true, error: undefined};
			if (state.data) {
				action.payload.loading = true;
				// action.payload._id = "sadkj";
				state.data.push(action.payload);
				return state;
			}
			state.data = [action.payload];

			return state;
		},
		createNoteSuccess(state, action: PayloadAction<Note>) {
			// console.log(action.payload);
			const foundNoteIndex = state.data?.findIndex(
				note => note.loading === true && note.name === action.payload.name
			);
			if (foundNoteIndex === undefined || foundNoteIndex === -1) return state;

			state.status.createNote = {loading: false, error: undefined};
			state.data && (state.data[foundNoteIndex] = action.payload);
		},
		createNoteFailed(state, action: PayloadAction<string>) {
			state.data = state.data?.filter(note => note.loading !== true);
			toast.error(`Tạo sự kiện thất bại ${action.payload}`);
			state.status.createNote = {loading: false, error: undefined};
			return state;
		},
		// DELETE NOTE
		deleteNote(state, action: PayloadAction<(string | undefined)[]>) {
			if (!state.data) return state;

			const {payload} = action;
			if (payload.length === 1) {
				const foundNoteIndex = state.data.findIndex(
					note => note._id === payload[0]
				);
				if (foundNoteIndex !== -1) state.data[foundNoteIndex].loading = true;
			} else {
				state.data = state.data.map((note, index) =>
					note._id === action.payload[index] ? {...note, loading: true} : note
				);
			}

			if (state.selectedNote) {
				state.selectedNote = undefined;
			}

			return state;
		},
		deleteNoteSuccess(state, action: PayloadAction<(string | undefined)[]>) {
			if (!state.data) return state;
			const {payload} = action;
			if (payload.length === 1) {
				const foundNoteIndex = state.data.findIndex(
					note => note._id === payload[0]
				);
				if (foundNoteIndex !== -1) state.data.splice(foundNoteIndex, 1);
				return state;
			}

			state.data = state.data.filter(
				(note, index) => note._id !== payload[index]
			);
			return state;
		},
		deleteNoteFailed(state, action: PayloadAction<(string | undefined)[]>) {
			if (!state.data) return state;
			const {payload} = action;
			if (payload.length === 1) {
				const foundNoteIndex = state.data.findIndex(
					note => note._id === payload[0]
				);
				if (foundNoteIndex !== -1)
					state.data[foundNoteIndex].loading = undefined;

				return state;
			}

			state.data = state.data.map((note, index) =>
				note._id === payload[index] ? {...note, loading: undefined} : note
			);
			return state;
		},
		clearState(state) {
			state = initialState;
			return state;
		},
	},
	extraReducers: {},
});

export const getNoteCreateStatusLoading = (state: RootState) =>
	state.note.status.createNote?.loading;

const {reducer: noteReducer, actions} = noteSlice;

export const noteActions = noteSlice.actions;

export default noteReducer;
