import {
	Auth,
	AuthLogin,
	DefaultResponse,
	ErrorStatus,
	InvitesResponse,
} from "../../models";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";

import {RootState} from "../../app/store";
import {User} from "../../models/user";
import history from "../../app/history";
import {toast} from "react-toastify";

export const LOCALSTORAGE_TOKEN_NAME = "token";

export interface AuthState {
	loading: boolean;
	status: {
		login?: ErrorStatus;
		register?: ErrorStatus;
		acceptInvite?: ErrorStatus;
		disagreeInvite?: ErrorStatus;
	};
	isAuth: boolean;
	user?: User;
	invite: {
		data: InvitesResponse[];
		loading: boolean;
		error?: string;
	};
	navigateURL: string;
}

const initialState: AuthState = {
	loading: Boolean(localStorage.getItem(LOCALSTORAGE_TOKEN_NAME)),
	isAuth: Boolean(localStorage.getItem(LOCALSTORAGE_TOKEN_NAME)),
	navigateURL: "/",
	invite: {loading: true, data: []},
	status: {},
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// FIRST ACCESS
		firstAccess(state) {
			state.loading = Boolean(localStorage.getItem(LOCALSTORAGE_TOKEN_NAME));
			return state;
		},
		firstAccessSuccess(state, action: PayloadAction<User>) {
			state.loading = false;
			state.user = action.payload;
			state.isAuth = true;
			return state;
		},
		firstAccessFailed(state, action: PayloadAction<string>) {
			state.loading = false;
			state.user = undefined;
			state.isAuth = false;
			return state;
		},
		// HANDLE ERROR
		clearLoginStatus(state) {
			state.status.login = undefined;
		},
		clearRegisterStatus(state) {
			state.status.register = undefined;
		},
		// LOGIN
		login(state, action: PayloadAction<{username: string; password: string}>) {
			state.status.login = {loading: true};
			return state;
		},
		loginSuccess(state, action: PayloadAction<User>) {
			state.loading = false;
			state.isAuth = true;
			state.status.login = {error: false};
			state.user = action.payload;
			history.push("/");
			toast.success("Đăng nhập thành công");
			return state;
		},
		loginFailed(state, action: PayloadAction<string>) {
			state.loading = false;
			state.isAuth = false;
			state.status.login = {
				error: true,
				message: action.payload,
				loading: false,
			};
			state.user = undefined;
		},
		// REGISTER
		register(state, action: PayloadAction<Auth>) {
			state.status.register = {loading: true};
		},
		registerSuccess(state, action: PayloadAction<User>) {
			// state.isAuth = true;
			state.status.register = {error: false, loading: false};
			state.user = action.payload;
		},
		registerFailed(state, action: PayloadAction<string>) {
			state.loading = false;
			state.isAuth = false;
			state.status.register = {
				error: true,
				message: action.payload,
				loading: false,
			};
			state.user = undefined;
		},
		// GET INVITES (using in authSaga login and firstAccess)
		getInvites(state) {
			state.invite.loading = true;
			state.invite.error = undefined;
			state.invite.data = [];
			return state;
		},
		getInvitesSuccess(state, action: PayloadAction<InvitesResponse[]>) {
			state.invite.loading = false;
			state.invite.data = action.payload;

			return state;
		},
		getInvitesFailed(state, action: PayloadAction<{message: string}>) {
			state.loading = false;
			state.invite.error = action.payload.message;
			state.invite.data = [];
			return state;
		},
		// ACCEPT INVITE
		acceptInvite(state, action: PayloadAction<{inviteId: string}>) {
			state.status.acceptInvite = {loading: true};
			const foundInvite = state.invite.data.findIndex(
				invite => invite._id === action.payload.inviteId
			);
			if (foundInvite !== -1) state.invite.data[foundInvite].loading = true;
			return state;
		},
		acceptInviteSuccess(state, action: PayloadAction<{inviteId: string}>) {
			state.status.acceptInvite = {loading: false, error: false};
			state.invite.data = state.invite.data.filter(
				invite => invite._id !== action.payload.inviteId
			);
		},
		acceptInviteFailed(
			state,
			action: PayloadAction<{inviteId: string; message: string}>
		) {
			toast.error(`Chấp nhận lời mời thất bại ${action.payload.message}`);
			state.status.acceptInvite = {
				loading: false,
				error: true,
				message: action.payload.message,
			};
			const foundInvite = state.invite.data.findIndex(
				invite => invite._id === action.payload.inviteId
			);
			if (foundInvite !== -1)
				state.invite.data[foundInvite].loading = undefined;
			return state;
		},
		disagreeInvite(state, action: PayloadAction<{inviteId: string}>) {
			state.status.disagreeInvite = {
				loading: true,
				error: undefined,
				message: undefined,
			};
			const foundInviteIndex = state.invite.data.findIndex(
				invite => invite._id === action.payload.inviteId
			);
			if (foundInviteIndex !== -1)
				state.invite.data[foundInviteIndex].loading = true;
			return state;
		},
		disagreeInviteSuccess(state, action: PayloadAction<{inviteId: string}>) {
			state.invite.data = state.invite.data.filter(
				invite => invite._id !== action.payload.inviteId
			);
			state.status.disagreeInvite = {
				loading: false,
				error: false,
			};
			return state;
		},
		disagreeInviteFailed(
			state,
			action: PayloadAction<{inviteId: string; message: string}>
		) {
			state.status.disagreeInvite = {
				loading: false,
				error: undefined,
			};
			toast.error(`Xóa lời mời thất bài ${action.payload.message}`);
			const foundInviteIndex = state.invite.data.findIndex(
				invite => invite._id === action.payload.inviteId
			);
			if (foundInviteIndex !== -1)
				state.invite.data[foundInviteIndex].loading = undefined;
			return state;
		},
		disagreeAllInvite(state) {
			state.invite.data = state.invite.data.map(invite => ({
				...invite,
				loading: true,
			}));
			return state;
		},
		disagreeAllInviteSuccess(state) {
			state.invite.data = [];
			return state;
		},
		disagreeAllInviteFailed(state, action: PayloadAction<{message: string}>) {
			toast.error(`Không thể từ chói tất cả (${action.payload.message})`);
			state.invite.data = state.invite.data.map(invite => ({
				...invite,
				loading: undefined,
			}));
			return state;
		},
		// ADD INVITE (USE IN HEAERRIGHT COMPONENT)
		addInvite(state, action: PayloadAction<{invite: InvitesResponse}>) {
			if (state.invite.loading === true || state.invite.error) return state;

			const {invite} = action.payload;

			state.invite.data.push(invite);

			return state;
		},
		// LOGOUT
		logout(state) {
			state.loading = false;
			state.status = {};
			state.isAuth = false;
			state.invite = {loading: true, data: []};
			state.user = undefined;
			return state;
		},
	},
});

export const getAuthLoading = (state: RootState) => state.auth.loading;
export const getAuthInviteData = (state: RootState) => state.auth.invite.data;
export const getAuthIsAuth = (state: RootState) => state.auth.isAuth;
export const getAuthLoginStatus = (state: RootState) => state.auth.status.login;
export const getAuthRegisterStatus = (state: RootState) =>
	state.auth.status.register;

export const getAuthUser = (state: RootState) => state.auth.user;
export const getAuthUserId = (state: RootState) => state.auth.user?._id;
export const getAuthNavigateURL = (state: RootState) => state.auth.navigateURL;

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
