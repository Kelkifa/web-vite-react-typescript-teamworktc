import {Formik} from "formik";
import {Todo} from "../../../../models/Note";
import {useAppSelector} from "../../../../app/hooks";

interface NoteManageProp {
	selectedNote: string;
}

export default function NoteManage({selectedNote}: NoteManageProp) {
	// console.log(note);

	const note = useAppSelector(state => state.note.selectedNote);
	console.log(note);
	return (
		<div className="h-full p-2">
			<Controlbar />

			<h2 className="font-bold text-xl text-center">Danh Sách Công Việc</h2>
			{selectedNote ? (
				<>
					<TodoAdd />
					<TodoList />
				</>
			) : (
				"null"
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

function TodoAdd() {
	const initialValues: Todo = {
		todo: "",
		state: false,
	};

	const handleSubmit = (values: Todo) => {
		console.log(values);
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
								className="text-slate-300 text-lg inline-block bg-black/40 px-2"
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

function TodoList() {
	return <div>todoList</div>;
}
