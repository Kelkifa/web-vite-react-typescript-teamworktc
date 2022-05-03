import "./dev.scss";

import {useEffect, useRef} from "react";

import BlockPuzzule from "../game/blockPuzzle";
import BlockPuzzuleV2 from "../game/blockPuzzle/blockPuzzleV2";
import Foo from "./Foo";
import clsx from "clsx";

const testArr = [1, 2, 3, 4, 5];
export default function Dev() {
	return (
		<div className="bg-bgColor flex justify-center">
			{/* <BlockPuzzuleV2 /> */}
			<Foo />
		</div>
	);
}
