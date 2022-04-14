import {DataResponse, DefaultResponse} from "../../models";
import {GetNotePayload, noteActions} from "./noteSlice";
import {Note, NoteFormValue} from "../../models/Note";
import {call, fork, put, takeLatest, throttle} from "redux-saga/effects";

import {PayloadAction} from "@reduxjs/toolkit";
import {SERVER_ERR_STR} from "../../app/variablies";
import {getSelectedGroupId} from "../../app/store";
import noteApi from "../../api/noteApi";

// import todoApi from "../../api/todoApi";

function* handleGetNote(action: PayloadAction<GetNotePayload>) {
	const {year, month} = action.payload;
	const groupId = getSelectedGroupId();
	if (!groupId) return;
	try {
		const data: DataResponse<Note[]> = yield call(
			noteApi.get,
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
			noteApi.create,
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

function* handleUpdate(action: PayloadAction<{noteId: string; data: Note}>) {
	const {noteId, data} = action.payload;
	try {
		const dataResponse: DataResponse<Note> = yield call(
			noteApi.update,
			noteId,
			data
		);

		if (dataResponse.success === true) {
			yield put(
				noteActions.updateSuccess({noteId, updatedNote: dataResponse.response})
			);
		} else {
			yield put(noteActions.updateFailed({message: dataResponse.message}));
		}
	} catch (err) {
		console.log(err);
		yield put(noteActions.updateFailed({message: SERVER_ERR_STR}));
	}
}

function* handleDeleteNote(action: PayloadAction<string[]>) {
	const groupId = getSelectedGroupId();
	if (!groupId) return;

	const noteList = action.payload;

	try {
		const data: DefaultResponse = yield call(
			noteApi.deleteMulti,
			groupId,
			noteList
		);
		if (data.success === true) {
			yield put(noteActions.deleteNoteSuccess(noteList));
		} else {
			yield put(noteActions.deleteNoteFailed(noteList));
		}
	} catch (err) {
		console.log(err);
		yield put(noteActions.deleteNoteFailed(noteList));
	}
}

function* noteWatcher() {
	yield throttle(2000, noteActions.getNote.toString(), handleGetNote);
	yield throttle(2000, noteActions.createNote.toString(), handleCreateNote);
	yield throttle(2000, noteActions.update.toString(), handleUpdate);

	yield throttle(2000, noteActions.deleteNote.toString(), handleDeleteNote);
}

export default function* noteSaga() {
	yield fork(noteWatcher);
}
