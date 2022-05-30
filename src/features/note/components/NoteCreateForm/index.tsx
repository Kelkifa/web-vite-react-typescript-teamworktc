import {FiChevronLeft} from "react-icons/fi";
import NoteForm from "./NoteForm";
import {NoteFormValue} from "../../../../models/Note";
import NoteUpdateForm from "./NoteUpdateForm";
import {SelDates} from "../NoteCalendar";
import clsx from "clsx";
import {useAppSelector} from "../../../../app/hooks";
import {useState} from "react";

interface NoteCreateFormProp {
	className?: string;
	loading: boolean;
	selDates: SelDates;
	setSelDates: React.Dispatch<React.SetStateAction<SelDates>>;
}
export default function NoteCreateForm({
	className = "",
	loading,
	selDates,
	setSelDates,
}: NoteCreateFormProp) {
	const [isUpdate, setIsUpdate] = useState<boolean>(false);

	const selectedNote: NoteFormValue | undefined = useAppSelector(state => {
		const selectedNote = state.note.selectedNote;
		if (!selectedNote) return undefined;

		const toDate = new Date(selectedNote.to);
		const fromDate = new Date(selectedNote.from);
		return {
			_id: selectedNote._id,
			name: selectedNote.name,
			color: selectedNote.color,
			to: `${toDate.getDate()}/${
				toDate.getMonth() + 1
			}/${toDate.getFullYear()}`,
			from: `${fromDate.getDate()}/${
				fromDate.getMonth() + 1
			}/${fromDate.getFullYear()}`,
		};
	});

	return (
		<div className={clsx(className, "p-2 pb-3")}>
			<div className="flex justify-between items-center">
				<span>
					{isUpdate && (
						<FiChevronLeft
							className="cursor-pointer"
							onClick={() => {
								setIsUpdate(false);
							}}
						/>
					)}
				</span>
				<span>
					{!isUpdate && (
						<button
							className="hover:underline text-sm"
							onClick={() => {
								setIsUpdate(preIsUpdate => !preIsUpdate);
							}}
						>
							Cập nhật
						</button>
					)}
				</span>
			</div>
			{isUpdate ? (
				<NoteUpdateForm
					isLoading={loading}
					selDates={selDates}
					setSelDates={setSelDates}
					initialData={selectedNote}
				/>
			) : (
				<NoteForm
					isLoading={loading}
					selDates={selDates}
					setSelDates={setSelDates}
				/>
			)}
		</div>
	);
}
