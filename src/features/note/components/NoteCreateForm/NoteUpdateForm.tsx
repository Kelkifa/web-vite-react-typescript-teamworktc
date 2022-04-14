import NoteForm, {NoteFormProp} from "./NoteForm";

import {isSelectNote} from "../../noteSlice";
import {useAppSelector} from "../../../../app/hooks";

export default function NoteUpdateForm(props: NoteFormProp) {
	const isSelect = useAppSelector(isSelectNote);

	if (!isSelect)
		return (
			<div className="h-[16.75rem] py-5">
				Nhấn vào một sự kiện trên lịch để chọn và cập nhật sự kiện đó.
			</div>
		);
	return <NoteForm {...props} />;
}
