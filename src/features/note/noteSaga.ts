import {GetNotePayload, noteActions} from "./noteSlice";
import {call, fork, put, takeLatest} from "redux-saga/effects";
import {getSelectedGroupId, store} from "../../app/store";

import {DataResponse} from "../../models";
import {Note} from "../../models/Note";
import {PayloadAction} from "@reduxjs/toolkit";
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

function* noteWatcher() {
	yield takeLatest(noteActions.getNote.toString(), handleGetNote);
	yield takeLatest(noteActions.createNote.toString(), handleCreateNote);
}

export default function* noteSaga() {
	yield fork(noteWatcher);
}
