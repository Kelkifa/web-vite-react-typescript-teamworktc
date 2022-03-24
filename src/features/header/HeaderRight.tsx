import {Link, useLocation} from "react-router-dom";
import {
	authActions,
	getAuthInviteData,
	getAuthIsAuth,
	getAuthLoading,
	getAuthUser,
} from "../auth/authSlice";
import {
	getGroupData,
	getGroupLoading,
	getGroupSelected,
	groupActions,
} from "../group/groupSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect, useRef, useState} from "react";

import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {Group} from "../../models/group";
import {InvitesResponse} from "../../models";
import LoadIcon from "../../components/LoadIcon";
import UserButton from "./UserButton";
import clsx from "clsx";
import socket from "../../app/socketIO";

const styles = {
	signInOutBtn:
		"hover:underline cursor-pointer text-[0.8rem] whitespace-nowrap",
};

export default function HeaderRight() {
	const dispatch = useAppDispatch();

	const loading = useAppSelector(getAuthLoading);
	const isAuth = useAppSelector(getAuthIsAuth);
	const user = useAppSelector(getAuthUser);
	const inviteData = useAppSelector(getAuthInviteData);

	useEffect(() => {
		if (!user) return;
		const listenCallback = (data: InvitesResponse) => {
			if (typeof data !== "object") return;
			if (
				!data._id ||
				data.groupName === undefined ||
				data.userInvite === undefined
			)
				return;
			dispatch(authActions.addInvite({invite: data}));
		};
		socket.on(`invite:${user._id}`, listenCallback);

		return () => {
			socket.off(`noteId:${user._id}`), listenCallback;
		};
	}, [user?._id]);

	return (
		<div className="flex items-center">
			{/* Group Button */}
			<GroupDropdown />

			{/* Auth Buttons */}
			{!isAuth && <SignInUpButton />}
			<UserButton
				loading={loading}
				isAuth={isAuth}
				user={user}
				inviteNumber={inviteData.length}
			/>
		</div>
	);
}

// GROUP DROP DOWN
function GroupDropdown() {
	const dispatch = useAppDispatch();
	const groupLoading = useAppSelector(getGroupLoading);
	const groupData = useAppSelector(getGroupData);
	const selectedGroup = useAppSelector(getGroupSelected);

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

	if (groupLoading) {
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
		<div className="relative h-[32px] w-44 bg-black/70 mr-3 text-orange-400 font-semibold">
			<div
				className="h-full flex items-center w-full px-2 truncate cursor-pointer"
				onClick={() => {
					setIsShowDropdown(!isShowDropdown);
				}}
			>
				{selectedGroup?.name}
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
				{groupData.map((group, index) => {
					if (group._id === selectedGroup?._id) return null;
					return (
						<li
							key={group._id ? group._id : index}
							className={clsx(
								"h-7 px-2 w-full bg-red  truncate",
								group.loading === true
									? "opacity-60"
									: "hover:bg-black/30 cursor-pointer"
							)}
							onClick={() => {
								if (group.loading === true) return;
								handleItemClick(group);
							}}
						>
							<span>{group.name}</span>{" "}
							{group.loading && (
								<span>
									<LoadIcon />
								</span>
							)}
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
