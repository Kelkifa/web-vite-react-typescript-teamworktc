import {CalendarMode, MonthAndYear} from ".";
import {Dispatch, SetStateAction} from "react";
import {
	FiChevronLeft,
	FiChevronRight,
	FiChevronsLeft,
	FiChevronsRight,
} from "react-icons/fi";

import LoadIcon from "../../../../components/LoadIcon";
import {roundedDown} from "./core";

const styles = {
	btnItem: "col-span-2 w-full cursor-pointer flex items-center justify-center",
};

export interface NoteCalendarHeaderProp {
	loading?: boolean;
	selectedDate: Date;
	mode: CalendarMode;
	currMonthAndYear: MonthAndYear;
	setCurrMonthAndYear: (
		data: MonthAndYear
	) => void | Dispatch<SetStateAction<MonthAndYear>>;
	setMode: Dispatch<SetStateAction<CalendarMode>>;
}

export default function NoteCalendarHeader({
	loading,
	selectedDate,
	mode,
	currMonthAndYear,
	setCurrMonthAndYear,
	setMode,
}: NoteCalendarHeaderProp) {
	const dateInMonth: Date = new Date(
		currMonthAndYear.year,
		currMonthAndYear.month,
		1
	);

	let renderHeader: string | number = `Tháng ${
		dateInMonth.getMonth() + 1
	} ${dateInMonth.getFullYear()}`;
	if (mode === 1) {
		renderHeader = dateInMonth.getFullYear();
	} else if (mode === 2) {
		const roundedDownYear: number = roundedDown(dateInMonth.getFullYear());
		renderHeader = `${roundedDownYear + 1}-${roundedDownYear + 10}`;
	}

	const handleChangeMode = () => {
		if (mode === 2) {
			setMode(0);
		} else if (mode === 1) {
			setMode(2);
		} else {
			setMode(1);
		}
	};

	// HANDLE FUNCTIONS

	// <
	const handleArrowLeftClick = () => {
		const {month, year} = currMonthAndYear;

		let newDate = {month: month - 1, year};
		if (mode === 0) {
			newDate = {month: month - 1, year};
		} else {
			newDate = {month, year: year - (mode < 2 ? 1 : 10)};
		}

		if (checkYearSmaller100(newDate)) {
			return;
		}

		setCurrMonthAndYear(newDate);
	};
	// >
	const handleArrowRightClick = () => {
		const {month, year} = currMonthAndYear;
		if (mode === 0) {
			setCurrMonthAndYear({month: month + 1, year});
			return;
		}
		setCurrMonthAndYear({month, year: year + (mode < 2 ? 1 : 10)});
	};
	// <<
	const handleArrowsLeftClick = () => {
		const stepList = [1, 10, 100];
		const newDate = {
			...currMonthAndYear,
			year: currMonthAndYear.year - stepList[mode],
		};

		if (checkYearSmaller100(newDate)) {
			return;
		}

		setCurrMonthAndYear(newDate);
	};
	// >>
	const handleArrowsRightClick = () => {
		const stepList = [1, 10, 100];
		setCurrMonthAndYear({
			...currMonthAndYear,
			year: currMonthAndYear.year + stepList[mode],
		});
	};

	return (
		<div className="grid grid-cols-14 h-10">
			<div className={styles.btnItem} onClick={handleArrowsLeftClick}>
				<FiChevronsLeft />
			</div>
			<div className={styles.btnItem} onClick={handleArrowLeftClick}>
				<FiChevronLeft />
			</div>
			<div
				className="col-span-6 w-full flex items-center justify-center gap-1 text-red-500 cursor-pointer"
				onClick={() => {
					handleChangeMode();
				}}
			>
				<span>{renderHeader}</span>
				{loading && <LoadIcon className="text-orange-400" />}
			</div>
			<div className={styles.btnItem} onClick={handleArrowRightClick}>
				<FiChevronRight />
			</div>
			<div className={styles.btnItem} onClick={handleArrowsRightClick}>
				<FiChevronsRight />
			</div>
		</div>
	);
}

function checkYearSmaller100(newDate: {month: number; year: number}): boolean {
	if (newDate.year - newDate.month / 11 < 100) {
		return true;
	}

	return false;
}
