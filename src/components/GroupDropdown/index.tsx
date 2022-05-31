import {
	getGroupData,
	getGroupLoading,
	getGroupSelected,
	groupActions,
} from "../../features/group/groupSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

import {Group} from "../../models/group";
import LoadIcon from "../LoadIcon";
import {TiPlus} from "react-icons/ti";
import clsx from "clsx";
import {getAuthIsAuth} from "../../features/auth/authSlice";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import {useState} from "react";

export default function GroupDropdown() {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	// auth
	const isAuth = useAppSelector(getAuthIsAuth);
	// Group
	const groupLoading = useAppSelector(getGroupLoading);
	const groupData = useAppSelector(getGroupData);

	const selectedGroup = useAppSelector(getGroupSelected);

	// State
	const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);

	// ref

	// handle functions
	const handleDropdownItemClick = (group: Group) => {
		setIsShowDropdown(false);
		dispatch(groupActions.setSeletedGroup(group));
	};

	const handleAddGroupClick = () => {
		if (!isAuth) {
			toast.error("Bạn cần đăng nhập trước để tạo nhóm");
			return;
		}

		navigate("/group/create");
	};

	return (
		<div>
			<div className="flex items-center gap-x-1">
				<div
					className={clsx(
						"relative bg-black text-white w-[13.75rem] h-[2.8125rem] rounded-md",
						isShowDropdown && "rounded-b-none"
					)}
				>
					<div
						className={clsx(
							"w-full h-full leading-[2.8125rem] px-[1.5rem] font-bold whitespace-nowrap overflow-hidden relative",
							!groupLoading && "cursor-pointer"
						)}
						onClick={() => {
							setIsShowDropdown(preState => !preState);
						}}
					>
						{groupLoading ? (
							<span className="text-mygray flex items-center gap-1">
								Loading <LoadIcon />{" "}
							</span>
						) : (
							selectedGroup?.name
						)}
						<div
							className="absolute top-0 bottom-0 right-0 w-[2rem] rounded-r-md"
							style={{
								backgroundImage:
									"linear-gradient(to right, transparent, black)",
							}}
						></div>
					</div>

					{isShowDropdown && !groupLoading && (
						<ul className="absolute bg-black left-0 right-0 rounded-b-md z-9 max-h-[6.89rem] overflow-auto custom-scroll">
							{groupData.map((group, index) => {
								if (group._id === selectedGroup?._id) return null;
								return (
									<li
										key={group._id ? group._id : index}
										className="px-[1.5rem] py-[0.4rem] hover:bg-mygray cursor-pointer"
										onClick={() => {
											handleDropdownItemClick(group);
										}}
									>
										{group.name}
									</li>
								);
							})}
						</ul>
					)}
				</div>
				<TiPlus
					className="text-3xl cursor-pointer"
					onClick={handleAddGroupClick}
				/>
			</div>

			<div className="text-sm text-center">
				Số Lượng Nhóm: {groupData.length}
			</div>
		</div>
	);
}
