import {Group} from "../../../models/group";
import {groupActions} from "../groupSlice";
import {useAppDispatch} from "../../../app/hooks";
import {useNavigate} from "react-router";

interface GroupNodeProp {
	data: Group;
}

export default function GroupNode({data}: GroupNodeProp) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(groupActions.setSeletedGroup(data));
		navigate(`/group/${data._id}`);
	};
	return (
		<div
			className="px-8 py-3 bg-bgColor rounded-xl min-w-[7rem] max-w-[12rem] truncate text-center cursor-pointer"
			onClick={handleClick}
		>
			{data.name}
		</div>
	);
}
