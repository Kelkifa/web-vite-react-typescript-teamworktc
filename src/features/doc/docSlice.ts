import {Doc, DocContent} from "../../models/doc";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";

import {RootState} from "../../app/store";

export interface DocState {
	loading: boolean;
	error?: string;
	data?: Doc[];
}

const initialState: DocState = {
	loading: true,
	data: [],
};
const docSlice = createSlice({
	name: "doc",
	initialState,
	reducers: {
		getDocList(state) {
			state.loading = true;
		},
		getDocListSuccess(state, action: PayloadAction<Doc[]>) {
			state.loading = false;
			state.data = action.payload;
		},
		getDocListFailed(state, action: PayloadAction<string>) {
			state.loading = false;
			state.data = undefined;
			state.error = action.payload;
		},

		getDocDetail(state, action: PayloadAction<string>) {},
		getDocDetailSuccess(state, action: PayloadAction<Doc>) {
			const docIndex = state.data?.findIndex(
				doc => doc._id === action.payload._id
			);
			if (
				docIndex !== -1 &&
				docIndex !== undefined &&
				state.data !== undefined
			) {
				state.data[docIndex] = action.payload;
				state.data[docIndex].isGetDetail = true;
			}
		},
	},
});

const docReducer = docSlice.reducer;
export const docActions = docSlice.actions;
export default docReducer;

// GEt FROM STATE
export const getDocContent = (
	state: RootState,
	docId?: string,
	contentId?: string
): DocContent | undefined => {
	if (!docId || !contentId) return undefined;
	const docList = state.doc.data;
	const foundDoc = docList?.find(doc => doc._id === docId);
	if (foundDoc) {
		const foundContent = foundDoc.contentList.find(
			content => content._id === contentId
		);
		return foundContent;
	}

	return undefined;
};

export const getDocIsGetDetail = (state: RootState, docId?: string) => {
	const foundDoc = state.doc.data?.find(doc => doc._id === docId);

	if (foundDoc) return foundDoc.isGetDetail;

	return undefined;
};
