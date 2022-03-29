import NoteCalendar, {
	CalendarNote,
	MonthAndYear,
	SelDates,
} from "../components/NoteCalendar";
import {
	getNoteData,
	getNoteLoading,
	getNoteSelectedNoteId,
	noteActions,
} from "../noteSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useEffect, useMemo, useState} from "react";

import NoteCreateForm from "../components/NoteCreateForm";
import NoteView from "../components/NoteView";
import {getSelectedGroupId} from "../../group/groupSlice";

export default function NotePage() {
	// const [selectedNote, setSelectedNote] = useState<string>("");
	const selectedNoteId: string | undefined = useAppSelector(
		getNoteSelectedNoteId
	);

	const dispatch = useAppDispatch();

	const noteData = useAppSelector(getNoteData);
	const noteLoading = useAppSelector(getNoteLoading);
	const groupId = useAppSelector(getSelectedGroupId);

	const [selDates, setSelDates] = useState<SelDates>({});

	const noteList: CalendarNote[] = useMemo(() => {
		return noteData
			? noteData.map(note => ({
					...note,
					from: new Date(note.from),
					to: new Date(note.to),
			  }))
			: [];
	}, [noteData]);

	const [currMonthAndYear, setCurrMonthAndYear] = useState<MonthAndYear>({
		year: new Date().getFullYear(),
		month: new Date().getMonth(),
	});

	const handleSetSelectedNote = (note?: CalendarNote) => {
		if (note === undefined) return;

		if (selectedNoteId === note._id) {
			return dispatch(noteActions.setSelectedNote(undefined));
		}
		const {_id, name, to, from, color} = note;

		dispatch(
			noteActions.setSelectedNote({
				_id,
				name,
				to: to.toISOString(),
				from: from.toISOString(),
				color,
			})
		);
	};

	useEffect(() => {
		dispatch(noteActions.getNote(currMonthAndYear));
	}, [currMonthAndYear, groupId]);

	useEffect(() => {
		return () => {
			dispatch(noteActions.clearState());
		};
	}, []);
	return (
		<div className="grid grid-cols-2 gap-3">
			<div className="col-span-2 md:col-span-1">
				<NoteCalendar
					noteList={noteList}
					loading={noteLoading}
					selDates={selDates}
					setSelDates={setSelDates}
					selectedNote={selectedNoteId}
					setSelectedNote={handleSetSelectedNote}
					currMonthAndYear={currMonthAndYear}
					setCurrMonthAndYear={setCurrMonthAndYear}
					className="bg-bgColor"
				/>
			</div>
			{/* Note Manage */}
			<div className="col-span-2 md:col-span-1">
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
