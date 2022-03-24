import {
	getGroupError,
	getGroupLoading,
	getGroupMember,
	getGroupMemberError,
	getGroupMemberLoading,
	groupActions,
} from "../groupSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";

import AddMemberForm from "../components/AddMemberForm";
import LoadIcon from "../../../components/LoadIcon";
import {TiDelete} from "react-icons/ti";
import clsx from "clsx";
import {getAuthUserId} from "../../auth/authSlice";
import {useCallConfirmAlert} from "../../../components/notifices/ConfirmAlert";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

const CONFIRM_DELETE_MEMBER_ACTION = "delete/member";

export default function GroupDetail() {
	const {id} = useParams();

	const dispatch = useAppDispatch();

	const {callConfirmAlert} = useCallConfirmAlert();

	const userId = useAppSelector(getAuthUserId);

	const members = useAppSelector(getGroupMember);
	const memberLoading = useAppSelector(getGroupMemberLoading);
	const memberError = useAppSelector(getGroupMemberError);

	const group = useAppSelector(state =>
		state.group.data.find(value => value._id === id)
	);

	useEffect(() => {
		if (!group || !group._id) return;
		dispatch(groupActions.getMembers({groupId: group._id}));
	}, [group?._id]);

	const handleDeleteMember = (memberId?: string) => {
		if (memberId && group?._id !== undefined) {
			callConfirmAlert("Bạn chắc muốn xóa người thành viên này không ?", () => {
				if (!group._id) return;
				dispatch(groupActions.deleteMember({groupId: group._id, memberId}));
			});
		}
	};

	const handleDeleteGroup = () => {
		if (group?._id) {
			callConfirmAlert("Bạn chắc muốn xóa Nhóm này ?", () => {
				if (!group?._id) return;
				dispatch(groupActions.delete({groupId: group._id}));
			});
		}
	};

	if (group === undefined) return <div>Không tìm thấy nhóm này</div>;

	return (
		<div className="container bg-bgColor px-3 pb-10 text-baseText">
			<div
				className="text-right text-sm hover:underline cursor-pointer py-1"
				onClick={handleDeleteGroup}
			>
				Xóa
			</div>
			<h1 className="text-bold text-xl text-center py-3 font-bold text-baseRed">
				{group.name}
			</h1>
			<div>
				<h2 className="font-bold">Thành viên</h2>
				<ul className="list-disc pl-4 max-h-[300px] custom-scroll">
					{memberLoading && "loading..."}
					{!memberLoading &&
						!memberError &&
						members.map((member, index) => (
							<li
								key={index}
								className={clsx(
									"py-1 m-full flex items-center gap-x-2",
									member.loading === true && "opacity-75"
								)}
							>
								<div>
									<span>{member.username}</span>{" "}
									{userId === member._id && (
										<span className="text-sm text-baseText/60">(you)</span>
									)}
									{group.adminId === member._id && (
										<span className="text-sm text-baseRed">(admin)</span>
									)}
								</div>
								{member.loading === true ? (
									<LoadIcon />
								) : group.adminId === userId && group.adminId !== member._id ? (
									<TiDelete
										className="text-[0.8rem] cursor-pointer text-baseText/80"
										onClick={() => {
											handleDeleteMember(member._id);
										}}
									/>
								) : null}
							</li>
						))}
				</ul>
			</div>
			{userId === group.adminId && (
				<div className="mt-3">
					<div>Thêm thành viên</div>
					<AddMemberForm />
				</div>
			)}
		</div>
	);
}
