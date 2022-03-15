import * as React from "react";

import {CalendarNote} from ".";
import {SelDates} from "./models";
import clsx from "clsx";

export interface NoteCalendarRowProp {
	noteList: CalendarNote[];
	dateList: Date[];
	dateInMonth: Date;

	selDates: SelDates;
	setSelDates: React.Dispatch<React.SetStateAction<SelDates>>;

	selectedNote?: string;
	setSelectedNote?: (data?: CalendarNote) => void;
}

const styles = {
	selDate: "absolute top-0 bottom-0 opacity-60 text-[0.5rem]",
};
export default function NoteCalendarRow({
	noteList,
	dateList,
	dateInMonth,

	selDates,
	setSelDates,

	selectedNote,
	setSelectedNote,
}: NoteCalendarRowProp) {
	// console.log(selDates);
	const now = new Date();

	const dateListLength = dateList.length - 1;
	const noteInRowList: CalendarNote[] = noteList.filter(note => {
		if (
			(dateList[0] <= note.from && note.from <= dateList[dateListLength]) ||
			(dateList[0] <= note.to && note.to <= dateList[dateListLength]) ||
			(note.from < dateList[0] && dateList[dateListLength] < note.to)
		)
			return true;

		return false;
	});

	const handleDateClick = (date: Date) => {
		setSelDates(preState => {
			if (preState.sel === undefined) return preState;

			if (preState.sel === 0) {
				if (preState.date1 !== undefined) {
					return {
						...preState,
						date0: date > preState.date1 ? preState.date1 : date,
						sel: 1,
					};
				}
				return {...preState, date0: date, sel: 1};
			}

			if (preState.sel === 1 && preState.date0 !== undefined) {
				if (date < preState.date0) return {...preState, date1: preState.date0};
			}

			return {...preState, date1: date};
		});
	};

	if (dateList.length === 0) return null;
	return (
		<div className="grid grid-cols-7">
			<ul className="grid grid-cols-7 col-span-7">
				{dateList.map((date, index) => (
					<li
						className={clsx(
							"relative flex items-center justify-center h-12 row-start-1 hover:bg-black/40",
							{
								"text-slate-400": dateInMonth.getMonth() !== date.getMonth(),
								"bg-bgColor":
									date.getDate() == now.getDate() &&
									date.getMonth() == now.getMonth() &&
									date.getFullYear() == now.getFullYear(),
							}
						)}
						key={index}
						onClick={() => {
							handleDateClick(date);
						}}
					>
						{selDates.sel !== undefined &&
							selDates.date0 !== undefined &&
							+selDates.date0 === +date && (
								<div
									className={clsx(
										"left-0 right-[50%] bg-red-500 rounded-l-md",
										styles.selDate,
										selDates.sel === 0 ? "brightness-125" : "brightness-75"
									)}
								>
									Bắt đầu
								</div>
							)}
						{selDates.sel !== undefined &&
							selDates.date1 !== undefined &&
							+selDates.date1 === +date && (
								<div
									className={clsx(
										"left-[50%] right-0 bg-blue-500 rounded-r-md",
										styles.selDate,
										selDates.sel === 1 ? "brightness-125" : "brightness-75"
									)}
								>
									Kết thúc
								</div>
							)}
						{date.getDate()}
					</li>
				))}
			</ul>
			{/* RENDER NOTE LIST */}
			<div className="grid grid-cols-7 col-span-7">
				{noteInRowList.map((note, index) => {
					const startCol =
						note.from <= dateList[0] ? 1 : note.from.getDay() + 1;
					const endCol =
						note.to >= dateList[dateListLength] ? 8 : note.to.getDay() + 2;
					return (
						<div
							key={index}
							className={clsx(
								"px-1 text-[14px] text-slate-200 cursor-pointer hover:brightness-150",
								note._id === selectedNote
									? "brightness-150"
									: "truncate h-[21px]",
								note.to > dateList[dateListLength]
									? "rounded-l-[6px]"
									: note.from < dateList[0]
									? "rounded-r-[6px]"
									: "rounded-[6px]"
							)}
							style={{
								backgroundColor: note.color,
								gridColumnStart: startCol,
								gridColumnEnd: endCol,
								gridRowStart: note.layer === undefined ? 1 : note.layer + 1,
							}}
							onClick={() => setSelectedNote && setSelectedNote(note)}
						>
							{note.title}
						</div>
					);
				})}
			</div>
		</div>
	);
}
