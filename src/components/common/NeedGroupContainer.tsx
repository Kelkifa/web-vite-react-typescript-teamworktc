import {getGroupStatus} from "../../features/group/groupSlice";
import {useAppSelector} from "../../app/hooks";

export default function NeedGroupContainer({
	children,
}: {
	children: JSX.Element;
}) {
	const groupState = useAppSelector(getGroupStatus);

	// RENDER
	if (groupState.error) return <div>{groupState.error}</div>;
	if (groupState.loading) return <div>Loading ...</div>;
	return children;
}
