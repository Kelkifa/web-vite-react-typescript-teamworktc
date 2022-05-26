import "react-toastify/dist/ReactToastify.css";

import {AiOutlineCheckCircle, AiTwotoneCheckCircle} from "react-icons/ai";
import {getTodoData, getTodoError, todoActions} from "../../../todo/todoSlice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";

import {TiDelete} from "react-icons/ti";
import {Todo} from "../../../../models/Todo";
import clsx from "clsx";
import socket from "../../../../app/socketIO";
import {useEffect} from "react";

// import {useNavigate} from "react-router-dom";

const styles = {
	checkBtn: "cursor-pointer text-[2.2rem]",
};

interface TodoListProp {
	noteId: string | undefined;
}

export default function TodoList({noteId}: TodoListProp) {
	const dispatch = useAppDispatch();

	const todoList = useAppSelector(getTodoData);

	const loading = useAppSelector(state => state.todo.loading);

	// console.log(loading);
	const error = useAppSelector(getTodoError);

	useEffect(() => {
		const listenCallback = (data: {
			response: Todo | string;
			action: "create" | "delete" | "changeState";
		}) => {
			if (data.action === "delete" && typeof data.response === "string") {
				dispatch(todoActions.deleteSuccess({todoId: data.response}));
			}
			if (typeof data.response !== "object" || !data.response._id) return;
			if (data.action === "changeState")
				dispatch(todoActions.changeStateSuccess({todo: data.response}));
			if (data.action === "create") {
				dispatch(todoActions.createSuccess({todo: data.response}));
			}
		};
		socket.on(`noteId:${noteId}`, listenCallback);
		return () => {
			socket.off(`noteId:${noteId}`), listenCallback;
		};
	}, [noteId]);

	useEffect(() => {
		if (noteId) {
			dispatch(todoActions.get({noteId}));
		}

		return () => {
			dispatch(todoActions.clearState());
		};
	}, [noteId]);

	const handleStateBtnClick = (
		todoId: string | undefined,
		state: boolean,
		loading?: boolean
	): void => {
		if (todoId === undefined || noteId === undefined || loading) return;

		// DISPATCH CHANGE STATE HERE
		dispatch(
			todoActions.changeState({
				noteId,
				todoId,
				state: !state,
			})
		);
	};

	const handleDelete = (todoId?: string, loading?: boolean): void => {
		if (todoId === undefined || noteId === undefined || loading) return;

		dispatch(todoActions.delete({noteId, todoId}));
	};

	// if (!todoList) return null;
	return (
		<ul className="">
			{loading === true && <li>loading ...</li>}
			{todoList &&
				!loading &&
				!error &&
				todoList.map((todo, index) => (
					<li
						className={clsx(
							"flex gap-x-4 py-2",
							todo.loading ? "opacity-50" : "hover:bg-bgColor/30"
						)}
						key={todo._id ? todo._id : index}
					>
						<div>
							{todo.state === true ? (
								// <div className="w-[2rem] h-[2rem]">
								<AiOutlineCheckCircle
									className={clsx(styles.checkBtn, "text-green-500")}
									onClick={() => {
										handleStateBtnClick(todo._id, todo.state, todo.loading);
									}}
								/>
							) : (
								<AiTwotoneCheckCircle
									className={clsx(styles.checkBtn, "text-black/80")}
									onClick={() => {
										handleStateBtnClick(todo._id, todo.state, todo.loading);
									}}
								/>
							)}
						</div>
						<div className="flex-grow flex items-center">{todo.name}</div>
						<div className="flex items-center">
							<TiDelete
								className={clsx(
									"text-white/50 w-4",
									!todo.loading && "cursor-pointer"
								)}
								onClick={() => {
									handleDelete(todo._id);
								}}
							/>
						</div>
					</li>
				))}
		</ul>
	);
}
