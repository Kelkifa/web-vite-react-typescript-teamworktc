import "./UserButton.scss";

import {AuthState, authActions} from "../auth/authSlice";

import {useAppDispatch} from "../../app/hooks";
import {useState} from "react";

interface UserButtonProp {
	userInfo: AuthState;
}

const params = {
	dropdownBg: "#161b22",
};
const styles = {
	container:
		"flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 border-red-600 border-2 font-userBtn",
	dropwdown: `absolute top-full right-0 text-black/90 w-40 rounded-sm text-[#c9d1d9] bg-[#161b22]`,
	dropdownItem: "px-2 py-1 cursor-pointer",
};

export default function UserButton({userInfo}: UserButtonProp) {
	const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(authActions.logout());
	};

	if (!userInfo.isAuth && !userInfo.loading) return null;
	if (userInfo.loading) return <UserButtonLoading />;
	return (
		<div className="relative">
			<div
				className={styles.container + " cursor-pointer"}
				onClick={() => {
					setIsShowDropdown(!isShowDropdown);
				}}
			>
				{userInfo.user && userInfo.user.username && userInfo.user.username[0]}
			</div>

			{isShowDropdown && (
				<ul
					className={styles.dropwdown + " user-button-dropdown"}
					style={{["--bg" as string]: params.dropdownBg}}
				>
					<li className={styles.dropdownItem}>
						<span>Xin Chào </span>
						<span className="font-semibold">{userInfo.user?.username}</span>
					</li>
					{userInfo.user?.isAdmin && (
						<li className={styles.dropdownItem + " text-green-600"}>Admin</li>
					)}
					<li
						className={styles.dropdownItem + " border-t border-gray-600/70"}
						onClick={handleLogout}
					>
						Log Out
					</li>
				</ul>
			)}
		</div>
	);
}

function UserButtonLoading() {
	return <div className={styles.container}>...</div>;
}
