import {DataResponse, DefaultResponse} from "../../models";
import {LOCALSTORAGE_GROUP_NAME, groupActions} from "./groupSlice";
import {call, fork, put, takeEvery, throttle} from "redux-saga/effects";

import {Group} from "../../models/group";
import {PayloadAction} from "@reduxjs/toolkit";
import {SERVER_ERR_STR} from "../../app/variablies";
import {User} from "../../models/user";
import groupApi from "../../api/groupApi";

function* handleGetGroupList() {
	try {
		const data: DataResponse<Group[]> = yield call(groupApi.getGroupList);
		if (data.success === true) {
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

function* handleCreate(action: PayloadAction<{name: string}>) {
	try {
		const data: DataResponse<Group> = yield call(
			groupApi.create,
			action.payload.name
		);

		if (data.success === true) {
			yield put(groupActions.createSuccess({group: data.response}));
		} else {
			yield put(
				groupActions.createFailed({
					name: action.payload.name,
					message: data.message,
				})
			);
		}
	} catch (err) {
		console.log(err);
		yield put(
			groupActions.createFailed({
				name: action.payload.name,
				message: SERVER_ERR_STR,
			})
		);
	}
}
function* invite(action: PayloadAction<{groupId: string; username: string}>) {
	const {groupId, username} = action.payload;
	try {
		const data: DefaultResponse = yield call(
			groupApi.invite,
			groupId,
			username
		);

		if (data.success === true)
			yield put(groupActions.inviteSuccess({groupId, username}));
		else {
			yield put(
				groupActions.inviteFailed({message: data.message, username, groupId})
			);
		}
	} catch (err) {
		console.log(err);
		yield put(
			groupActions.inviteFailed({groupId, username, message: SERVER_ERR_STR})
		);
	}
}

function* getMembers(action: PayloadAction<{groupId: string}>) {
	const {groupId} = action.payload;
	try {
		const data: DataResponse<{userId: {username: string; _id: string}}[]> =
			yield call(groupApi.getMember, groupId);

		if (data.success === true) {
			const response: User[] = data.response.map(value => ({
				username: value.userId?.username,
				_id: value.userId?._id,
			}));
			yield put(groupActions.getMembersSuccess({members: response}));
		} else {
			yield put(groupActions.getMembersFailed({message: data.message}));
		}
	} catch (err) {
		console.log(err);
		yield put(groupActions.getMembersFailed({message: SERVER_ERR_STR}));
	}
}
function* deleteMember(
	action: PayloadAction<{groupId: string; memberId: string}>
) {
	const {groupId, memberId} = action.payload;
	try {
		const data: DataResponse<DefaultResponse> = yield call(
			groupApi.deleteMemeber,
			groupId,
			memberId
		);
		if (data.success === true)
			yield put(groupActions.deleteMemberSuccess({groupId, memberId}));
		else {
			yield put(
				groupActions.deleteMemberFailed({
					groupId,
					memberId,
					message: data.message,
				})
			);
		}
	} catch (err) {
		console.error(err);
		yield put(
			groupActions.deleteMemberFailed({
				groupId,
				memberId,
				message: SERVER_ERR_STR,
			})
		);
	}
}

function* deleteGroup(action: PayloadAction<{groupId: string}>) {
	const {groupId} = action.payload;

	try {
		const data: DefaultResponse = yield call(groupApi.delete, groupId);

		if (data.success === true) {
			yield put(groupActions.deleteSuccess({groupId}));
		} else {
			yield put(groupActions.deleteFailed({groupId, message: data.message}));
		}
	} catch (err) {
		console.log(err);
		yield put(groupActions.deleteFailed({groupId, message: SERVER_ERR_STR}));
	}
}

function* groupWatcher() {
	yield throttle(3000, groupActions.getMembers.toString(), getMembers);
	yield throttle(3000, groupActions.deleteMember.toString(), deleteMember);
	yield throttle(3000, groupActions.getGroup.toString(), handleGetGroupList);
	yield throttle(3000, groupActions.invite.toString(), invite);
	yield throttle(3000, groupActions.create.toString(), handleCreate);
	yield throttle(3000, groupActions.delete.toString(), deleteGroup);
}

export function* groupSaga() {
	yield fork(groupWatcher);
}
