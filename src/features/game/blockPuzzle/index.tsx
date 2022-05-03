import {useEffect, useMemo, useRef, useState} from "react";

import clsx from "clsx";

const settings = {
	rowNum: 3,
	columnNum: 3,
	height: 600,
	width: 600,
};

const styles = {
	container: `w-[600px] h-[600px] bg-white`,

	cell: `flex items-center justify-center border-pink-500 text-white text-[2.5rem] cursor-pointer`,
};

export default function BlockPuzzule() {
	const [data, setData] = useState<number[][]>(
		getDefaultData(settings.rowNum, settings.columnNum)
	);

	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	// console.log(data);
	const emptyCellPs = useRef<{r: number; c: number}>({
		r: settings.rowNum - 1,
		c: settings.columnNum - 1,
	});

	const renderData: {r: number; c: number; value: number}[] = useMemo(() => {
		let result: {r: number; c: number; value: number}[] = [];
		for (var i = 0; i < settings.rowNum; i++) {
			for (var j = 0; j < settings.columnNum; j++) {
				result.push({r: i, c: j, value: data[i][j]});
			}
		}

		return result;
	}, [data]);

	useEffect(() => {
		// console.log(1);
		// check success
		let isDone: boolean = true;
		for (let i = 0; i < settings.rowNum; i++) {
			for (let j = 0; j < settings.columnNum; j++) {
				if (
					i === settings.rowNum - 1 &&
					j === settings.columnNum - 1 &&
					data[i][j] === -1
				) {
					break;
				}
				if (data[i][j] !== i * settings.columnNum + j + 1) {
					isDone = false;
					break;
				}
			}
			if (isDone === false) break;
		}
		// console.log(isDone);
		setIsSuccess(isDone);
	}, [emptyCellPs.current.r, emptyCellPs.current.c]);

	const handleCellClick = (row: number, column: number) => {
		// ROW
		if (emptyCellPs.current.r === row) {
			setData(preData => {
				let newData = [...preData];

				let preValue: null | number = null;

				if (column < emptyCellPs.current.c) {
					for (let i = column; i <= emptyCellPs.current.c; i++) {
						if (i === column) {
							preValue = newData[row][i];
							newData[row][i] = -1;
						} else {
							if (preValue !== null) {
								const storePrevalue = newData[row][i];
								newData[row][i] = preValue;
								preValue = storePrevalue;
							}
						}
					}
				} else {
					for (let i = column; i >= emptyCellPs.current.c; i--) {
						if (i === column) {
							preValue = newData[row][i];
							newData[row][i] = -1;
						} else {
							if (preValue !== null) {
								const storePrevalue = newData[row][i];
								newData[row][i] = preValue;
								preValue = storePrevalue;
							}
						}
					}
				}
				emptyCellPs.current.c = column;

				return newData;
			});

			return;
		}

		// COLUMN
		if (emptyCellPs.current.c === column) {
			setData(preData => {
				// return updateData(preData, row, column, emptyCellPs.current.r);
				let newData = [...preData];

				let preValue: null | number = null;

				if (row < emptyCellPs.current.r) {
					for (let i = row; i <= emptyCellPs.current.r; i++) {
						if (i === row) {
							preValue = newData[i][column];
							newData[i][column] = -1;
						} else {
							if (preValue !== null) {
								const storePrevalue = newData[i][column];
								newData[i][column] = preValue;
								preValue = storePrevalue;
							}
						}
					}
				} else {
					for (let i = row; i >= emptyCellPs.current.r; i--) {
						if (i === row) {
							preValue = newData[i][column];
							newData[i][column] = -1;
						} else {
							if (preValue !== null) {
								const storePrevalue = newData[i][column];
								newData[i][column] = preValue;
								preValue = storePrevalue;
							}
						}
					}
				}
				emptyCellPs.current.r = row;

				return newData;
			});
		}
	};

	return (
		<div>
			<div className={clsx(styles.container, "relative text-red-500")}>
				{renderData.map(value => {
					const cellWidth = settings.width / settings.columnNum;
					const cellHeight = settings.height / settings.rowNum;
					return (
						<div
							key={value.value}
							className={clsx(
								value.value !== -1 && "bg-orange-500 border-2",
								"block-puzzle-move absolute",
								styles.cell
							)}
							onClick={() => {
								if (value.value === -1) return;
								handleCellClick(value.r, value.c);
							}}
							style={{
								width: cellWidth,
								height: cellHeight,
								left: cellWidth * value.c,
								top: cellHeight * value.r,
							}}
						>
							{value.value !== -1 && value.value}
						</div>
					);
				})}
			</div>
			<div className="text-orange">{isSuccess && "Hoàn thành"}</div>
		</div>
	);
}

function getDefaultData(rowNum: number, columnNum: number) {
	let defaultData: number[][] = [];
	for (let i = 0; i < rowNum; i++) {
		defaultData.push([]);
		for (let j = 0; j < columnNum; j++) {
			defaultData[i].push(i * columnNum + j + 1);
		}
	}
	defaultData[rowNum - 1][columnNum - 1] = -1;

	return defaultData;
}
