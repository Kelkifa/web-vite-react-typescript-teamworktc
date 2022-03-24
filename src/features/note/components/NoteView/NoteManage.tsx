import {useEffect, useState} from "react";

import NoteManageTable from "./NoteManageTable";
import {NoteState} from "../../noteSlice";
import clsx from "clsx";
import {getSelectedGroupId} from "../../../../app/store";
import noteApi from "../../../../api/noteApi";
import {useAppSelector} from "../../../../app/hooks";

export default function NoteManage() {
	const groupId = useAppSelector(getSelectedGroupId);

	const noteInfo = useAppSelector(state => state.note);

	const [tabNumber, setTabNumber] = useState<number>(0);

	const [noteInfo2, setNoteInfo2] = useState<NoteState>({
		loading: true,
		status: {},
	});

	useEffect(() => {
		if (groupId === undefined || tabNumber === 0) return;

		if (tabNumber === 1) {
			const fetchPassedNote = async () => {
				try {
					const response = await noteApi.getPassedNotes(groupId);
					if (response.success === true) {
						setNoteInfo2({loading: false, data: response.response, status: {}});
					} else {
						setNoteInfo2({loading: false, error: response.message, status: {}});
					}
				} catch (err) {
					console.error(err);
					setNoteInfo2({loading: false, error: "Server gặp sự cố", status: {}});
				}
			};

			fetchPassedNote();
			return;
		}
	}, [groupId, tabNumber]);

	return (
		<div>
			<h2 className="font-bold text-xl text-center py-5 text-red-500">
				Quản lý sự kiện
			</h2>

			<NoteManageTab
				tabNumber={tabNumber}
				setTabNumber={(value: number) => {
					setTabNumber(value);
				}}
			/>
			<NoteManageTable
				dataInfo={
					tabNumber === 0 ? noteInfo : tabNumber === 2 ? undefined : noteInfo2
				}
			/>
		</div>
	);
}

const tabStyles = {
	item: "flex-grow text-center bg-black/50 p-1 cursor-pointer",
};
function NoteManageTab({
	tabNumber,
	setTabNumber,
}: {
	tabNumber: number;
	setTabNumber: (value: number) => void;
}) {
	const itemStr: string[] = [
		"Các sự kiện hiện tại",
		"Các sự kiện đã qua",
		"Tìm kiếm",
	];

	return (
		<ul className="flex divide-x-2 divide-black">
			{itemStr.map((item, index) => (
				<li
					key={index}
					className={clsx(
						tabStyles.item,
						index === tabNumber
							? "bg-transparent"
							: "bg-black/50 hover:bg-black/30"
					)}
					onClick={() => {
						setTabNumber(index);
					}}
				>
					{item}
				</li>
			))}
		</ul>
	);
}
