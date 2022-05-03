import {useCallback, useEffect, useMemo, useRef, useState} from "react";

import clsx from "clsx";

const settings = {
	rowNum: 4,
	colNum: 5,
	cellWidth: 150,
};

export default function BlockPuzzleV2() {
	// default 2d data
	const [data, setData] = useState<number[][]>(
		getDefaultData(settings.rowNum, settings.colNum)
	);

	const isDone = useRef<boolean>(false);

	const checkCellList = useRef(
		getDefaultData(settings.rowNum, settings.colNum)
	);

	// Store empty block position
	const emptyPs = useRef<{row: number; col: number}>({
		row: settings.rowNum - 1,
		col: settings.colNum - 1,
	});

	// Store block elements
	const cellList = useRef<(HTMLDivElement | null)[][]>(data.map(() => []));

	// Store container top and left position
	const containerRef = useRef<{top?: number; left?: number}>({});

	useEffect(() => {
		handleCheckFinish();
	}, []);

	useEffect(() => {
		console.log("Xong");
	}, [isDone]);

	const handleBlockClick = (e: any) => {
		// console.table({clientY, pageY, screenY});
		const [col, row] = [
			e.target.offsetLeft / settings.cellWidth,
			e.target.offsetTop / settings.cellWidth,
		];

		if (row === undefined || col === undefined) return;

		// console.log({row, col});

		let preCell: HTMLDivElement | null = null;
		let preCheckCell: number = -1;

		// console.table({empty: emptyPs.current, row, col});

		// Clicked cell is in a same row with the empty cell row
		if (row === emptyPs.current.row) {
			// Clicked cell is in left side of the empty cell
			if (col < emptyPs.current.col) {
				for (let i = col; i <= emptyPs.current.col; i++) {
					const {storeCurrValue, storeCurrCheckValue} = handleChangeRow(
						i,
						row,
						col,
						preCell,
						preCheckCell
					);
					preCell = storeCurrValue;
					preCheckCell = storeCurrCheckValue;
				}
			} else {
				for (let i = col; i >= emptyPs.current.col; i--) {
					const {storeCurrValue, storeCurrCheckValue} = handleChangeRow(
						i,
						row,
						col,
						preCell,
						preCheckCell
					);
					preCell = storeCurrValue;
					preCheckCell = storeCurrCheckValue;
				}
			}
			emptyPs.current.col = col;
		}
		// Clicked cell is in a same column with the empty cell column
		if (col === emptyPs.current.col) {
			// Clicked cell is in top of the empty cell
			if (row < emptyPs.current.row) {
				for (let i = row; i <= emptyPs.current.row; i++) {
					const {storeCurrValue, storeCurrCheckValue} = handleChangeCol(
						i,
						row,
						col,
						preCell,
						preCheckCell
					);
					preCell = storeCurrValue;
					preCheckCell = storeCurrCheckValue;
				}
			} else {
				for (let i = row; i >= emptyPs.current.row; i--) {
					const {storeCurrValue, storeCurrCheckValue} = handleChangeCol(
						i,
						row,
						col,
						preCell,
						preCheckCell
					);
					preCell = storeCurrValue;
					preCheckCell = storeCurrCheckValue;
				}
			}

			emptyPs.current.row = row;
		}

		handleCheckFinish();

		console.log(`isDone flag:${isDone.current}`);
	};

	const handleChangeRow = (
		currCol: number,
		row: number,
		col: number,
		preCell: HTMLDivElement | null,
		preCheckValue?: number
	) => {
		const storeCurrValue = cellList.current[row][currCol];

		const storeCurrCheckValue = checkCellList.current[row][currCol];

		// Change cell List
		if (currCol === col) {
			cellList.current[row][currCol] =
				cellList.current[emptyPs.current.row][emptyPs.current.col];

			checkCellList.current[row][currCol] =
				checkCellList.current[emptyPs.current.row][emptyPs.current.col];
		} else if (preCell) {
			cellList.current[row][currCol] = preCell;

			preCheckValue !== undefined &&
				(checkCellList.current[row][currCol] = preCheckValue);
		}

		// Change position
		const currEle = cellList.current[row][currCol];
		currEle !== null &&
			(currEle.style.left = `${settings.cellWidth * currCol}px`);

		return {storeCurrValue, storeCurrCheckValue};
	};
	const handleChangeCol = (
		currRow: number,
		row: number,
		col: number,
		preCell: HTMLDivElement | null,
		preCheck: number
	) => {
		const storeCurrValue = cellList.current[currRow][col];

		const storeCurrCheckValue = checkCellList.current[currRow][col];
		if (currRow === row) {
			cellList.current[currRow][col] =
				cellList.current[emptyPs.current.row][emptyPs.current.col];

			checkCellList.current[currRow][col] =
				checkCellList.current[emptyPs.current.row][emptyPs.current.col];
		} else if (preCell) {
			cellList.current[currRow][col] = preCell;

			checkCellList.current[currRow][col] = preCheck;
		}
		// Change position
		const currEle = cellList.current[currRow][col];
		currEle !== null &&
			(currEle.style.top = `${settings.cellWidth * currRow}px`);

		return {storeCurrValue, storeCurrCheckValue};
	};

	// Check finish

	const handleCheckFinish = () => {
		let flag: boolean = true;

		for (let i = 0; i < settings.rowNum; i++) {
			for (let j = 0; j < settings.colNum; j++) {
				if (i === settings.rowNum - 1 && j === settings.colNum - 1) {
					if (checkCellList.current[i][j] !== -1) {
						flag = false;
					}
					break;
				}
				if (checkCellList.current[i][j] !== settings.colNum * i + j + 1) {
					flag = false;
					break;
				}
			}

			if (!flag) break;
		}

		isDone.current = flag;
	};

	// RENDER
	return (
		<div>
			<div
				className="bg-gray-500 relative"
				style={{
					width: `${settings.colNum * settings.cellWidth}px`,
					height: `${settings.rowNum * settings.cellWidth}px`,
				}}
				onClick={handleBlockClick}
				ref={ele =>
					(containerRef.current = {top: ele?.offsetTop, left: ele?.offsetLeft})
				}
			>
				{data.map((rows, i) =>
					rows.map((col, j) => (
						<div
							className={clsx(
								"border-red-500 flex items-center justify-center text-2xl absolute cursor-pointer transition-all",
								col !== -1 && "bg-orange-500 border-2"
							)}
							style={{
								width: `${settings.cellWidth}px`,
								height: `${settings.cellWidth}px`,
								left: `${settings.cellWidth * j}px`,
								top: `${settings.cellWidth * i}px`,
							}}
							ref={el => (cellList.current[i][j] = el)}
							key={col}
						>
							{col !== -1 && col}
						</div>
					))
				)}
			</div>
		</div>
	);
}

function getDefaultData(rowNum: number, colNum: number): number[][] {
	let result: number[][] = [];

	for (let i = 0; i < rowNum; i++) {
		result.push([]);
		for (let j = 0; j < colNum; j++) {
			result[i][j] = i * colNum + j + 1;
		}
	}

	result[rowNum - 1][colNum - 1] = -1;

	return result;
}
