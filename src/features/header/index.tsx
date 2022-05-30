import {useEffect, useState} from "react";

import {AiOutlineClose} from "react-icons/ai";
import HeaderRight from "./HeaderRight";
import {HiOutlineMenu} from "react-icons/hi";
import LinkButton from "../../components/LinkButton";
import clsx from "clsx";
import {getAuthIsAuth} from "../auth/authSlice";
import {useAppSelector} from "../../app/hooks";

export interface NavInfo {
	path: string;
	text: string;
	isAuth?: boolean;
}

interface MainHeaderProp {
	className?: string;
	navList: NavInfo[];
}

const MOBILE_SIZE = 640;

const styles = {
	header: "z-10 py-[1.434rem]",
};
export function MainHeader({navList, className = ""}: MainHeaderProp) {
	const isAuth = useAppSelector(getAuthIsAuth);

	const [isShowMobileNavbar, setIsShowMobileNavbar] = useState<boolean>(false);
	// const [isMobile, setIsMobile] = useState<boolean>(
	// 	window.innerWidth > MOBILE_SIZE ? false : true
	// );

	return (
		<>
			{/* Deck top */}
			<header
				className={clsx(
					className,
					styles.header,
					"hidden sm:flex",
					"container absolute z-10 top-0 left-0 right-0 mx-auto justify-between items-center"
				)}
			>
				<div className="flex items-center text-[1.3rem]">
					{/* Icon */}
					<LinkButton path="/" className="font-[700] text-mygreen">
						Icon
					</LinkButton>
				</div>

				<ul className={clsx("flex gap-x-8")}>
					{navList
						.filter(value => !value.isAuth)
						.map(nav => (
							<LinkButton
								path={nav.path}
								key={nav.text}
								onClick={() => {
									setIsShowMobileNavbar(false);
								}}
							>
								{nav.text}
							</LinkButton>
						))}
				</ul>

				<HeaderRight />
			</header>

			{/* Mobile */}
			<header
				className={clsx(
					"flex sm:hidden", // hidden when decktop mod
					"flex-col z-10 top-0 left-0 right-0 px-[1.125rem] py-[1.6rem] text-[2rem]",
					isShowMobileNavbar ? "fixed bg-black/95 bottom-0" : "absolute"
				)}
			>
				<div className="flex justify-between items-center">
					<LinkButton path="/" className="font-[700] text-mygreen">
						Icon
					</LinkButton>

					{isShowMobileNavbar ? (
						<AiOutlineClose
							className="cursor-pointer text-[2.2rem]"
							onClick={() => {
								setIsShowMobileNavbar(false);
							}}
						/>
					) : (
						<HiOutlineMenu
							className="cursor-pointer text-[2.2rem]"
							onClick={() => {
								setIsShowMobileNavbar(true);
							}}
						/>
					)}
				</div>

				{isShowMobileNavbar && (
					<div className="flex-grow flex flex-col justify-center gap-y-[2.85rem] items-center pb-[14.8rem]">
						{navList.map(nav => (
							<LinkButton
								path={nav.path}
								key={nav.text}
								onClick={() => {
									setIsShowMobileNavbar(false);
								}}
							>
								{nav.text}
							</LinkButton>
						))}

						{!isAuth && (
							<>
								<LinkButton path="/auth/login">Đăng Nhập</LinkButton>
								<LinkButton
									className="bg-white text-black rounded-[40px] py-[0.6rem] px-[1.7rem]"
									path="/auth/register"
								>
									Đăng Ký
								</LinkButton>
							</>
						)}
					</div>
				)}
			</header>
		</>
	);
}
