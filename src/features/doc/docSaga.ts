import {call, fork, put, takeEvery} from "redux-saga/effects";

import {DataResponse} from "../../models";
import {Doc} from "../../models/doc";
import {PayloadAction} from "@reduxjs/toolkit";
import {docActions} from "./docSlice";
import docApi from "../../api/docApi";
import {store} from "../../app/store";

function* handleGetDocList() {
	const state = store.getState();
	try {
		const data: DataResponse<Doc[]> = yield call(
			docApi.getDocList,
			state.group.selectedGroup?._id // Selected groupId
		);
		if (data.success) {
			yield put(docActions.getDocListSuccess(data.response));
		} else {
			yield put(docActions.getDocListFailed(data.message));
		}
	} catch (error) {
		console.log(error);
		yield put(docActions.getDocListFailed("Server gặp sự cố"));
	}
}
function* handleGetDetail(action: PayloadAction<string>) {
	const state = store.getState();
	try {
		const data: DataResponse<Doc> = yield call(
			docApi.getDetail,
			state.group.selectedGroup?._id,
			action.payload
		);
		if (data.success) {
			yield put(docActions.getDocDetailSuccess(data.response));
		}
	} catch (error) {
		console.log(error);
	}
}

function* docWatcher() {
	yield takeEvery(docActions.getDocList, handleGetDocList);
	yield takeEvery(docActions.getDocDetail, handleGetDetail);
}

export function* docSaga() {
	yield fork(docWatcher);
}
