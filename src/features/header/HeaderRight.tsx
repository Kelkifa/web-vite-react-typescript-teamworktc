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
import LinkButton from "../../components/LinkButton";
import LoadIcon from "../../components/LoadIcon";
import UserButton from "./UserButton";
import clsx from "clsx";
import socket from "../../app/socketIO";

const styles = {
	signInOutBtn: "hover:underline cursor-pointer whitespace-nowrap",
};

export default function HeaderRight({className = ""}: {className?: string}) {
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
		<div className={clsx(className, "flex items-center")}>
			{/* Group Button */}
			{/* <GroupDropdown /> */}

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

// SIGN BUTTONS
function SignInUpButton() {
	const location = useLocation();
	return (
		<div>
			<LinkButton path="/auth/login">Đăng Nhập</LinkButton>
			<LinkButton
				className="bg-white text-black rounded-[40px] py-[0.6rem] px-[1.7rem] ml-4"
				path="/auth/register"
			>
				Đăng Ký
			</LinkButton>
		</div>
	);
}
