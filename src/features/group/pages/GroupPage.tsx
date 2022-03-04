import {useAppDispatch, useAppSelector} from "../../../app/hooks";

import {docActions} from "../../doc/docSlice";
import {useEffect} from "react";

export default function GroupPage() {
	const dispatch = useAppDispatch();

	const selectedGroup = useAppSelector(state => state.group.selectedGroup);

	useEffect(() => {
		if (selectedGroup) {
			dispatch(docActions.getDocList());
		}
	}, [selectedGroup]);

	return <div>group page</div>;
}
