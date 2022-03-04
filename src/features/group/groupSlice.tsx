import {PayloadAction, createSlice} from "@reduxjs/toolkit";

import {Group} from "../../models/group";
import {LOCALSTORAGE_TOKEN_NAME} from "../auth/authSlice";
import {RootState} from "../../app/store";

export const LOCALSTORAGE_GROUP_NAME = "groupId";
export interface GroupState {
	loading: boolean;
	error?: string;
	groupList?: Group[];
	selectedGroup?: Group;
}

const initialState: GroupState = {
	loading: Boolean(localStorage.getItem(LOCALSTORAGE_TOKEN_NAME)),
};
const groupSlice = createSlice({
	name: "group",
	initialState: initialState,
	reducers: {
		getGroup(state) {
			state.loading = true;
		},
		getGroupSuccess(state, action: PayloadAction<Group[]>) {
			state.loading = false;
			state.error = undefined;
			state.groupList = action.payload;
		},
		getGroupSuccessFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.groupList = undefined;
		},

		setSeletedGroup(state, action: PayloadAction<Group>) {
			localStorage.setItem(LOCALSTORAGE_GROUP_NAME, action.payload._id);
			state.selectedGroup = action.payload;
		},
	},
});

export const getGroupStatus = (state: RootState) => {
	const {loading, error, selectedGroup} = state.group;
	return {loading, error, selectedGroup};
};

export const getSelectedGroupId = (state: RootState) => {
	return state.group.selectedGroup?._id;
};

export const groupActions = groupSlice.actions;

const groupReducer = groupSlice.reducer;

export default groupReducer;
