import clsx from "clsx";

export interface PuzzleBlockProp {
	x: number;
	y: number;
	onClick: (x: number, y: number) => void;
}

export default function PuzzleBlock({x, y, onClick}: PuzzleBlockProp) {
	return (
		<div
			className={clsx(
				"w-14 h-14 bg-yellow-500 flex items-center justify-center border-2 border-orange-400",
				`col-start-${x + 1} row-start-${y + 1}`
			)}
			onClick={() => {
				onClick(x, y);
			}}
		>
			{x + y * 3 + 1}
		</div>
	);
}
