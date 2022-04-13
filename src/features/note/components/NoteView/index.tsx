import {FastField, Formik} from "formik";
import {getTodoStatusCreateLoading, todoActions} from "../../../todo/todoSlice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";

import BaseButton from "../../../../components/form/BaseButton";
import BaseInputField from "../../../../components/form/BaseInputField";
import {MdOutlineArrowBackIosNew} from "react-icons/md";
import {Note} from "../../../../models/Note";
import NoteManage from "./NoteManage";
import {Todo} from "../../../../models/Todo";
import TodoList from "./TodoList";
import {noteActions} from "../../noteSlice";
import {useState} from "react";

export default function NoteView() {
	const [isManageScreen, setIsManageScreen] = useState<boolean>(false);

	const selectedNote: Note | undefined = useAppSelector(
		state => state.note.selectedNote
	);

	return (
		<div className="h-full p-3 pb-9 min-h-[20rem]">
			<Controlbar
				isManageScreen={isManageScreen}
				onManageClick={setIsManageScreen}
			/>
			{isManageScreen ? (
				<NoteManage />
			) : (
				<>
					<h2 className="font-bold text-xl text-center py-5 text-red-500">
						Danh Sách Công Việc
					</h2>
					{selectedNote ? (
						<>
							<TodoAdd noteId={selectedNote._id} />
							<div className="py-4 pt-5 text-red-400/80">
								{selectedNote.name}
							</div>

							<TodoList noteId={selectedNote._id} />
						</>
					) : (
						<p>
							Nhấn vào một sự kiện trên lịch để xem danh sách công việc của sự
							kiện đó
						</p>
					)}
				</>
			)}
		</div>
	);
}

function Controlbar({
	onManageClick,
	isManageScreen,
}: {
	onManageClick: (data: boolean) => void;
	isManageScreen: boolean;
}) {
	return (
		<div className="flex justify-between items-center">
			<div
				onClick={() => {
					onManageClick(false);
				}}
				className="cursor-pointer"
			>
				{isManageScreen ? <MdOutlineArrowBackIosNew /> : ""}
			</div>
			<div
				className="cursor-pointer hover:underline"
				onClick={() => {
					onManageClick(true);
				}}
			>
				{!isManageScreen ? "Quản Lý" : ""}
			</div>
		</div>
	);
}

function TodoAdd({noteId}: {noteId: string | undefined}) {
	const dispatch = useAppDispatch();

	const loading = useAppSelector(getTodoStatusCreateLoading);

	const initialValues: Todo = {
		name: "",
		state: false,
	};

	const handleSubmit = (values: Todo, {resetForm}: {resetForm: () => void}) => {
		if (noteId === undefined) return;
		dispatch(todoActions.create({noteId, todoName: values.name}));
		resetForm();
	};
	return (
		<div>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{formikProps => {
					const {handleSubmit} = formikProps;
					return (
						<form onSubmit={handleSubmit} className="flex">
							<FastField
								name="name"
								placeHolder="Nhập Tên Công Việc"
								className="flex-grow"
								component={BaseInputField}
							/>

							<BaseButton
								type="submit"
								className="bg-rose-700/80 rounded-r-xl px-2 w-16"
								loading={loading}
							>
								Thêm
							</BaseButton>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}
