import {LOCALSTORAGE_GROUP_NAME, groupActions} from "./groupSlice";
import {call, fork, put, takeEvery} from "redux-saga/effects";

import {DataResponse} from "../../models";
import {Group} from "../../models/group";
import groupApi from "../../api/groupApi";

function* handleGetGroupList() {
	try {
		const data: DataResponse<Group[]> = yield call(groupApi.getGroupList);
		if (data.success) {
			yield put(groupActions.getGroupSuccess(data.response));

			const groupId = localStorage.getItem(LOCALSTORAGE_GROUP_NAME);
			let demoGroupIndex = -1;
			if (Boolean(groupId)) {
				demoGroupIndex = data.response.findIndex(group => {
					return group._id === groupId;
				});
			} else {
				demoGroupIndex = data.response.findIndex(group => {
					return group.type === "demo";
				});
			}
			if (demoGroupIndex !== -1) {
				yield put(groupActions.setSeletedGroup(data.response[demoGroupIndex]));
			}
		} else {
			yield put(groupActions.getGroupSuccessFail(data.message));
		}
	} catch (error) {
		console.log(error);
		yield put(groupActions.getGroupSuccessFail("Server gặp sự cố"));
	}
}

function* groupWatcher() {
	yield takeEvery(groupActions.getGroup.toString(), handleGetGroupList);
}

export function* groupSaga() {
	yield fork(groupWatcher);
}
