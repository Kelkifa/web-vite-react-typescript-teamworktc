import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect, useRef, useState} from "react";

import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {Group} from "../../models/group";
import UserButton from "./UserButton";
import clsx from "clsx";
import {groupActions} from "../group/groupSlice";

const styles = {
	signInOutBtn: "hover:underline cursor-pointer",
};

export default function HeaderRight() {
	const userInfo = useAppSelector(state => state.auth);

	return (
		<div className="flex items-center">
			{/* Group Button */}
			<GroupDropdown />

			{/* Auth Buttons */}
			{!userInfo.isAuth && !userInfo.loading && <SignInUpButton />}
			<UserButton userInfo={userInfo} />
		</div>
	);
}

// GROUP DROP DOWN
function GroupDropdown() {
	const dispatch = useAppDispatch();
	const groupInfo = useAppSelector(state => state.group);

	const dropdownRef = useRef<HTMLUListElement>(null);
	const [isDropdownOverflow, setIsDropdownOverflow] = useState<boolean>(false);

	const [isShowDropdown, setIsShowDropdown] = useState(false);

	// Handle Functions
	const handleDropdowOverFolow = (dropdownElement: HTMLUListElement) => {
		if (
			dropdownElement.offsetHeight + dropdownElement.scrollTop <
			dropdownElement.scrollHeight
		)
			return setIsDropdownOverflow(true);
		return setIsDropdownOverflow(false);
	};

	const handleItemClick = (group: Group) => {
		setIsShowDropdown(false);
		dispatch(groupActions.setSeletedGroup(group));
	};

	const handleScroll = (e: any) => {
		const dropdownElement = e.target;
		handleDropdowOverFolow(dropdownElement);
	};

	useEffect(() => {
		if (dropdownRef.current === null) return;
		const dropdownElement = dropdownRef.current;
		handleDropdowOverFolow(dropdownElement);
	}, [dropdownRef.current, isShowDropdown]);

	if (groupInfo.loading) {
		return (
			<div className="h-[32px] w-44 mr-3 flex items-center justify-center bg-black/70">
				<div>
					<AiOutlineLoading3Quarters className="animate-spin mr-2" />
				</div>
				<div>Loading ...</div>
			</div>
		);
	}
	return (
		<div className="relative h-[32px] w-44 bg-black/70 mr-3 text-orange-400 font-semibold cursor-pointer">
			<div
				className="h-full flex items-center w-full px-2 truncate"
				onClick={() => {
					setIsShowDropdown(!isShowDropdown);
				}}
			>
				{groupInfo.selectedGroup?.name}
			</div>

			<ul
				className={clsx(
					"absolute top-full w-full bg-bgColor max-h-[128px] overflow-auto scrollbar-hide",
					{
						hidden: !isShowDropdown,
					}
				)}
				ref={dropdownRef}
				onScroll={handleScroll}
			>
				{groupInfo.groupList?.map(group => {
					if (group._id === groupInfo.selectedGroup?._id) return null;
					return (
						<li
							key={group._id}
							className="h-7 px-2 w-full bg-red hover:bg-black/30 truncate"
							onClick={() => {
								handleItemClick(group);
							}}
						>
							{group.name}
						</li>
					);
				})}
			</ul>

			{/* EFFECT SCROLL */}
			{isShowDropdown && (
				<div
					className={clsx(
						"absolute top-[138px] h-[22px] w-full bg-gradient-to-t from-[#05171fdc]",
						{hidden: !isDropdownOverflow}
					)}
				></div>
			)}
		</div>
	);
}

// SIGN BUTTONS
function SignInUpButton() {
	const location = useLocation();
	return (
		<div>
			<Link
				to="/auth/login"
				className={clsx(styles.signInOutBtn, {
					underline: location.pathname.includes("auth/login"),
				})}
			>
				Đăng nhập
			</Link>
			<span> | </span>
			<Link
				to="/auth/register"
				className={clsx(styles.signInOutBtn, {
					underline: location.pathname.includes("auth/register"),
				})}
			>
				Đăng ký
			</Link>
		</div>
	);
}
