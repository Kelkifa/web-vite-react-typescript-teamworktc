import "./dev.scss";

import TimeCount from "./TimeCount";

const testArr = [1, 2, 3, 4, 5];
export default function Dev() {
	return (
		<div className="bg-bgColor flex justify-center">
			{/* <BlockPuzzuleV2 /> */}
			<TimeCount />
		</div>
	);
}
