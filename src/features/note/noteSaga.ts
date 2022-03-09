import {DataResponse, DefaultResponse} from "../../models";
import {GetNotePayload, noteActions} from "./noteSlice";
import {call, fork, put, takeLatest} from "redux-saga/effects";

import {Note} from "../../models/Note";
import {PayloadAction} from "@reduxjs/toolkit";
import {getSelectedGroupId} from "../../app/store";
import noteApi from "../../api/noteApi";
import {todoApi} from "../../api/todoApi";

// import todoApi from "../../api/todoApi";

function* handleGetNote(action: PayloadAction<GetNotePayload>) {
	const {year, month} = action.payload;
	const groupId = getSelectedGroupId();
	if (!groupId) return;
	try {
		const data: DataResponse<Note[]> = yield call(
			todoApi.get,
			groupId,
			year,
			month
		);

		if (data.success) {
			yield put(noteActions.getNoteSuccess(data.response));
		} else {
			yield put(noteActions.getNoteFailed(data.message));
		}
	} catch (error) {
		yield put(noteActions.getNoteFailed("Server gặp sự cố"));
	}
}

function* handleCreateNote(action: PayloadAction<Note>) {
	const groupId = getSelectedGroupId();
	if (!groupId) return;
	try {
		const data: DataResponse<Note> = yield call(
			todoApi.createNote,
			groupId,
			action.payload
		);

		if (data.success) {
			yield put(noteActions.createNoteSuccess(data.response));
		} else {
			yield put(noteActions.createNoteFailed(data.message));
		}
	} catch (error) {
		console.log(error);
		yield put(noteActions.createNoteFailed("Server gặp sự cố"));
	}
}

function* handleAddTodo(
	action: PayloadAction<{noteId: string; todoName: string}>
) {
	const groupId = getSelectedGroupId();
	if (!groupId) return;

	const {noteId, todoName} = action.payload;

	try {
		const data: DataResponse<Note> = yield call(
			noteApi.addTodo,
			groupId,
			noteId,
			todoName
		);

		if (data.success === true) {
			yield put(noteActions.addTodoSuccess(data.response));
		} else {
			yield put(noteActions.addTodoFailed({noteId, todoName}));
		}
	} catch (err) {
		console.log(err);
	}
}
function* handleChangeState(
	action: PayloadAction<{noteId: string; todoId: string; state: boolean}>
) {
	const groupId = getSelectedGroupId();
	if (!groupId) return;
	const {todoId, noteId, state} = action.payload;
	try {
		const data: DataResponse<Note> = yield call(
			noteApi.changeState,
			groupId,
			noteId,
			todoId,
			state
		);

		if (data.success === true) {
			yield put(noteActions.todoChangeStateSuccess(data.response));
		} else {
			yield put(
				noteActions.todoChangeStateFailed({
					todoId,
					noteId,
					state,
					message: data.message,
				})
			);
		}
	} catch (err) {
		yield put(
			noteActions.todoChangeStateFailed({
				todoId,
				noteId,
				state,
				message: "Server gặp sự cố",
			})
		);
	}
}

function* handleRemoveTodo(
	action: PayloadAction<{noteId: string; todoId: string}>
) {
	const groupId = getSelectedGroupId();

	const {noteId, todoId} = action.payload;

	if (!groupId) return;
	try {
		const data: DataResponse<Note> = yield call(
			noteApi.removeTodo,
			groupId,
			noteId,
			todoId
		);
		if (data.success === true) {
			yield put(noteActions.removeTodoSuccess({noteId, todoId}));
		} else {
			yield put(noteActions.removeTodoFailed({noteId, todoId}));
		}
	} catch (err) {
		console.log(err);
	}
}

function* noteWatcher() {
	yield takeLatest(noteActions.getNote.toString(), handleGetNote);
	yield takeLatest(noteActions.createNote.toString(), handleCreateNote);
	yield takeLatest(noteActions.todoChangeState.toString(), handleChangeState);
	yield takeLatest(noteActions.removeTodo.toString(), handleRemoveTodo);
	yield takeLatest(noteActions.addTodo.toString(), handleAddTodo);
}

export default function* noteSaga() {
	yield fork(noteWatcher);
}
