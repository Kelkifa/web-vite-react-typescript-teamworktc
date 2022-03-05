import NoteCalendar, {
	CalendarNote,
	MonthAndYear,
	SelDates,
} from "../components/NoteCalendar";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useEffect, useState} from "react";

import NoteCreateForm from "../components/NoteCreateForm";
import NoteManage from "../components/NoteManage";
import {noteActions} from "../noteSlice";

export default function NotePage() {
	const [selectedNote, setSelectedNote] = useState<string>("");

	const dispatch = useAppDispatch();

	const noteInfo = useAppSelector(state => state.note);
	const groupId = useAppSelector(state => state.group.selectedGroup?._id);

	const [selDates, setSelDates] = useState<SelDates>({});

	// console.log(selDates);
	const noteList: CalendarNote[] = noteInfo.data
		? noteInfo.data.map(note => ({
				...note,
				from: new Date(note.from),
				to: new Date(note.to),
		  }))
		: [];

	const [currMonthAndYear, setCurrMonthAndYear] = useState<MonthAndYear>({
		year: new Date().getFullYear(),
		month: new Date().getMonth(),
	});

	useEffect(() => {
		dispatch(noteActions.getNote(currMonthAndYear));
	}, [currMonthAndYear, groupId]);
	return (
		<div className="grid grid-cols-2 gap-3">
			<div className="col-span-2 md:col-span-1">
				<NoteCalendar
					noteList={noteList}
					loading={noteInfo.loading}
					selDates={selDates}
					setSelDates={setSelDates}
					selectedNote={selectedNote}
					setSelectedNote={setSelectedNote}
					currMonthAndYear={currMonthAndYear}
					setCurrMonthAndYear={setCurrMonthAndYear}
					className="bg-bgColor"
				/>
			</div>
			{/* Note Manage */}
			<div className="col-span-2 md:col-span-1 bg-bgColor">
				{/* <NoteManage selectedNote={selectedNote} /> */}
				<NoteCreateForm selDates={selDates} setSelDates={setSelDates} />
			</div>
		</div>
	);
}
