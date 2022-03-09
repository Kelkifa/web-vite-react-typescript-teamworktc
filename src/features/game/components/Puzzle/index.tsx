import {useEffect, useMemo, useState} from "react";

import PuzzleBlock from "./PuzzleBlock";
import clsx from "clsx";

interface PuzzleGameProp {
	className?: string;
	sizeX?: number;
	sizeY?: number;
}
export default function PuzzleGame({
	className,
	sizeX = 3,
	sizeY = 3,
}: PuzzleGameProp) {
	return <div className="bg-orange-500">puzzle</div>;
}
