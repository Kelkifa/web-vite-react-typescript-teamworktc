import {NoteState, noteActions} from "../../noteSlice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";

import MultiCheckboxForm from "../../../../components/form/MultiCheckboxForm";
import MyTable from "../../../../components/Table";
import {Note} from "../../../../models/Note";
import Searchbar from "../../../../components/form/Searchbar";
import clsx from "clsx";
import {getSelectedGroupId} from "../../../group/groupSlice";
import noteApi from "../../../../api/noteApi";
import {useDataStatus} from "../../../../hooks/useDataStatus";

interface NoteManageTableProp {
	dataInfo?: NoteState;
}

function NoteManageTable({dataInfo}: NoteManageTableProp) {
	const dispatch = useAppDispatch();

	const groupId = useAppSelector(getSelectedGroupId);

	// const [searchedData, setSearchedData] = useState<NoteState>({
	// 	loading: false,
	// 	data: [],
	// });

	const [searchedData, status, getData] = useDataStatus<Note[]>([], {
		loading: false,
	});

	const handleDelete = (data: (string | undefined)[]) => {
		dispatch(noteActions.deleteNote(data));
	};

	const handleSearch = async (data: string) => {
		if (!groupId) return;
		getData(noteApi.search(groupId, data));
	};

	let renderData = dataInfo ? dataInfo : {...status, data: searchedData};
	if (renderData.error) {
		return <div>{renderData.error}</div>;
	}
	return (
		<div className="mt-4">
			{!dataInfo && (
				<Searchbar onSearchClick={handleSearch} placeholder="Tìm sự kiện" />
			)}

			<MultiCheckboxForm
				dataList={renderData.data ? renderData.data.map(note => note._id) : []}
			>
				{multiCheckboxProp => {
					const {onClick, checkedData, onClickCheckAll} = multiCheckboxProp;
					return (
						<div>
							<div className="text-right py-3">
								<span
									className="cursor-pointer hover:underline"
									onClick={() => {
										handleDelete(checkedData);
									}}
								>
									Xóa (
									{checkedData.reduce(
										(total, value) => (value === undefined ? total : total + 1),
										0
									)}
									)
								</span>
							</div>
							<MyTable
								headerList={[
									<input
										type="checkbox"
										className="cursor-pointer"
										checked={
											checkedData.findIndex(value => value === undefined) ===
												-1 && checkedData.length !== 0
												? true
												: false
										}
										onChange={e => {
											onClickCheckAll(e.target.checked);
										}}
									/>,
									"Sự kiện",
									"Bắt đầu",
									"Kết thúc",
									"Xử lý",
								]}
							>
								<>
									{renderData.loading && (
										<tr>
											<td colSpan={5} className="text-center">
												loading ...
											</td>
										</tr>
									)}
									{renderData.error && (
										<tr>
											<td colSpan={5} className="text-center">
												{renderData.error}
											</td>
										</tr>
									)}
									{!renderData.error && renderData.data?.length === 0 && (
										<tr>
											<td colSpan={5} className="text-center">
												Không có sự kiện nào
											</td>
										</tr>
									)}
									{!renderData.error &&
										renderData.data?.map((note, index) => {
											return (
												<tr
													key={note._id ? note._id : index}
													// className="bg-[rgba(196,183,244,0.5)]"
													style={{backgroundColor: note.color}}
													className={clsx(note.loading && "opacity-40")}
												>
													<td>
														<input
															type="checkbox"
															className="cursor-pointer"
															checked={checkedData[index] === note._id}
															onChange={e => {
																onClick(e.target.checked, index);
															}}
														/>
													</td>
													<td>{note.name}</td>
													<td>{tranformDate(note.from)}</td>
													<td>{tranformDate(note.to)}</td>
													<td
														className="hover:underline cursor-pointer"
														onClick={() => {
															handleDelete([note._id]);
														}}
													>
														Xóa
													</td>
												</tr>
											);
										})}
								</>
							</MyTable>
						</div>
					);
				}}
			</MultiCheckboxForm>
		</div>
	);
}

export default NoteManageTable;

function tranformDate(date: string | Date) {
	if (!date) return "";
	if (typeof date === "string") {
		return new Date(date).toDateString();
	}

	return date.toDateString();
}
