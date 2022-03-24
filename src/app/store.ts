import {Action, ThunkAction, configureStore} from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import counterReducer from "../features/counter/counterSlice";
import createSagaMiddleware from "redux-saga";
import docReducer from "../features/doc/docSlice";
import groupReducer from "../features/group/groupSlice";
import noteReducer from "../features/note/noteSlice";
import rootSaga from "./rootSaga";
import todoReducer from "../features/todo/todoSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authReducer,
		group: groupReducer,
		doc: docReducer,
		note: noteReducer,
		todo: todoReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export function getSelectedGroupId() {
	const state = store.getState();
	return state.group.selectedGroup?._id;
}
