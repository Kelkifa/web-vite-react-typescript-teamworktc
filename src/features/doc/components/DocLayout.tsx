import {Outlet, useLocation} from "react-router";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useEffect, useMemo} from "react";

import DocLeftbar from "./DocLeftbar";
import {docActions} from "../docSlice";

export default function DocLayout() {
	const docInfo = useAppSelector(state => state.doc);
	const selectedGroupId = useAppSelector(
		state => state.group.selectedGroup?._id
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!selectedGroupId) return;
		dispatch(docActions.getDocList());
	}, [selectedGroupId]);

	if (docInfo.error) return <div>Doc error {docInfo.error}</div>;
	if (docInfo.loading) return <div>Doc Loading ...</div>;
	return (
		<div className="flex bg-slate-900 text-slate-400">
			<DocLeftbar docList={docInfo.data} />
			<Outlet />
		</div>
	);
}
