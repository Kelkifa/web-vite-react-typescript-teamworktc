import {LOCALSTORAGE_GROUP_NAME, groupActions} from "./groupSlice";
import {call, fork, put, takeEvery, throttle} from "redux-saga/effects";

import {DataResponse} from "../../models";
import {Group} from "../../models/group";
import {PayloadAction} from "@reduxjs/toolkit";
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
function* handleAddMembers(
	action: PayloadAction<{groupId: string; userList: string[]}>
) {
	const {groupId, userList} = action.payload;
	try {
		const data: DataResponse<Group> = yield call(
			groupApi.addMembers,
			groupId,
			userList
		);
		console.log(data);
		if (data.success === true) {
			yield put(groupActions.addMembersSuccess(data.response));
		}
	} catch (err) {
		console.log(err);
	}
}

function* groupWatcher() {
	yield takeEvery(groupActions.getGroup.toString(), handleGetGroupList);
	yield throttle(3000, groupActions.addMembers.toString(), handleAddMembers);
}

export function* groupSaga() {
	yield fork(groupWatcher);
}
