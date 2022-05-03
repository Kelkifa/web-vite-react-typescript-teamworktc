import {PayloadAction, createSlice} from "@reduxjs/toolkit";

import {DEMO_GROUP_TYPE} from "../../app/variablies";
import {ErrorStatus} from "../../models";
import {Group} from "../../models/group";
import {LOCALSTORAGE_TOKEN_NAME} from "../auth/authSlice";
import {RootState} from "../../app/store";
import {User} from "../../models/user";
import {stat} from "fs";
import {toast} from "react-toastify";

export const LOCALSTORAGE_GROUP_NAME = "groupId";
export interface GroupState {
	loading: boolean;
	error?: string;
	data: Group[];
	selectedGroup?: Group;
	member: {
		loading: boolean;
		error?: string;
		data: User[];
	};
	status: {
		create?: ErrorStatus;
	};
	search: Group[];
}

const initialState: GroupState = {
	loading: true,
	member: {loading: true, data: []},
	data: [],
	status: {},
	search: [],
};
const groupSlice = createSlice({
	name: "group",
	initialState: initialState,
	reducers: {
		// GET
		getGroup(state) {
			return initialState;
		},
		getGroupSuccess(state, action: PayloadAction<Group[]>) {
			state.loading = false;
			state.error = undefined;
			state.data = action.payload;
		},
		getGroupSuccessFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.data = [];
			toast.error(action.payload);
		},

		// GET MEMBERS
		getMembers(state, action: PayloadAction<{groupId: string}>) {
			state.member = {loading: true, data: []};
			return state;
		},
		getMembersSuccess(state, action: PayloadAction<{members: User[]}>) {
			const {members} = action.payload;
			state.member = {loading: false, data: members, error: undefined};
			return state;
		},
		getMembersFailed(state, action: PayloadAction<{message: string}>) {
			const {message} = action.payload;
			state.member = {loading: false, data: [], error: message};
			return state;
		},
		// DELETE MEMBER
		deleteMember(
			state,
			action: PayloadAction<{groupId: string; memberId: string}>
		) {
			const {groupId, memberId} = action.payload;
			if (
				state.selectedGroup?._id !== groupId ||
				state.member.loading === true ||
				state.member.error
			)
				return state;

			const foundMemberIndex = state.member.data.findIndex(
				member => member._id === memberId
			);
			if (foundMemberIndex !== -1) {
				state.member.data[foundMemberIndex].loading = true;
			}

			return state;
		},
		deleteMemberSuccess(
			state,
			action: PayloadAction<{groupId: string; memberId: string}>
		) {
			const {groupId, memberId} = action.payload;
			if (
				state.selectedGroup?._id !== groupId ||
				state.member.loading === true ||
				state.member.error
			)
				return state;

			state.member.data = state.member.data.filter(
				member => member._id !== memberId
			);
			return state;
		},

		deleteMemberFailed(
			state,
			action: PayloadAction<{
				groupId: string;
				memberId: string;
				message: string;
			}>
		) {
			const {groupId, memberId, message} = action.payload;
			if (
				state.selectedGroup?._id !== groupId ||
				state.member.loading === true ||
				state.member.error
			)
				return state;

			const foundMemberIndex = state.member.data.findIndex(
				member => member._id === memberId
			);
			if (foundMemberIndex !== -1) {
				state.member.data[foundMemberIndex].loading = undefined;
			}

			toast.error(`Xóa thành viên thất bại (${message})`);
			return state;
		},

		// CREATE
		create(state, action: PayloadAction<{name: string}>) {
			const {payload} = action;
			state.status.create = {loading: true};
			state.data.push({name: payload.name, type: "user", loading: true});
			return state;
		},
		createSuccess(state, action: PayloadAction<{group: Group}>) {
			const {payload} = action;
			toast.success(`Tạo nhóm ${payload.group.name} thành công`);
			state.status.create = {loading: false, error: false};
			const foundGroupIndex = state.data.findIndex(
				group => group.name === payload.group.name && group.loading === true
			);

			if (foundGroupIndex !== -1) state.data[foundGroupIndex] = payload.group;

			return state;
		},
		createFailed(
			state,
			action: PayloadAction<{name: string; message: string}>
		) {
			const {name, message} = action.payload;
			state.status.create = {loading: false, error: true};
			toast.error(`Tạo nhóm ${name} thất bại (${message})`);
			const foundGroupIndex = state.data.findIndex(
				group => group.name === name && group.loading === true
			);

			if (foundGroupIndex !== -1) state.data.splice(foundGroupIndex, 1);

			return state;
		},

		setSeletedGroup(state, action: PayloadAction<Group>) {
			action.payload._id &&
				localStorage.setItem(LOCALSTORAGE_GROUP_NAME, action.payload._id);
			state.selectedGroup = action.payload;
		},

		// INVITE
		invite(
			state,
			action: PayloadAction<{groupId: string; username: string}>
		) {},
		inviteSuccess(
			state,
			action: PayloadAction<{groupId: string; username: string}>
		) {
			const {username, groupId} = action.payload;
			toast.success(`Mời thành viên ${username} thành công`);
		},
		inviteFailed(
			state,
			action: PayloadAction<{
				groupId: string;
				username: string;
				message: string;
			}>
		) {
			toast.error(`Mời thành viên thất bại (${action.payload.message})`);
		},
		outGroup(state, action: PayloadAction<{groupId: string}>) {
			const {groupId} = action.payload;
			if (state.loading || state.error) return state;

			const foundGroupIndex = state.data.findIndex(
				group => group._id === groupId
			);
			if (foundGroupIndex !== -1) state.data[foundGroupIndex].loading = true;
			return state;
		},
		outGroupSuccess(state, action: PayloadAction<{groupId: string}>) {
			const {groupId} = action.payload;

			if (state.loading || state.error) return state;
			const foundGroupIndex = state.data.findIndex(
				group => group._id === groupId
			);
			if (foundGroupIndex !== -1) {
				toast.success(`Bạn đã rời nhóm ${state.data[foundGroupIndex].name}`);
				state.data.splice(foundGroupIndex, 1);
			} else {
				toast.success(`Bạn đã rời nhóm`);
			}
			const foundGroupDemo = state.data.find(
				group => group.type === DEMO_GROUP_TYPE
			);

			if (foundGroupDemo) state.selectedGroup = foundGroupDemo;
			else {
				state.selectedGroup = undefined;
			}

			return state;
		},
		outGroupFailed(
			state,
			action: PayloadAction<{groupId: string; message: string}>
		) {
			const {groupId, message} = action.payload;

			toast.error(`Rời nhóm không thành công (${message})`);

			if (state.loading || state.error) return state;

			const foundGroupIndex = state.data.findIndex(
				group => group._id === groupId
			);
			if (foundGroupIndex !== -1)
				state.data[foundGroupIndex].loading = undefined;

			return state;
		},
		// DELETE
		delete(state, action: PayloadAction<{groupId: string}>) {
			const {groupId} = action.payload;

			if (state.loading || state.error) return state;

			const foundGroupIndex = state.data.findIndex(
				group => group._id === groupId
			);
			if (foundGroupIndex !== -1) state.data[foundGroupIndex].loading = true;
			return state;
		},
		deleteSuccess(state, action: PayloadAction<{groupId: string}>) {
			const {groupId} = action.payload;

			if (state.loading || state.error) return state;
			const foundGroupIndex = state.data.findIndex(
				group => group._id === groupId
			);
			if (foundGroupIndex !== -1) {
				toast.success(
					`Xóa nhóm ${state.data[foundGroupIndex].name} thành công`
				);
				state.data.splice(foundGroupIndex, 1);
			} else {
				toast.success(`Xóa nhóm thành công`);
			}
			const foundGroupDemo = state.data.find(
				group => group.type === DEMO_GROUP_TYPE
			);

			if (foundGroupDemo) state.selectedGroup = foundGroupDemo;
			else {
				state.selectedGroup = undefined;
			}

			return state;
		},
		deleteFailed(
			state,
			action: PayloadAction<{groupId: string; message: string}>
		) {
			const {groupId, message} = action.payload;

			toast.error(`Xóa nhóm không thành công (${message})`);

			if (state.loading || state.error) return state;

			const foundGroupIndex = state.data.findIndex(
				group => group._id === groupId
			);
			if (foundGroupIndex !== -1)
				state.data[foundGroupIndex].loading = undefined;

			return state;
		},

		fastSearch(state, action: PayloadAction<{searchStr: string}>) {},
		fastSearchSuccess(state, action: PayloadAction<{data: Group[]}>) {
			state.search = action.payload.data;
			return state;
		},

		clearSearch(state) {
			state.search = [];
			return state;
		},
		clearMember(state) {
			state.member = {loading: true, data: []};
			return state;
		},
		clearState(state) {
			return initialState;
		},
	},
});

export const getGroup = (state: RootState) => state.group.data;
export const getGroupLoading = (state: RootState) => state.group.loading;
export const getGroupError = (state: RootState) => state.group.error;
export const getGroupData = (state: RootState) => state.group.data;

export const getGroupMember = (state: RootState) => state.group.member.data;
export const getGroupMemberLoading = (state: RootState) =>
	state.group.member.loading;
export const getGroupMemberError = (state: RootState) =>
	state.group.member.error;

export const getGroupCreateStatus = (state: RootState) =>
	state.group.status.create;

export const getSelectedGroupId = (state: RootState) =>
	state.group.selectedGroup?._id;

export const getGroupSelected = (state: RootState) => state.group.selectedGroup;

export const getGroupFastSearch = (state: RootState) => state.group.search;

export const groupActions = groupSlice.actions;

const groupReducer = groupSlice.reducer;

export default groupReducer;
