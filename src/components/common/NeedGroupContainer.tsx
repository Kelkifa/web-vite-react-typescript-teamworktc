import {getGroupStatus} from "../../features/group/groupSlice";
import {useAppSelector} from "../../app/hooks";

export default function NeedGroupContainer({
	children,
}: {
	children: JSX.Element;
}) {
	const loading = useAppSelector(state => state.group.loading);
	const error = useAppSelector(state => state.group.error);

	// const {loading, error} = {loading: false, error: false};

	console.log("rerender");
	// RENDER
	if (error) return <div>{error}</div>;
	if (loading) return <div>Loading ...</div>;
	return children;
}
