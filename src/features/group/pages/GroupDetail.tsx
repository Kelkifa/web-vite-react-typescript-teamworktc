import {
	getGroupMember,
	getGroupMemberError,
	getGroupMemberLoading,
	groupActions,
} from "../groupSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useNavigate, useParams} from "react-router-dom";

import AddMemberForm from "../components/AddMemberForm";
import {FiChevronLeft} from "react-icons/fi";
import LoadIcon from "../../../components/LoadIcon";
import {TiDelete} from "react-icons/ti";
import {callConfirmAlert} from "../../../components/notifices/ConfirmAlert";
import clsx from "clsx";
import {getAuthUserId} from "../../auth/authSlice";
import {startSectionBackgroundStyle} from "../../../components/StartSection";
import {useEffect} from "react";

export default function GroupDetail() {
	const navigate = useNavigate();
	const {id} = useParams();

	const dispatch = useAppDispatch();

	// const {callConfirmAlert} = useCallConfirmAlert();

	const userId = useAppSelector(getAuthUserId);

	const members = useAppSelector(getGroupMember);
	const memberLoading = useAppSelector(getGroupMemberLoading);
	const memberError = useAppSelector(getGroupMemberError);

	const group = useAppSelector(state =>
		state.group.data.find(value => value._id === id)
	);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!group || !group._id) return;
		dispatch(groupActions.getMembers({groupId: group._id}));
	}, [group?._id]);

	const handleDeleteMember = (memberId?: string) => {
		if (memberId && group?._id !== undefined) {
			callConfirmAlert("Bạn chắc muốn xóa thành viên này không ?", () => {
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

	const handleOutGroup = () => {
		if (!group?._id) return;
		callConfirmAlert("Bạn có chắn muốn rời  nhóm này không ?", () => {
			if (group._id) dispatch(groupActions.outGroup({groupId: group._id}));
		});
	};

	if (group === undefined)
		return (
			<div className={startSectionBackgroundStyle}>
				<div className="container mx-auto">Không tìm thấy nhóm này</div>
			</div>
		);
	if (group.loading)
		return (
			<div className={startSectionBackgroundStyle}>
				<div className="container mx-auto flex items-center">
					Loading <LoadIcon />
				</div>
			</div>
		);

	return (
		<div className={startSectionBackgroundStyle}>
			<div className="container mx-auto bg-mygreendark2 px-3 pb-10 text-black">
				<div className="flex justify-between items-center">
					<div>
						<FiChevronLeft
							className="cursor-pointer text-2xl"
							onClick={() => {
								navigate("/group");
							}}
						/>
					</div>
					{userId === group.adminId ? (
						<div
							className="text-black text-right text-sm hover:underline cursor-pointer py-1 whitespace-nowrap"
							onClick={handleDeleteGroup}
						>
							Xóa Nhóm
						</div>
					) : (
						<div
							className="text-black text-right text-sm hover:underline cursor-pointer py-1 whitespace-nowrap"
							onClick={handleOutGroup}
						>
							Rời nhóm
						</div>
					)}
				</div>
				<h1 className="text-bold text-xl text-center py-3 font-bold text-black">
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
											<span className="text-sm text-myorange font-bold">
												(you)
											</span>
										)}
										{group.adminId === member._id && (
											<span className="text-sm text-red-500 font-bold">
												(admin)
											</span>
										)}
									</div>
									{member.loading === true ? (
										<LoadIcon />
									) : group.adminId === userId &&
									  group.adminId !== member._id ? (
										<TiDelete
											className="text-[0.8rem] cursor-pointer text-orange-500"
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
						<div className="font-bold">Thêm thành viên</div>
						<AddMemberForm />
					</div>
				)}
			</div>
		</div>
	);
}
