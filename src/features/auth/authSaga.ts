import {Auth, AuthLogin, DataResponse} from "../../models";
import {LOCALSTORAGE_TOKEN_NAME, authActions} from "./authSlice";
import {call, fork, put, take, takeEvery} from "redux-saga/effects";

import {PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../models/user";
import authApi from "../../api/authApi";
import {groupActions} from "../group/groupSlice";

function* handleFirstAccess() {
	try {
		if (!Boolean(localStorage.getItem(LOCALSTORAGE_TOKEN_NAME))) {
			return;
		}
		const response: DataResponse<User> = yield call(authApi.firstAccess);
		if (response.success) {
			yield put(authActions.firstAccessSuccess(response.response));
		} else {
			yield put(authActions.firstAccessFailed(response.message));
		}
	} catch (error) {
		yield put(authActions.firstAccessFailed("Server gặp sự cố"));
	}
}

function* handleLogin(action: PayloadAction<AuthLogin>) {
	// console.log(payload);
	try {
		const data: DataResponse<User> = yield call(authApi.login, {
			data: action.payload,
		});
		console.log(data);
		if (data.success) {
			data.token && localStorage.setItem(LOCALSTORAGE_TOKEN_NAME, data.token);
			// window.location.href = "/";
			yield put(authActions.loginSuccess(data.response));
		} else {
			yield put(authActions.loginFailed(data.message));
		}
		yield put(groupActions.getGroup());
	} catch (error) {
		yield put(authActions.loginFailed("Server gặp sự cố"));
	}
}

function* handleLogout() {
	localStorage.removeItem(LOCALSTORAGE_TOKEN_NAME);
}

function* handleRegister(action: PayloadAction<Auth>) {
	try {
		const data: DataResponse<User> = yield call(authApi.register, {
			data: action.payload,
		});
		if (data.success) {
			data.token && localStorage.setItem(LOCALSTORAGE_TOKEN_NAME, data.token);
			window.location.href = "/";

			yield put(authActions.registerSuccess(data.response));
		} else {
			yield put(authActions.registerFailed(data.message));
		}
	} catch (error) {
		yield put(authActions.registerFailed("Server gặp sự cố"));
	}
}

function* watchLoginFlow() {
	yield takeEvery(authActions.firstAccess.toString(), handleFirstAccess);

	yield takeEvery(authActions.login.toString(), handleLogin);
	yield takeEvery(authActions.register.toString(), handleRegister);

	yield takeEvery(authActions.logout.toString(), handleLogout);
}

export function* authSaga() {
	yield fork(watchLoginFlow);
}
