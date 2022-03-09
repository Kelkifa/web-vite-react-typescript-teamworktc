import * as React from "react";

import {AiOutlineCheckCircle} from "react-icons/ai";
import {TiDelete} from "react-icons/ti";
import {Todo} from "../../../../models/Note";
import clsx from "clsx";
import {noteActions} from "../../noteSlice";
import {useAppDispatch} from "../../../../app/hooks";

const styles = {
	checkBtn: "w-8 h-8",
};

interface TodoListProp {
	todoList: Todo[] | undefined;
	noteId: string | undefined;
}

export default function TodoList({todoList, noteId}: TodoListProp) {
	const dispatch = useAppDispatch();
	const handleStateBtnClick = (
		todoId: string | undefined,
		state: boolean,
		loading?: boolean
	): void => {
		if (todoId === undefined || noteId === undefined || loading) return;

		// DISPATCH CHANGE STATE HERE
		dispatch(
			noteActions.todoChangeState({
				noteId,
				todoId,
				state: !state,
			})
		);
	};

	const handleDelete = (todoId?: string, loading?: boolean): void => {
		if (todoId === undefined || noteId === undefined || loading) return;

		dispatch(noteActions.removeTodo({noteId, todoId}));
	};

	if (!todoList) return null;

	return (
		<ul className="">
			{todoList.map((todo, index) => (
				<li
					className={clsx(
						"py-2 flex justify-between items-center",
						todo.loading ? "opacity-50" : "hover:bg-bgColor/30"
					)}
					key={todo._id ? todo._id : index}
				>
					<div className="flex items-center gap-2">
						{todo.state === true ? (
							<AiOutlineCheckCircle
								className={clsx(
									styles.checkBtn,
									"text-green-500 flex justify-start cursor-pointer"
								)}
								onClick={() => {
									handleStateBtnClick(todo._id, todo.state, todo.loading);
								}}
							/>
						) : (
							<div className={clsx(styles.checkBtn, "p-[0.125rem]")}>
								<button
									className="w-full h-full bg-bgColor/40 border-[1px] border-baseOrange/50 rounded-full"
									onClick={() => {
										handleStateBtnClick(todo._id, todo.state, todo.loading);
									}}
								></button>
							</div>
						)}
						<div>{todo.todo}</div>
					</div>
					<TiDelete
						className={clsx("text-white/50", !todo.loading && "cursor-pointer")}
						onClick={() => {
							handleDelete(todo._id);
						}}
					/>
				</li>
			))}
		</ul>
	);
}
