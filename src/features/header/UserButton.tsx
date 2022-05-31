import "./UserButton.scss";

import {AuthState, authActions} from "../auth/authSlice";

import {User} from "../../models/user";
import {useAppDispatch} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

interface UserButtonProp {
	isAuth: boolean;
	loading: boolean;
	user?: User;
	inviteNumber: number;
}

const params = {
	dropdownBg: "#2B2B2B",
};
const styles = {
	container:
		"flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 border-red-600 border-2 font-userBtn",
	dropwdown: `absolute top-full right-0 text-black/90 w-40 rounded-sm text-[#c9d1d9] bg-[#2B2B2B]`,
	dropdownItem: "px-2 py-1 cursor-pointer flex items-center",
};

export default function UserButton({
	isAuth,
	loading,
	user,
	inviteNumber,
}: UserButtonProp) {
	const navigate = useNavigate();
	const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(authActions.logout());
		navigate("/");
	};

	if (!isAuth && !loading) return null;
	if (loading) return <UserButtonLoading />;
	return (
		<div className="relative z-10">
			{/* Badge */}
			{inviteNumber > 0 && (
				<div className="absolute top-[-0.3rem] right-0 text-[0.8rem] text-red-500">
					{inviteNumber}
				</div>
			)}
			<div
				className={styles.container + " cursor-pointer"}
				onClick={() => {
					setIsShowDropdown(!isShowDropdown);
				}}
			>
				{user && user.username && user.username[0]}
			</div>

			{isShowDropdown && (
				<ul
					className={styles.dropwdown + " user-button-dropdown"}
					style={{["--bg" as string]: params.dropdownBg}}
					onClick={() => {
						setIsShowDropdown(false);
					}}
				>
					<li className={styles.dropdownItem}>
						<span>Xin Chào </span>
						<span className="font-semibold ml-1">{user?.username}</span>
					</li>
					{user?.isAdmin && (
						<li className={styles.dropdownItem + " text-green-600"}>Admin</li>
					)}
					<li
						className={styles.dropdownItem}
						onClick={() => {
							navigate("/invite");
						}}
					>
						Lời mời{" "}
						{inviteNumber !== 0 && (
							<span className="text-baseRed text-sm">{`(${inviteNumber})`}</span>
						)}
					</li>
					<li
						className={styles.dropdownItem + " border-t border-gray-600/70"}
						onClick={handleLogout}
					>
						Đăng xuất
					</li>
				</ul>
			)}
		</div>
	);
}

function UserButtonLoading() {
	return <div className={styles.container}>...</div>;
}
