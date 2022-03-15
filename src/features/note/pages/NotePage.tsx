import NoteCalendar, {
	CalendarNote,
	MonthAndYear,
	SelDates,
} from "../components/NoteCalendar";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useEffect, useMemo, useState} from "react";

import NoteCreateForm from "../components/NoteCreateForm";
import NoteView from "../components/NoteView";
import {noteActions} from "../noteSlice";

export default function NotePage() {
	// const [selectedNote, setSelectedNote] = useState<string>("");
	const selectedNote: CalendarNote | undefined = useAppSelector(state => {
		const selectedNote = state.note.selectedNote;
		if (selectedNote === undefined) return undefined;
		return {
			...selectedNote,
			from: new Date(selectedNote.from),
			to: new Date(selectedNote.to),
		};
	});

	const dispatch = useAppDispatch();

	const noteInfo = useAppSelector(state => state.note);
	const groupId = useAppSelector(state => state.group.selectedGroup?._id);

	const [selDates, setSelDates] = useState<SelDates>({});

	const noteList: CalendarNote[] = useMemo(() => {
		return noteInfo.data
			? noteInfo.data.map(note => ({
					...note,
					from: new Date(note.from),
					to: new Date(note.to),
			  }))
			: [];
	}, [noteInfo.data]);

	const [currMonthAndYear, setCurrMonthAndYear] = useState<MonthAndYear>({
		year: new Date().getFullYear(),
		month: new Date().getMonth(),
	});

	const handleSetSelectedNote = (note?: CalendarNote) => {
		if (note === undefined) return;

		if (selectedNote?._id === note._id) {
			return dispatch(noteActions.setSelectedNote(undefined));
		}
		const {_id, title, to, from, todoList, color} = note;

		dispatch(
			noteActions.setSelectedNote({
				_id,
				title,
				to: to.toISOString(),
				from: from.toISOString(),
				todoList,
				color,
			})
		);
	};

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
					selectedNote={selectedNote?._id}
					setSelectedNote={handleSetSelectedNote}
					currMonthAndYear={currMonthAndYear}
					setCurrMonthAndYear={setCurrMonthAndYear}
					className="bg-bgColor"
				/>
			</div>
			{/* Note Manage */}
			<div className="col-span-2 md:col-span-1">
				{/* <NoteManage selectedNote={selectedNote} /> */}
				<NoteCreateForm
					className="bg-bgColor"
					selDates={selDates}
					setSelDates={setSelDates}
				/>
			</div>

			<div className="col-span-2 bg-bgColor">
				<NoteView />
			</div>
		</div>
	);
}
