import {Note, Todo} from "../../../../models/Note";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";

import {Formik} from "formik";
import TodoList from "./TodoList";
import {noteActions} from "../../noteSlice";

export default function NoteManage() {
	const selectedNote: Note | undefined = useAppSelector(
		state => state.note.selectedNote
	);

	return (
		<div className="h-full p-3 pb-9">
			<Controlbar />

			<h2 className="font-bold text-xl text-center py-5 text-red-500">
				Danh Sách Công Việc
			</h2>
			{selectedNote ? (
				<>
					<TodoAdd noteId={selectedNote._id} />
					<div className="py-2 text-red-500">{selectedNote.title}</div>

					<TodoList
						todoList={selectedNote.todoList}
						noteId={selectedNote._id}
					/>
				</>
			) : (
				<p>
					Nhấn vào một sự kiện trên lịch để xem danh sách công việc của sự kiện
					đó
				</p>
			)}
		</div>
	);
}

function Controlbar() {
	return (
		<div className="flex justify-between">
			<div></div>
			<div>Quản Lý</div>
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
