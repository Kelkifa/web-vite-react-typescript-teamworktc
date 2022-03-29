import {call, fork, put, throttle} from "redux-saga/effects";

import {DataResponse} from "../../models";
import {PayloadAction} from "@reduxjs/toolkit";
import {SERVER_ERR_STR} from "../../app/variablies";
import {Todo} from "../../models/Todo";
import {getSelectedGroupId} from "../../app/store";
import {todoActions} from "./todoSlice";
import todoApi from "../../api/todoApi";

function* handleGetTodo(action: PayloadAction<{noteId: string}>) {
	const groupId = getSelectedGroupId();
	if (!groupId) return;
	try {
		const data: DataResponse<Todo[]> = yield call(
			todoApi.get,
			groupId,
			action.payload.noteId
		);
		if (data.success === true) {
			yield put(todoActions.getSuccess({todoList: data.response}));
		} else {
			yield put(todoActions.getFailed({message: data.message}));
		}
	} catch (err) {
		console.log(err);
		yield put(todoActions.getFailed({message: SERVER_ERR_STR}));
	}
}
function* handleCreate(
	action: PayloadAction<{noteId: string; todoName: string}>
) {
	const groupId = getSelectedGroupId();
	if (!groupId) return;
	try {
		const data: DataResponse<Todo> = yield call(
			todoApi.create,
			groupId,
			action.payload.noteId,
			action.payload.todoName
		);
		if (data.success !== true) {
			yield put(
				todoActions.createFailed({
					todoName: action.payload.todoName,
					message: data.message,
				})
			);
		} else {
		}
	} catch (err) {
		console.log(err);
		yield put(
			todoActions.createFailed({
				todoName: action.payload.todoName,
				message: SERVER_ERR_STR,
			})
		);
	}
}
function* handleChangeState(
	action: PayloadAction<{noteId: string; todoId: string; state: boolean}>
) {
	const groupId = getSelectedGroupId();
	if (!groupId) return;

	const {payload} = action;

	try {
		const data: DataResponse<Todo> = yield call(
			todoApi.changeState,
			groupId,
			payload.noteId,
			payload.todoId,
			payload.state
		);
		if (data.success === true) {
			// yield put(todoActions.changeStateSuccess({todo: data.response}));
		} else {
			yield put(
				todoActions.changeStateFailed({
					todoId: payload.todoId,
					state: payload.state,
					message: data.message,
				})
			);
		}
	} catch (err) {
		console.log(err);
		yield put(
			todoActions.changeStateFailed({
				todoId: payload.todoId,
				state: payload.state,
				message: SERVER_ERR_STR,
			})
		);
	}
}
function* handleDelete(
	action: PayloadAction<{noteId: string; todoId: string}>
) {
	const groupId = getSelectedGroupId();
	if (!groupId) return;

	const {payload} = action;

	try {
		const data: DataResponse<Todo> = yield call(
			todoApi.delete,
			groupId,
			payload.noteId,
			payload.todoId
		);
		if (data.success === true) {
			// yield put(todoActions.deleteSuccess({todoId: payload.todoId}));
		} else {
			yield put(
				todoActions.deleteFailed({
					todoId: payload.todoId,
					message: data.message,
				})
			);
		}
	} catch (err) {
		console.log(err);
		yield put(
			todoActions.deleteFailed({
				todoId: payload.todoId,
				message: SERVER_ERR_STR,
			})
		);
	}
}

function* todoWatcher() {
	yield throttle(2000, todoActions.get.toString(), handleGetTodo);
	yield throttle(2000, todoActions.create.toString(), handleCreate);
	yield throttle(4000, todoActions.changeState.toString(), handleChangeState);
	yield throttle(2000, todoActions.delete.toString(), handleDelete);
}

export default function* todoSaga() {
	yield fork(todoWatcher);
}
