import {ErrorComponent, LoadComponent} from "../LoadComponent";

import {useAppSelector} from "../../app/hooks";

export default function NeedGroupContainer({
	children,
}: {
	children: JSX.Element;
}) {
	const loading = useAppSelector(state => state.group.loading);
	const error = useAppSelector(state => state.group.error);

	// const {loading, error} = {loading: false, error: false};

	// RENDER
	if (error) return <ErrorComponent error={error} />;
	if (loading) return <LoadComponent />;
	return children;
}
