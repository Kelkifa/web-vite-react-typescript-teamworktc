import {Note, Todo} from "../../../../models/Note";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";

import {Formik} from "formik";
import {MdOutlineArrowBackIosNew} from "react-icons/md";
import NoteManage from "./NoteManage";
import TodoList from "./TodoList";
import {noteActions} from "../../noteSlice";
import {useState} from "react";

export default function NoteView() {
	const [isManageScreen, setIsManageScreen] = useState<boolean>(false);

	const selectedNote: Note | undefined = useAppSelector(
		state => state.note.selectedNote
	);

	// console.log(selectedNote);

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
								{selectedNote.title}
							</div>

							<TodoList
								todoList={selectedNote.todoList}
								noteId={selectedNote._id}
							/>
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
				className="cursor-pointer"
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
	const initialValues: Todo = {
		todo: "",
		state: false,
	};

	const handleSubmit = (values: Todo) => {
		if (noteId === undefined) return;
		dispatch(noteActions.addTodo({noteId, todoName: values.todo}));
	};
	return (
		<div>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{formikProps => {
					const {handleChange, handleSubmit, handleBlur} = formikProps;
					return (
						<form onSubmit={handleSubmit} className="flex">
							<input
								name="todo"
								type="text"
								onChange={handleChange}
								onBlur={handleBlur}
								className="text-slate-300 text-lg inline-block bg-black/40 px-2 flex-grow"
								placeholder="Nhập Tên Công Việc"
							/>
							<button
								type="submit"
								className="bg-rose-700/80 rounded-r-xl px-2 w-16"
							>
								Thêm
							</button>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}
