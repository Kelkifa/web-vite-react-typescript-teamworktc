import {docActions, getDocContent, getDocIsGetDetail} from "../docSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";

import {useEffect} from "react";
import {useParams} from "react-router-dom";

// function useQuery() {
// 	const {search} = useLocation();

// 	return useMemo(() => new URLSearchParams(search), [search]);
// }
export default function DocContentPage() {
	const {docId, contentId} = useParams();

	const doc = useAppSelector(state => getDocContent(state, docId, contentId));
	const isGetDetail = useAppSelector(state => getDocIsGetDetail(state, docId));

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!docId || !contentId) return;
		dispatch(docActions.getDocDetail(docId));
	}, [docId, contentId]);

	if (!isGetDetail) return <div>loading ...</div>;

	return <div>{doc?.data}</div>;
}
