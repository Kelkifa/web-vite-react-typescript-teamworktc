import {
	Auth,
	DataResponse,
	DefaultResponse,
	InvitesResponse,
} from "../../models";
import {LOCALSTORAGE_GROUP_NAME, groupActions} from "../group/groupSlice";
import {
	LOCALSTORAGE_REFRESH_TOKEN_NAME,
	LOCALSTORAGE_TOKEN_NAME,
	authActions,
} from "./authSlice";
import {call, fork, put, takeEvery, throttle} from "redux-saga/effects";
import {clearAllStateSaga, handleErrorSaga} from "../../app/rootSaga";

import {PayloadAction} from "@reduxjs/toolkit";
import {SERVER_ERR_STR} from "../../app/variablies";
import {User} from "../../models/user";
import authApi from "../../api/authApi";
import {store} from "../../app/store";

function* handleFirstAccess() {
	try {
		if (!Boolean(localStorage.getItem(LOCALSTORAGE_TOKEN_NAME))) {
			return;
		}
		const data: DataResponse<User> = yield call(authApi.firstAccess);

		if (data.success === true) {
			yield put(authActions.firstAccessSuccess(data.response));
			yield put(authActions.getInvites());
		}
	} catch (error) {
		yield call(
			handleErrorSaga,
			error,
			authActions.firstAccessFailed({message: SERVER_ERR_STR})
		);
	}
}

function* handleLogin(
	action: PayloadAction<{username: string; password: string}>
) {
	const {username, password} = action.payload;
	try {
		const data: DataResponse<User> = yield call(
			authApi.login,
			username,
			password
		);

		if (data.success) {
			data.token && localStorage.setItem(LOCALSTORAGE_TOKEN_NAME, data.token);
			data.refreshToken &&
				localStorage.setItem(
					LOCALSTORAGE_REFRESH_TOKEN_NAME,
					data.refreshToken
				);
			// window.location.href = "/";
			yield put(authActions.loginSuccess(data.response));
			yield put(authActions.getInvites());
			yield put(groupActions.getGroup());
		}
		//  else {
		// 	yield put(authActions.loginFailed(data.message));
		// }
	} catch (error: any) {
		yield call(
			handleErrorSaga,
			error,
			authActions.firstAccessFailed({message: SERVER_ERR_STR})
		);
	}
}

function* getInvites() {
	const state = store.getState();
	const isAuth = state.auth.isAuth;
	if (!isAuth)
		yield put(authActions.getInvitesFailed({message: "Bạn chưa đăng nhập"}));

	try {
		const data: DataResponse<InvitesResponse[]> = yield call(
			authApi.getInvites
		);
		if (data.success === true) {
			yield put(authActions.getInvitesSuccess(data.response));
		}
		// else {
		// 	yield put(authActions.getInvitesFailed({message: data.message}));
		// }
	} catch (err) {
		// console.log(err);
		// yield put(authActions.getInvitesFailed({message: "Bạn chưa đăng nhập"}));
		yield call(
			handleErrorSaga,
			err,
			authActions.firstAccessFailed({message: SERVER_ERR_STR})
		);
	}
}
function* acceptInvite(action: PayloadAction<{inviteId: string}>) {
	const {inviteId} = action.payload;

	try {
		const data: DataResponse<DefaultResponse> = yield call(
			authApi.acceptInvite,
			inviteId
		);

		if (data.success === true) {
			yield put(authActions.acceptInviteSuccess({inviteId}));
			yield put(groupActions.getGroup());
		} else {
			yield put(
				authActions.acceptInviteFailed({inviteId, message: data.message})
			);
		}
	} catch (err) {
		console.log(err);
		yield put(
			authActions.acceptInviteFailed({inviteId, message: SERVER_ERR_STR})
		);
	}
}

function* disagreeInvite(action: PayloadAction<{inviteId: string}>) {
	const {inviteId} = action.payload;
	try {
		const data: DefaultResponse = yield call(authApi.disagreeInvite, inviteId);

		if (data.success === true)
			yield put(authActions.disagreeInviteSuccess({inviteId}));
		else
			yield authActions.acceptInviteFailed({inviteId, message: data.message});
	} catch (err) {
		console.log(err);
		yield put(
			authActions.disagreeInviteFailed({inviteId, message: SERVER_ERR_STR})
		);
	}
}

function* disagreeAllInvite() {
	try {
		const data: DefaultResponse = yield call(authApi.disagreeAllInvite);
		if (data.success === true)
			yield put(authActions.disagreeAllInviteSuccess());
		else
			yield put(authActions.disagreeAllInviteFailed({message: data.message}));
	} catch (err) {
		console.log(err);
		yield put(authActions.disagreeAllInviteFailed({message: SERVER_ERR_STR}));
	}
}

function* handleLogout() {
	localStorage.removeItem(LOCALSTORAGE_TOKEN_NAME);
	localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN_NAME);
	localStorage.removeItem(LOCALSTORAGE_GROUP_NAME);
	// yield put(todoActions.clearState());
	// yield put(noteActions.clearState());
	// yield put(groupActions.getGroup());
	yield call(clearAllStateSaga);
}

function* handleRegister(action: PayloadAction<Auth>) {
	try {
		const data: DataResponse<User> = yield call(authApi.register, {
			data: action.payload,
		});
		if (data.success) {
			// data.token && localStorage.setItem(LOCALSTORAGE_TOKEN_NAME, data.token);

			yield put(authActions.registerSuccess(data.response));
			yield put(authActions.getInvites());
		} else {
			yield put(authActions.registerFailed(data.message));
		}
	} catch (error) {
		yield put(authActions.registerFailed("Server gặp sự cố"));
	}
}

function* watchLoginFlow() {
	yield throttle(2000, authActions.firstAccess.toString(), handleFirstAccess);

	yield throttle(2000, authActions.login.toString(), handleLogin);
	yield throttle(2000, authActions.register.toString(), handleRegister);
	yield throttle(2000, authActions.logout.toString(), handleLogout);
	yield throttle(
		3000,
		authActions.disagreeAllInvite.toString(),
		disagreeAllInvite
	);

	yield throttle(2000, authActions.getInvites.toString(), getInvites);
	yield throttle(2000, authActions.acceptInvite.toString(), acceptInvite);
	yield throttle(2000, authActions.disagreeInvite.toString(), disagreeInvite);
}

export function* authSaga() {
	yield fork(watchLoginFlow);
}
