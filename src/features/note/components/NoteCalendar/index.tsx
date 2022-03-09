import {CalendarMode, CalendarNote, MonthAndYear, SelDates} from "./models";
import {Dispatch, SetStateAction, useMemo, useState} from "react";
import {createLayerNoteList2, getDateList, roundedDown} from "./core";

import NoteCalendarHeader from "./NoteCalendarHeader";
import NoteCalendarRow from "./NoteCalendarRow";

export * from "./models";

interface NoteCalendarProp {
	className?: string;

	loading?: boolean;
	noteList: CalendarNote[];

	selDates: SelDates;
	setSelDates: React.Dispatch<React.SetStateAction<SelDates>>;

	selectedNote?: string;
	setSelectedNote?: (data?: CalendarNote) => void;

	currMonthAndYear: MonthAndYear;
	setCurrMonthAndYear: Dispatch<SetStateAction<{year: number; month: number}>>;
}

// MAIN COMPONENT
export default function NoteCalendar({
	className,
	loading,
	noteList,
	selDates,
	setSelDates,
	selectedNote,
	setSelectedNote,
	currMonthAndYear,
	setCurrMonthAndYear,
}: NoteCalendarProp) {
	const now = new Date();

	const [mode, setMode] = useState<CalendarMode>(0);

	const noteWithLayerList: CalendarNote[] = createLayerNoteList2(noteList);
	// DEBUG
	// console.table(
	// 	noteWithLayerList.map(value => ({
	// 		title: value.title,
	// 		from: `${value.from.getDate()}/${value.from.getMonth()}`,
	// 		to: `${value.to.getDate()}/${value.to.getMonth()}`,
	// 		layer: value.layer,
	// 	}))
	// );
	// GET DATE LIST IN MONTH AND RENDER TO JSX ELEMENT
	const dateRowRenderList = useMemo(() => {
		const dateInMonth: Date = new Date(
			currMonthAndYear.year,
			currMonthAndYear.month,
			1
		);
		const dateList = getDateList(dateInMonth);

		const dateRowRenderList: JSX.Element[] = [];
		for (let i = 0; i < 7; i++) {
			const dateInRowList: Date[] = dateList.slice(i * 7, i * 7 + 7);

			dateRowRenderList.push(
				<NoteCalendarRow
					key={i}
					noteList={noteWithLayerList}
					dateList={dateInRowList}
					selDates={selDates}
					setSelDates={setSelDates}
					selectedNote={selectedNote}
					setSelectedNote={setSelectedNote}
					dateInMonth={
						new Date(currMonthAndYear.year, currMonthAndYear.month, 1)
					}
				/>
			);
		}
		return dateRowRenderList;
	}, [currMonthAndYear, noteList, selectedNote]);

	return (
		<div className={className}>
			<NoteCalendarHeader
				selectedDate={now}
				mode={mode}
				setMode={setMode}
				currMonthAndYear={currMonthAndYear}
				setCurrMonthAndYear={setCurrMonthAndYear}
			/>
			{mode === 0 ? (
				dateRowRenderList.map(dateRowRender => dateRowRender)
			) : (
				<SelectList
					currMonthAndYear={currMonthAndYear}
					mode={mode}
					setCurrMonthAndYear={setCurrMonthAndYear}
					setMode={setMode}
				/>
			)}
		</div>
	);
}

// MODE !== 0

const styles = {
	container: "grid grid-cols-3",
	item: "flex justify-center items-center h-16 cursor-pointer",
};

interface SelectListProp {
	currMonthAndYear: MonthAndYear;
	setCurrMonthAndYear: Dispatch<SetStateAction<MonthAndYear>>;
	mode: CalendarMode;
	setMode: Dispatch<SetStateAction<CalendarMode>>;
}
function SelectList({
	currMonthAndYear,
	setCurrMonthAndYear,
	mode,
	setMode,
}: SelectListProp) {
	// Handle Function
	const handleClick = (data: number) => {
		const {month, year} = currMonthAndYear;
		setCurrMonthAndYear({
			year: mode == 2 ? data : year,
			month: mode == 1 ? data : month,
		});
		setMode(0);
	};

	const dateListRender: JSX.Element[] = [];
	if (mode === 1) {
		for (let i = 0; i < 12; i++) {
			dateListRender.push(
				<li
					className={styles.item}
					key={i}
					onClick={() => {
						handleClick(i);
					}}
				>
					Tháng {i + 1}
				</li>
			);
		}
	}
	if (mode === 2) {
		const roudedYear: number = roundedDown(currMonthAndYear.year);
		for (let i = 0; i < 10; i++) {
			dateListRender.push(
				<li
					key={i}
					className={styles.item}
					onClick={() => {
						handleClick(roudedYear + i + 1);
					}}
				>
					{roudedYear + i + 1}
				</li>
			);
		}
	}
	return <ul className={styles.container}>{dateListRender}</ul>;
}
