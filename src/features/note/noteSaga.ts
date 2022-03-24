import {DataResponse, DefaultResponse} from "../../models";
import {GetNotePayload, noteActions} from "./noteSlice";
import {call, fork, put, takeLatest, throttle} from "redux-saga/effects";

import {Note} from "../../models/Note";
import {PayloadAction} from "@reduxjs/toolkit";
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

	yield throttle(2000, noteActions.deleteNote.toString(), handleDeleteNote);
}

export default function* noteSaga() {
	yield fork(noteWatcher);
}
