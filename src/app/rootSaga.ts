import {all, put, putResolve} from "redux-saga/effects";

import {authActions} from "../features/auth/authSlice";
import {authSaga} from "../features/auth/authSaga";
import {docSaga} from "../features/doc/docSaga";
import {groupActions} from "../features/group/groupSlice";
import {groupSaga} from "../features/group/groupSaga";
import {noteActions} from "../features/note/noteSlice";
import noteSaga from "../features/note/noteSaga";
import todoSaga from "../features/todo/todoSaga";

export default function* rootSaga() {
	yield all([authSaga(), groupSaga(), docSaga(), noteSaga(), todoSaga()]);
}

export interface PayloadError {
	message: string;
	[key: string]: any;
}
export function* handleErrorSaga(
	err: any,
	action: {type: string; payload: PayloadError}
) {
	try {
		switch (err.status) {
			case 400:
				yield put(toNewMessageAction("Bad request", action));
				break;
			case 401:
				yield put(toNewMessageAction("Invalid Token", action));
				yield put(authActions.logout());
				break;
			case 429:
				yield put(toNewMessageAction("Hãy thử lại trong ít phút", action));
				break;
			default:
				yield put(action);
				break;
		}
	} catch (err) {
		yield put(action);
		return;
	}
}

export function* clearAllStateSaga() {
	yield put(noteActions.clearState());
	yield put(groupActions.getGroup());
}

function toNewMessageAction(
	newMessage: string,
	action: {type: string; payload: PayloadError}
) {
	return {
		...action,
		payload: {...action.payload, message: newMessage},
	};
}
