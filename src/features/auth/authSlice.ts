import {Auth, AuthLogin, DefaultResponse} from "../../models";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";

import {User} from "../../models/user";
import {stat} from "fs";

export const LOCALSTORAGE_TOKEN_NAME = "token";

export interface AuthState {
	loading: boolean;
	error?: string;
	isAuth: boolean;
	user?: User;
}

const initialState: AuthState = {
	loading: false,
	error: undefined,
	isAuth: Boolean(localStorage.getItem(LOCALSTORAGE_TOKEN_NAME)),
	user: undefined,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// FIRST ACCESS
		firstAccess(state) {
			state.loading = Boolean(localStorage.getItem(LOCALSTORAGE_TOKEN_NAME));
		},
		firstAccessSuccess(state, action: PayloadAction<User>) {
			state.loading = false;
			state.user = action.payload;
			state.isAuth = true;
		},
		firstAccessFailed(state, action: PayloadAction<string>) {
			state.loading = false;
			state.user = undefined;
			state.isAuth = false;
			state.error = action.payload;
		},

		// LOGIN
		login(state, action: PayloadAction<{username: string; password: string}>) {
			state.loading = true;
		},
		loginSuccess(state, action: PayloadAction<User>) {
			state.loading = false;
			state.isAuth = true;
			state.error = undefined;
			state.user = action.payload;
		},
		loginFailed(state, action: PayloadAction<string>) {
			state.loading = false;
			state.isAuth = false;
			state.error = action.payload;
			state.user = undefined;
		},

		register(state, action: PayloadAction<Auth>) {
			state.loading = true;
		},
		registerSuccess(state, action: PayloadAction<User>) {
			state.loading = false;
			state.isAuth = true;
			state.error = undefined;
			state.user = action.payload;
		},
		registerFailed(state, action: PayloadAction<string>) {
			state.loading = false;
			state.isAuth = false;
			state.error = action.payload;
			state.user = undefined;
		},

		// LOGOUT
		logout(state) {
			state.loading = false;
			state.error = undefined;
			state.isAuth = false;
			state.user = undefined;
		},
	},
});

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
