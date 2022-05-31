import "./GroupNode.scss";

import {Group} from "../../../models/group";
import {MdAdd} from "react-icons/md";
import clsx from "clsx";
import {groupActions} from "../groupSlice";
import {useAppDispatch} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";

interface GroupNodeProp {
	className?: string;
	data?: Group;
	isAdd?: boolean;
	disabled?: boolean;
}

export default function GroupNode({
	className = "",
	data,
	isAdd = false,
	disabled,
}: GroupNodeProp) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleClick = () => {
		if (disabled) return;
		if (isAdd) {
			return navigate(`/group/create`);
		}
		if (!data) return;
		dispatch(groupActions.setSeletedGroup(data));
		navigate(`/group/${data && data._id}`);
	};
	return (
		<div
			className={clsx(
				className,
				"px-8 py-3 rounded-xl min-w-[7rem] max-w-[12rem] truncate flex items-center justify-center text-baseText",
				disabled ? "opacity-60" : "cursor-pointer hover:bg-[#2B2B2B]"
			)}
			onClick={handleClick}
			// style={{color: "white"}}
		>
			{isAdd ? <MdAdd className="text-xl" /> : data && data.name}
		</div>
	);
}
