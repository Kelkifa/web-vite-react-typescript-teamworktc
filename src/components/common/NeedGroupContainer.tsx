import {startSectionBackgroundStyle} from "../StartSection";
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
	if (error) return <div>{error}</div>;
	if (loading)
		return (
			<div className={startSectionBackgroundStyle}>
				<div className="container mx-auto">Loading ...</div>
			</div>
		);
	return children;
}
